import React, {useCallback, useContext, useEffect, useRef, useState} from "react"
import {omit} from "../utils"
import commons from "../commons"
import {useContainer, UseContainerParams} from "./Container"
import {ARCContainerProps, WithARCInjectProps,} from "../types/components.types"
import {ARCAxiosOptions} from "../types/actions.types"
import {ARCMetas} from "../types/model.types"
import {ReactReduxContext, useDispatch} from "react-redux"
import {ThunkDispatch} from "redux-thunk"
import {fetchingCountSelector, metaModelSelector} from "../hooks/selectors";


export interface UseModelContainer<Model, RequiredProps = {}, OwnProps = {}> extends UseContainerParams<Model,RequiredProps> {
  props: ARCContainerProps<Model, RequiredProps, OwnProps>
}

export function useModelContainer<Model, RequiredProps extends object = {}, OwnProps extends object = {}>({
  ARCConfig,
  props
}: UseModelContainer<Model, RequiredProps, OwnProps>) {
  const dispatch = useDispatch<ThunkDispatch<any, any, any>>()
  const reduxContext = useContext(ReactReduxContext)
  const container = useContainer<Model, RequiredProps>({ ARCConfig })
  const {
    actions,
    core,
    abortController: abortControllerRef,
  } = container

  const delayedTimeoutRef = useRef<number | undefined>(undefined)

  const isMountedRef = useRef(true) // Reference to track if the component is mounted
  const [fetchStatus, setFetchStatus] = useState({
    inProgress: false,
    hasInitialFetch: false
  })

  /** PUBLIC METHODS **/

  /**
   * Returns model data retrieved from the server
   * @param componentProps Optional component props
   * @returns The model data
   */
  const getModel = useCallback((componentProps?: ARCContainerProps<Model, RequiredProps, OwnProps>) => {
    return (componentProps || props).model
  }, [props])

  /**
   * Returns any error information
   * @param componentProps Optional component props
   * @returns Error information
   */
  const getError = useCallback((componentProps?: ARCContainerProps<Model, RequiredProps, OwnProps>) => {
    return (componentProps || props).error
  }, [props])

  /**
   * Checks if there's any sync activity in progress
   * @param componentProps Optional component props
   * @returns Boolean indicating if sync is in progress
   */
  const isSyncing = useCallback((componentProps?: ARCContainerProps<Model, RequiredProps, OwnProps>) => {
    return (componentProps || props).loading
  }, [props])

  /**
   * Checks if the model has been loaded at least once
   * @param componentProps Optional component props
   * @returns Boolean indicating if model is loaded
   */
  const isLoaded = useCallback((componentProps?: ARCContainerProps<Model, RequiredProps, OwnProps>) => {
    return (componentProps || props).loaded
  }, [props])

  /** PUBLIC ACTIONS METHODS **/

  /**
   * Checks if the component has not the required params and should be considered as new
   * @param componentProps Optional props to check against instead of current props
   * @returns boolean indicating if the model is new
   */
  const isNew = useCallback((componentProps?: ARCContainerProps<Model, RequiredProps, OwnProps>) => {
    return core.isNew(ARCConfig, componentProps || props)
  }, [core, ARCConfig, props])

  /**
   * Returns null or string that acts as unique identifier (based on required props)
   * @param componentProps Optional props to generate key from
   * @returns A string key or null
   */
  const getKey = useCallback((componentProps?: ARCContainerProps<Model, RequiredProps, OwnProps>) => {
    return core.getKey(ARCConfig, componentProps || props)
  }, [core, ARCConfig, props])

  /**
   * Retrieves params from props or model
   * @param componentProps Optional props to get params from
   * @returns The extracted params
   */
  const getParams = useCallback((componentProps?: ARCContainerProps<Model, RequiredProps, OwnProps>) => {
    return core.getParams(ARCConfig, componentProps || props)
  }, [core, ARCConfig, props])

  /**
   * Checks if the component has the required params based on modelProps in config
   * @param componentProps Optional props to check against
   * @returns Boolean indicating if required params are present
   */
  const hasRequiredParams = useCallback((componentProps?: ARCContainerProps<Model, RequiredProps, OwnProps>) => {
    return core.hasRequiredParams(ARCConfig, componentProps || props)
  }, [core, ARCConfig, props])

  /**
   * Gets a model and its meta data
   * @param componentProps Optional component props to use
   * @returns The model data
   */
  const _getModel = useCallback((componentProps: ARCContainerProps<Model, RequiredProps, OwnProps>) => {
    return core._getModel(componentProps.metaModel)
  }, [core])

  /**
   * Returns meta information (loaded, error, etc.)
   * @param prop Specific meta property to retrieve
   * @param componentProps Optional component props
   * @returns The requested meta information
   */
  const getMetas = useCallback((prop: keyof ARCMetas, componentProps?: ARCContainerProps<Model, RequiredProps, OwnProps>) => {
    const metas = (componentProps || props).metas
    if (!metas) {
      return metas
    }
    return !!prop ? metas[prop] : metas
  }, [props])



  /**
   * Fetches a model from the server
   * @param params The params required for fetching
   * @returns Promise resolving to the fetch result
   */
  const fetch = useCallback((params: RequiredProps) => {
    // Don't fetch if the component is unmounted
    if (!isMountedRef.current) {
      return Promise.resolve()
    }

    // Create new AbortController only if needed
    if (!abortControllerRef.current) {
      abortControllerRef.current = new AbortController()
    }

    // Mark fetch as in progress
    setFetchStatus(prev => ({ ...prev, inProgress: true }))

    const axiosOptions: ARCAxiosOptions<Model, RequiredProps, OwnProps> = {
      abortController: abortControllerRef.current
    }

    // Use then/catch instead of finally for better compatibility
    return dispatch(actions.fetchOne(params, props, axiosOptions))
      .then((result) => {
        // Once request is complete successfully, update status
        if (isMountedRef.current) {
          setFetchStatus(prev => ({ ...prev, inProgress: false }))
        }
        return result
      })
      .catch((error:any) => {
        // Once request fails, update status
        if (isMountedRef.current) {
          setFetchStatus(prev => ({ ...prev, inProgress: false }))
        }
        throw error // re-throw to propagate the error
      })
  }, [dispatch, actions, props, abortControllerRef])




  /** ADDITIONAL METHODS **/

  /**
   * Returns count of fetching requests
   * @returns Number of active fetch requests
   */
  const getFetchingCount = useCallback(() => {
    return fetchingCountSelector(reduxContext?.store.getState(), ARCConfig.name)
  },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [ARCConfig])

  /**
   * Determines if a refetch is allowed based on the fetchOnce flag
   * @param componentProps Optional component props
   * @returns Boolean indicating if refetch is allowed
   */
  const allowReFetch = useCallback((componentProps?: ARCContainerProps<Model, RequiredProps, OwnProps>) => {
    return core.allowReFetch(ARCConfig, componentProps?.metaModel)
  }, [core, ARCConfig])

  /**
   * Determines if a refetch is allowed on error
   * @param componentProps Optional component props
   * @returns Boolean indicating if refetch on error is allowed
   */
  const errorReFetch = useCallback((componentProps?: ARCContainerProps<Model, RequiredProps, OwnProps>) => {
    return core.errorReFetch(ARCConfig, componentProps?.metaModel)
  }, [core, ARCConfig])

  /**
   * Determines if fetch is authorized based on several conditions
   * @param componentProps The component props to check
   * @param options Options for fetch authorization
   * @returns Boolean indicating if fetch is authorized
   */
  const _fetchAuthorization = useCallback((componentProps: ARCContainerProps<Model, RequiredProps, OwnProps>, { skipReFetchStep = false }) => {



    const modelKey = core.getKey(ARCConfig, props)
    const metaModel = metaModelSelector(reduxContext?.store.getState(), ARCConfig.name, modelKey)

    //const metaModel = componentProps?.metaModel
    if (isNew(componentProps)) {
      return false
    }

    if (!hasRequiredParams(componentProps)) {
      return false
    }

    if (typeof core._getModel(metaModel) === "undefined" || !metaModel) {
      return true
    }

    if (core.isSyncing(metaModel)) {
      return false
    }

    if (
      !skipReFetchStep &&
      core.isLoaded(metaModel) &&
      allowReFetch(componentProps)
    ) {
      return true
    }

    if (
      !skipReFetchStep &&
      !!core.getError(metaModel) &&
      errorReFetch(componentProps)
    ) {
      return true
    }
    return false
  },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [core, isNew, hasRequiredParams, allowReFetch, errorReFetch, ARCConfig])

  /**
   * Get the model data with appropriate fallback
   * @returns The model data or default model
   */
  const getModelDataTyped = useCallback(() => {
    const loaded = isLoaded()
    const error = getError()
    return !error && loaded && !isNew() ? getModel() : ARCConfig.defaultModel
  }, [isLoaded, getError, isNew, getModel, ARCConfig])

  /**
   * Schedule a delayed fetch for throttling
   * @param options Options for the delayed fetch
   */
  const delayedFetch = useCallback(({ skipReFetchStep = false }) => {
    delayedTimeoutRef.current = window.setTimeout(() => {
      prepareFetch({ skipReFetchStep })
    }, ARCConfig.requestFetchDelay) as unknown as number
  },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [ARCConfig]) // Note: Will add prepareFetch to dependencies after it's defined

  /**
   * Prepares a fetch with max pending request check
   * @param options Options for preparing the fetch
   */
  const prepareFetch = useCallback(({ skipReFetchStep = false }) => {
    // Don't trigger a fetch if the component is unmounted
    if (!isMountedRef.current) return

    // For initial fetch on mount, check if we've already done it
    if (!skipReFetchStep && fetchStatus.hasInitialFetch) return

    // If this is the initial fetch, mark it as done
    if (!skipReFetchStep) {
      setFetchStatus(prev => ({ ...prev, hasInitialFetch: true }))
    }


    if (_fetchAuthorization(props, { skipReFetchStep })) {
      const max = ARCConfig.maxPendingRequestsPerReducer
      if (max && max > -1) {
        const count = getFetchingCount()
        if (count > max) {
          return delayedFetch({ skipReFetchStep })
        }
      }
      const params = getParams(props)
      if (!params) {
        console.error('Fetch params are missing')
        return
      }
      fetch(params)
    }
  }, [
    _fetchAuthorization,
    props,
    ARCConfig,
    getFetchingCount,
    getParams,
    fetch,
    fetchStatus.hasInitialFetch,
    delayedFetch
  ])

  // Fix circular dependency by updating delayedFetch to include prepareFetch in dependencies
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useCallback(delayedFetch, [prepareFetch, ARCConfig])

  // Mount effect - run once at component initialization
  useEffect(() => {
    //console.log('ModelContainer mounted with props:', props)
    isMountedRef.current = true

    // Use a small delay to ensure state stability before initial fetch
    const initTimeout = setTimeout(() => {
      if (isMountedRef.current) {
        prepareFetch({ skipReFetchStep: false })
      }
    }, 0)

    // Cleanup function executed only on real unmount
    return () => {
      //console.log('ModelContainer unmounting - cleanup phase')
      isMountedRef.current = false
      clearTimeout(initTimeout)
      clearTimeout(delayedTimeoutRef.current)

      // Only abort request if there's actually a fetch in progress
      if (abortControllerRef.current && fetchStatus.inProgress) {
        //console.log('ModelContainer unmounted, aborting ongoing request')
        abortControllerRef.current.abort(commons.cancelRequestPayload({ ARCConfig }))
        abortControllerRef.current = null
      }
    }
  },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []) // Empty deps array ensures this runs only on mount/unmount

  // Separate update effect for props changes - avoids restarting the complete lifecycle
  useEffect(() => {
    // Skip for initial render - the first useEffect already handles it
    if (fetchStatus.hasInitialFetch && isMountedRef.current) {
      prepareFetch({ skipReFetchStep: true })
    }
  }, [props, prepareFetch, fetchStatus.hasInitialFetch])


  return {
    ...container,
    isNew,
    getKey,
    getParams,
    hasRequiredParams,
    _getModel,
    fetch,
    getFetchingCount,
    getModel,
    getMetas,
    getError,
    isSyncing,
    isLoaded,
    allowReFetch,
    errorReFetch,
    getModelDataTyped,
    prepareFetch
  }
}


export type ModelContainerProps<Model,RequiredProps = {}, OwnProps = {}> = OwnProps & ARCContainerProps<Model, RequiredProps, OwnProps> & {
  //component: React.ComponentType<OwnProps & ARCContainerProps<Model, RequiredProps>>
}

export function ModelContainer<Model, RequiredProps extends object = {}, OwnProps = {}>(props: ModelContainerProps<Model, RequiredProps, OwnProps>) {
  const { ARCConfig, component: Component } = props
  const dispatch = useDispatch()

  const {
    isLoaded,
    isSyncing,
    getError,
    getModelDataTyped,
    getParams,
    fetch
  } = useModelContainer<Model, RequiredProps>({
    ARCConfig,
    props: { ...props, dispatch }
  })

  const componentProps = omit(props, ['ARCConfig', 'component']) as WithARCInjectProps<Model, RequiredProps, OwnProps>
  const loaded = isLoaded()
  const loading = isSyncing()
  const error = getError()
  const data = getModelDataTyped()


  if (!Component) {
    console.error('ModelContainer: component prop is required')
    return null
  }

  const params = getParams(props)
  if (!params) {
    console.error('ModelContainer: params are required')
    return null
  }

  return (
    <Component
      {...componentProps}
      loading={loading}
      loaded={loaded}
      model={data}
      error={error}
      fetch={fetch ? () => fetch(params) : undefined}
    />
  )
}

export default ModelContainer
