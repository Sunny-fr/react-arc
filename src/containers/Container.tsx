import React from "react"
import {ReduxActions} from "../actions/ReduxActions"
import {core, CoreMethods} from "../actions/core"
import {initializeConfig} from "../utils"
import {ReactReduxContext} from "react-redux"
import {ARCConfig} from "../types/config.types"
import {ARCWrappedComponentProps, ComponentProps, ComponentWithStoreProps,} from "../types/components.types"
import {ARCRootState, ARCStoreState} from "../types/connectors.types";


export class Container<P, S, Model> extends React.Component<P & ARCWrappedComponentProps<Model>, S> {
  static contextType = ReactReduxContext
  ARCConfig: ARCConfig<Model>
  actions: ReduxActions<Model>
  core: CoreMethods
  abortController: null | AbortController
  props: P & ARCWrappedComponentProps<Model>
  delayedTimeout: number | undefined

  constructor(props: (Readonly<P> | P) & ARCWrappedComponentProps<Model>) {
    //: ARCWrappedComponentProps<Model>
    super(props)
    this.updateARC(props.ARCConfig)
    this.actions = new ReduxActions({
      config: this.ARCConfig,
    })
    this.core = core as CoreMethods
    this.abortController = null
  }

  getTrueStoreState() {
    //@ts-ignore
    const rootState:ARCRootState = this.context.store.getState()
    const namespace = this.ARCConfig.name
    const store: ARCStoreState<Model> = rootState[namespace]
    return {
      collection: store.collection,
    }
  }

  getPropsFromTrueStoreState = (props?: ComponentProps) => {
    const ARCProps = this.getTrueStoreState()
    const baseProps = props || this.props
    return {
      ...baseProps,
      ...ARCProps,
    } as unknown as ComponentWithStoreProps<Model>
  }

  updateARC(config: ARCConfig<Model>) {
    this.ARCConfig = { ...(this.ARCConfig || initializeConfig(this.ARCConfig)), ...config }
    if (this.actions) this.actions.updateConfig(this.ARCConfig)
  }

}

export default Container
