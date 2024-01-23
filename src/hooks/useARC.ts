import { useEffect, useRef, useState } from "react"
import { ARC } from "./arc"
import {
  ComponentProps,
  ComponentPropsWithRequiredModelParams,
} from "../types/components.types"
import { ARCConfig } from "../types/config.types"

interface UseARCState {
  error: null | object
  loading: boolean
  loaded: boolean
  response: Response | null
  pending: boolean
}

export function useARC<Model>({
  ARCConfig,
  props,
}: {
  ARCConfig: ARCConfig<Model>
  props: ComponentProps
}) {
  const arc = new ARC({ ARCConfig })
  const defaultProps = props
  const defaultState: UseARCState = {
    error: null,
    loading: false,
    loaded: false,
    response: null,
    pending: false,
  }
  const [state, setState] = useState<UseARCState>(defaultState)

  const handle = (fetcher: () => Promise<Response>) => {
    if (state.pending) return
    setState({ ...state, error: null, loading: true })
    return fetcher()
      .then((response) => {
        setState({
          ...state,
          loaded: true,
          error: null,
          loading: false,
          response,
        })
        return response
      })
      .catch((error) => {
        setState({ ...state, error, loading: false, pending: false })
      })
  }

  const params = useRef(arc.extractParams(props))

  useEffect(() => {
    if (arc.hasRequiredParams(params.current)) {
      handle(() => arc.get({ props, params: params.current }))
    }
  }, [params])

  return {
    error: state.error,
    loading: state.loading,
    loaded: state.loaded,
    response: state.response,
    arc: {
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
      custom: (fetcher: () => Promise<Response>) => {
        return handle(fetcher)
      },
    },
  }
}
