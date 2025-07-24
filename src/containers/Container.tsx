import React from "react"
import { ReduxActionsList } from "../actions/ReduxActionsList"
import {core, CoreMethods } from "../actions/core"
import { getDefaultConfig } from "../utils"
import { ReactReduxContext } from "react-redux"
import { ARCConfig } from "../types/config.types"
import {
  ARCWrappedComponentProps,
  ComponentProps, ComponentWithStoreProps,
} from "../types/components.types"

//import { ARCMetaCollectionMap} from "../types/model.types";





export class Container<P, S, Model> extends React.Component<P & ARCWrappedComponentProps<Model>, S> {
  static contextType = ReactReduxContext
  ARCConfig: ARCConfig<Model>
  actions: ReduxActionsList<Model>
  core: CoreMethods
  abortController: null | AbortController
  props: P & ARCWrappedComponentProps<Model>
  delayedTimeout: number | undefined

  constructor(props: (Readonly<P> | P) & ARCWrappedComponentProps<Model>) {
    //: ARCWrappedComponentProps<Model>
    super(props)
    this.updateARC(props.ARCConfig)
    this.actions = new ReduxActionsList({
      config: this.ARCConfig,
    })
    this.core = core as CoreMethods
    this.abortController = null
  }

  getTrueStoreState() {
    //@ts-ignore
    const store = this.context.store.getState()
    const namespace = this.ARCConfig.name
    return {
      tempModel: store[namespace].temp,
      // GETTING RID OF COLLECTION TYPE
      //      loaded: store[namespace].loaded,
      //      fetching: store[namespace].fetching,
      //      error: store[namespace].error,
      collection: store[namespace].collection,
    }
    // as {
    //   tempModel?: Model | null | undefined
    //   collection: ARCMetaCollectionMap<Model>
    // }
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
    this.ARCConfig = { ...(this.ARCConfig || getDefaultConfig()), ...config }
    if (this.actions) this.actions.updateConfig(this.ARCConfig)
  }

  // render() {
  //   if (this.getError()) return null
  //   if (!this.isLoaded()) return <p>loading</p>
  //   return <div>loaded (you should do something with your view :) )</div>
  // }
}

export default Container
