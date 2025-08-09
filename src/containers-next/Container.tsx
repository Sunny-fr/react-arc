import React, {useCallback, useMemo, useRef} from "react"
import {ReduxActions} from "../actions/ReduxActions"
import {core, CoreMethods} from "../actions/core"
import {initializeConfig} from "../utils"


import {ARCConfig} from "../types/config.types"
import {ARCContainerProps} from "../types/components.types"

export interface UseContainerParams<Model, RequiredProps> {
  ARCConfig: ARCConfig<Model, RequiredProps>
}

export interface UseContainerReturn<Model, RequiredProps = {}> {
  ARCConfig: ARCConfig<Model, RequiredProps>
  actions: ReduxActions<Model, RequiredProps>
  core: CoreMethods
  abortController:  React.RefObject<AbortController | null>
  updateARC: (config: ARCConfig<Model, RequiredProps>) => void
}

export function useContainer<Model,RequiredProps = {}>({ARCConfig: initialConfig}: UseContainerParams<Model, RequiredProps>): UseContainerReturn<Model, RequiredProps> {
  const abortControllerRef = useRef<AbortController | null>(null)

  // Initialize ARC configuration with default values and provided configuration
  const [ARCConfig, actions] = useMemo(() => {
    const config: ARCConfig<Model, RequiredProps> = initializeConfig(initialConfig)
    const actionsList = new ReduxActions<Model, RequiredProps>({config})
    return [config, actionsList]
  }, [initialConfig])

  // Update ARC configuration
  const updateARC = useCallback((config: ARCConfig<Model, RequiredProps>) => {
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
export function Container<Model, RequiredProps = {}, OwnProps={}>(props: ARCContainerProps<Model, RequiredProps, OwnProps> ) {
  const {ARCConfig} = props
  const container = useContainer<Model, RequiredProps>({ARCConfig})
  return {
    ...container,
    props
  }
}

export default Container
