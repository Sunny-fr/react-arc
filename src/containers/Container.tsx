import React from "react"
import {ReduxActions} from "../actions/ReduxActions"
import {core, CoreMethods} from "../actions/core"
import {initializeConfig} from "../utils"
import {ReactReduxContext} from "react-redux"
import {ARCConfig} from "../types/config.types"
import {AnyProps, ARCContainerProps} from "../types/components.types"
import {ARCRootState, ARCStoreState} from "../types/connectors.types";


export class Container<Model, RequiredProps, OwnProps, State = any> extends React.Component<ARCContainerProps<Model, RequiredProps, OwnProps>, State> {
  static contextType = ReactReduxContext
  ARCConfig: ARCConfig<Model, RequiredProps>
  actions: ReduxActions<Model, RequiredProps>
  core: CoreMethods
  abortController: null | AbortController
  // props: ARCContainerProps<OwnProps, Model, RequiredProps>
  delayedTimeout: number | undefined

  constructor(props: ARCContainerProps<Model, RequiredProps, OwnProps>) {

    super(props)

    this.updateARC(props.ARCConfig)
    this.actions = new ReduxActions({
      config: this.ARCConfig,
    })
    this.core = core as CoreMethods
    this.abortController = null
  }

  getTrueStoreState() {
    // @ts-ignore
    const rootState:ARCRootState = this.context.store.getState()
    const namespace = this.ARCConfig.name
    const store: ARCStoreState<Model> = rootState[namespace]
    return {
      collection: store.collection,
    }
  }

  getPropsFromTrueStoreState = (props?: AnyProps) => {
    const ARCProps = this.getTrueStoreState()
    const baseProps = props || this.props
    return {
      ...baseProps,
      ...ARCProps,
    }
  }

  updateARC(config: ARCConfig<Model, RequiredProps>) {
    this.ARCConfig = { ...(this.ARCConfig || initializeConfig(this.ARCConfig)), ...config }
    if (this.actions) {
      this.actions.updateConfig(this.ARCConfig)
    }
  }

}

export default Container
