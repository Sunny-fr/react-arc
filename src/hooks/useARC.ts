import {useCallback, useEffect, useMemo, useRef} from "react"
import {ComponentProps, ComponentPropsWithRequiredModelParams,} from "../types/components.types"
import {ARCConfig} from "../types/config.types"
import {ARCRootState} from "../types/connectors.types";

import {core} from "../actions/core";
import {ARCMetaModel} from "../types/model.types";
import {useDispatch, useSelector} from "react-redux";
import {AXIOS_CANCEL_PAYLOAD, ReduxActions} from "../actions/ReduxActions";
import {initializeConfig} from "../utils";
import {ARCAxiosOptions} from "../types/actions.types";
import {AxiosPromise} from "axios";
import commons from "../commons";
import {UseARC} from "../types/hooks.connected.types";
import {fetchingCountSelector, metaModelSelector} from "./selectors";


interface FetchAuthorizationProps<Model> {
  ARCConfig: ARCConfig<Model>
  metaModel?: ARCMetaModel<Model> | null
  props: ComponentProps,
  options?: {
    skipReFetchStep?: boolean
  }
}

function fetchAuthorization<Model>({
                                     ARCConfig: config,
                                     metaModel,
                                     props,
                                     options = {}
                                   }: FetchAuthorizationProps<Model>): boolean {
  if (core.isNew(config, props)) {
    // console.log('//model is new no data to be retrieved')
    return false
  }

  if (!core.hasRequiredParams(config, props)) {
    // console.log("// model has not the required params, we don't fetch it")
    return false
  }

  if (!metaModel) {
    // console.log('//model has never been fetch, its ok to fetch')
    return true
  }

  if (metaModel.metas.fetching) {
    // console.log('//model seems to be loading we dont allow to fetch it again')
    return false
  }

  if (
    !options?.skipReFetchStep &&
    metaModel.metas.loaded &&
    (!(config.fetchOnce && metaModel.metas.loaded))
  ) {
    // console.log('//model seems to be loaded but its ok to re-fetch it')
    return true
  }

  if (
    !options?.skipReFetchStep &&
    !!metaModel.metas.error &&
    (
      config.refetchOnError === true &&
      !metaModel.metas.fetching &&
      !metaModel.metas.loaded &&
      !!metaModel.metas.error
    )
  ) {
    // console.log('//model had an error previously, but its ok to refetch it')
    return true
  }

  return false
}


export function useARC<Model>({
                                ARCConfig: initialConfig,
                                props,
                              }: {
  ARCConfig: ARCConfig<Model>
  props: ComponentProps
}): UseARC<Model> {
  const dispatch = useDispatch()
  const isMountedRef = useRef(true)
  const abortControllerRef = useRef<AbortController | null>(null)
  const delayedTimeoutRef = useRef<number | undefined>(undefined)

  const [config, actions] = useMemo(() => {
    const config: ARCConfig<Model> = initializeConfig(initialConfig)
    const actionsList = new ReduxActions({config})
    if(config.fetchers?.['fetch']) {
      actionsList.standAloneFetchOne = config.fetchers['fetch']
    }
    return [config, actionsList]
  }, [initialConfig])

  const modelKey = core.getKey(config, props)
  const params = core.getParams(config, props)

  const fetchingCount = useSelector<ARCRootState, number>((state) => {
    return fetchingCountSelector(state, config)
  })
  const metaModel = useSelector<ARCRootState, ARCMetaModel<Model> | null>((state) => {
    return metaModelSelector(state, config, modelKey)
  })
  const _fetchAuthorization = useCallback((props: ComponentProps, options: FetchAuthorizationProps<Model>['options']): boolean => {

    return fetchAuthorization<Model>({
      ARCConfig: config,
      metaModel,
      props,
      options: options,
    })
  }, [config, metaModel, props])


  const arcFetch = useCallback((params: ComponentPropsWithRequiredModelParams) => {
    // Don't fetch if the component is unmounted
    if (!isMountedRef.current) {
      return Promise.resolve()
    }

    // Create new AbortController only if needed
    if (!abortControllerRef.current) {
      abortControllerRef.current = new AbortController()
    }

    // Mark fetch as in progress
    // setFetchStatus(prev => ({ ...prev, inProgress: true }))

    const axiosOptions: ARCAxiosOptions<Model> = {
      abortController: abortControllerRef.current
    }

    // Use then/catch instead of finally for better compatibility
    return dispatch<any>(actions.fetchOne(params, props, axiosOptions))
      .then((result: AxiosPromise<Model>) => {
        // Once request is complete successfully, update status
        // if (isMountedRef.current) {
        //   setFetchStatus(prev => ({ ...prev, inProgress: false }))
        // }
        return result
      })
      .catch((e: any) => {
        // Once request fails, update status
        // if (isMountedRef.current) {
        //   setFetchStatus(prev => ({ ...prev, inProgress: false }))
        // }
        if (e.name === AXIOS_CANCEL_PAYLOAD.name && e.code === AXIOS_CANCEL_PAYLOAD.code) {
          return
        }
        return;
      })
  }, [dispatch, actions, props, abortControllerRef])

  const delayedFetch = useCallback(({skipReFetchStep = false}) => {
    delayedTimeoutRef.current = window.setTimeout(() => {
      prepareFetch({skipReFetchStep})
    }, config.requestFetchDelay) as unknown as number
  }, [config])


  const prepareFetch = useCallback(({skipReFetchStep = false}) => {
    // Don't trigger a fetch if the component is unmounted
    if (!isMountedRef.current) return

    // For initial fetch on mount, check if we've already done it
    // if (!skipReFetchStep && fetchStatus.hasInitialFetch) return

    // If this is the initial fetch, mark it as done
    // if (!skipReFetchStep) {
    //   setFetchStatus(prev => ({ ...prev, hasInitialFetch: true }))
    // }


    const authorized = _fetchAuthorization(props, {
      skipReFetchStep,
    })
    if (authorized) {
      const max = config.maxPendingRequestsPerReducer
      if (max && max > -1) {
        const count = fetchingCount
        if (count > max) {
          return delayedFetch({skipReFetchStep})
        }
      }

      if (!params) {
        console.error('Fetch params are missing')
        return
      }
      arcFetch(params)
    }
  }, [
    arcFetch,
    params
  ])


  useEffect(() => {

    isMountedRef.current = true

    // Use a small delay to ensure state stability before initial fetch
    const initTimeout = setTimeout(() => {
      if (isMountedRef.current) {
        prepareFetch({skipReFetchStep: false})
      }
    }, 0)

    // Cleanup function executed only on real unmount
    return () => {
      //console.log('ModelContainer unmounting - cleanup phase')
      isMountedRef.current = false
      clearTimeout(initTimeout)
      clearTimeout(delayedTimeoutRef.current)

      // Only abort request if there's actually a fetch in progress
      if (abortControllerRef.current /*&& fetchStatus.inProgress*/) {
        //console.log('ModelContainer unmounted, aborting ongoing request')
        abortControllerRef.current.abort(commons.cancelRequestPayload({ARCConfig: config}))
        abortControllerRef.current = null
      }
    }
  }, [])

  //
  // const arcMethods: UseARCMethods<Model> = {
  //   arc,
  //   get: (args: {
  //     props?: ComponentProps
  //     params: ComponentPropsWithRequiredModelParams
  //   }) => {
  //     const {props = {}, params = {}} = args
  //     return handle(() => arc.get({props: props || defaultProps, params}))
  //   },
  //   remove: (args: {
  //     props?: ComponentProps
  //     params: ComponentPropsWithRequiredModelParams
  //   }) => {
  //     const {props, params} = args
  //     return handle(() =>
  //       arc.remove({props: props || defaultProps, params})
  //     )
  //   },
  //   create: (args: {
  //     props?: ComponentProps
  //     params: ComponentPropsWithRequiredModelParams
  //     body: any
  //   }) => {
  //     const {props, params, body} = args
  //     return handle(() =>
  //       arc.create({props: props || defaultProps, params, body})
  //     )
  //   },
  //   update: (args: {
  //     props?: ComponentProps
  //     params: ComponentPropsWithRequiredModelParams
  //     body: any
  //   }) => {
  //     const {props, params, body} = args
  //     return handle(() =>
  //       arc.update({props: props || defaultProps, params, body})
  //     )
  //   },
  //   extract: (props: ComponentProps) =>
  //     arc.extractParams(props || defaultProps),
  //   extractParams: (props: ComponentProps) =>
  //     arc.extractParams(props || defaultProps),
  //   custom: (fetcher: () => Promise<ARCResponse<Model>>) => {
  //     return handle(fetcher)
  //   },
  // }


  return {
    //data: metaModel?.model,
    data: metaModel?.model || null,
    error: metaModel?.metas.error || null,
    loaded: metaModel?.metas.loaded || false,
    loading: metaModel?.metas.fetching || false,
    ARCConfig: config,
    // error: state.error,
    // loading: state.loading,
    // loaded: state.loaded,
    // response: state.response,
    // arc: arcMethods,
  }
}
