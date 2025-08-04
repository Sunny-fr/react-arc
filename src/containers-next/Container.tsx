import React, {useRef, useCallback, useMemo} from "react"
import {ReduxActionsList} from "../actions/ReduxActionsList"
import {core, CoreMethods} from "../actions/core"
import {getDefaultConfig} from "../utils"
import {useStore} from "react-redux"


import {ARCConfig} from "../types/config.types"
import {
  ARCWrappedComponentProps,
  ComponentProps,
  ComponentWithStoreProps,
} from "../types/components.types"
import {ARCRootState} from "../types/connectors.types";

export interface ContainerHookConfig<Model> {
  ARCConfig: ARCConfig<Model>
}

export interface ContainerHookReturn<Model> {
  ARCConfig: ARCConfig<Model>
  actions: ReduxActionsList<Model>
  core: CoreMethods
  abortController: React.MutableRefObject<AbortController | null>
  getTrueStoreState: () => { collection: any }
  getPropsFromTrueStoreState: (props?: ComponentProps) => ComponentWithStoreProps<Model>
  updateARC: (config: ARCConfig<Model>) => void
}

export function useContainer<Model>({ARCConfig: initialConfig}: ContainerHookConfig<Model>): ContainerHookReturn<Model> {
  const store = useStore()
  const abortControllerRef = useRef<AbortController | null>(null)

  // Initialize ARC configuration with default values and provided configuration
  const [ARCConfig, actions] = useMemo(() => {
    const config: ARCConfig<Model> = {...(getDefaultConfig()), ...initialConfig}
    const actionsList = new ReduxActionsList({config})
    return [config, actionsList]
  }, [initialConfig])

  // Get current store state for the specific namespace
  const getTrueStoreState = useCallback(() => {
    const state = store.getState() as ARCRootState
    const namespace = ARCConfig.name
    if (!state[namespace]) {
      console.error(`Namespace "${namespace}" not found in store. Please check ARCConfig setup.`)
      return {collection: {}}
    }
    return {
      collection: state[namespace].collection,
    }
  }, [store, ARCConfig])

  // Get combined props from store state and provided props
  const getPropsFromTrueStoreState = useCallback((props?: ComponentProps) => {
    const ARCProps = getTrueStoreState()
    return {
      ...props,
      ...ARCProps,
    } as unknown as ComponentWithStoreProps<Model>
  }, [getTrueStoreState])

  // Update ARC configuration
  const updateARC = useCallback((config: ARCConfig<Model>) => {
    actions.updateConfig(config)
    return config
  }, [actions])

  return {
    ARCConfig,
    actions,
    core: core as CoreMethods,
    abortController: abortControllerRef,
    getTrueStoreState,
    getPropsFromTrueStoreState,
    updateARC
  }
}

// Container functional component that uses the useContainer hook
export function Container<P, Model>(props: P & ARCWrappedComponentProps<Model>) {
  const {ARCConfig} = props
  const container = useContainer<Model>({ARCConfig})

  return {
    ...container,
    props
  }
}

export default Container
