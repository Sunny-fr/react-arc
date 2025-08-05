import React, {useCallback, useMemo, useRef} from "react"
import {ReduxActions} from "../actions/ReduxActions"
import {core, CoreMethods} from "../actions/core"
import {initializeConfig} from "../utils"


import {ARCConfig} from "../types/config.types"
import {ARCWrappedComponentProps,} from "../types/components.types"

export interface ContainerHookConfig<Model> {
  ARCConfig: ARCConfig<Model>
}

export interface ContainerHookReturn<Model> {
  ARCConfig: ARCConfig<Model>
  actions: ReduxActions<Model>
  core: CoreMethods
  abortController: React.MutableRefObject<AbortController | null>
  updateARC: (config: ARCConfig<Model>) => void
}

export function useContainer<Model>({ARCConfig: initialConfig}: ContainerHookConfig<Model>): ContainerHookReturn<Model> {
  const abortControllerRef = useRef<AbortController | null>(null)

  // Initialize ARC configuration with default values and provided configuration
  const [ARCConfig, actions] = useMemo(() => {
    const config: ARCConfig<Model> = initializeConfig(initialConfig)
    const actionsList = new ReduxActions({config})
    return [config, actionsList]
  }, [initialConfig])

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
