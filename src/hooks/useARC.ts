import { useEffect, useRef, useState } from "react"
import { ARC } from "./arc"
import {
  ComponentProps,
  ComponentPropsWithRequiredModelParams,
} from "../types/components.types"
import { ARCConfig } from "../types/config.types"
import {UseARCMethods, UseARC, UseARCState, ARCResponse} from "../types/hooks.types"

export function useARC<Model>({
  ARCConfig,
  props,
}: {
  ARCConfig: ARCConfig<Model>
  props: ComponentProps
}): UseARC<Model> {
  const arc = new ARC({ ARCConfig })
  const defaultProps = props
  const defaultState: UseARCState<Model> = {
    error: null,
    loading: false,
    loaded: false,
    response: null,
    pending: false,
  }
  const pendingPromise = useRef<Promise< ARCResponse<Model>> | null>(null)
  const [state, setState] = useState<UseARCState<Model>>(defaultState)

  const handle = (fetcher: () => Promise<ARCResponse<Model>>) => {
    if (state.pending && pendingPromise.current) {
      // If a request is already pending, return the existing promise
      return pendingPromise.current
    }
    setState({ ...state, error: null, loading: true })
    pendingPromise.current = fetcher()
    pendingPromise.current
      .then((response) => {
        setState({
          ...state,
          loaded: true,
          error: null,
          loading: false,
          response,
        })

        pendingPromise.current = null
        return Promise.resolve(response)
      })
      .catch((error) => {
        setState({ ...state, error, loading: false, pending: false })
        pendingPromise.current = null
        return Promise.reject(error)
      })

    return pendingPromise.current
  }

  const params = useRef(arc.extractParams(props))

  useEffect(() => {
    if (arc.hasRequiredParams(params.current)) {
      handle(() => arc.get({ props, params: params.current }))
    }
  }, [params])

  const arcMethods: UseARCMethods<Model> = {
    arc,
    get: (args: {
      props?: ComponentProps
      params: ComponentPropsWithRequiredModelParams
    }) => {
      const { props = {}, params = {} } = args
      return handle(() => arc.get({ props: props || defaultProps, params }))
    },
    remove: (args: {
      props?: ComponentProps
      params: ComponentPropsWithRequiredModelParams
    }) => {
      const { props, params } = args
      return handle(() =>
        arc.remove({ props: props || defaultProps, params })
      )
    },
    create: (args: {
      props?: ComponentProps
      params: ComponentPropsWithRequiredModelParams
      body: any
    }) => {
      const { props, params, body } = args
      return handle(() =>
        arc.create({ props: props || defaultProps, params, body })
      )
    },
    update: (args: {
      props?: ComponentProps
      params: ComponentPropsWithRequiredModelParams
      body: any
    }) => {
      const { props, params, body } = args
      return handle(() =>
        arc.update({ props: props || defaultProps, params, body })
      )
    },
    extract: (props: ComponentProps) =>
      arc.extractParams(props || defaultProps),
    extractParams: (props: ComponentProps) =>
      arc.extractParams(props || defaultProps),
    custom: (fetcher: () => Promise<ARCResponse<Model>>) => {
      return handle(fetcher)
    },
  }

  return {
    error: state.error,
    loading: state.loading,
    loaded: state.loaded,
    response: state.response,
    arc: arcMethods,
  }
}
