import React from "react"
import { ReduxActionsList } from "../actions/ReduxActionsList"
import core, { CoreMethods } from "../actions/core"
import { getDefaultConfig } from "../utils"
import { ReactReduxContext } from "react-redux"
import { ARCConfig } from "../types/config.types"
import {
  ARCWrappedComponentProps,
  ComponentProps,
} from "../types/components.types"

export class Container extends React.Component {
  static contextType = ReactReduxContext
  ARCConfig: ARCConfig
  actions: ReduxActionsList
  core: CoreMethods
  arcCancelPendingRequest: any
  props: ARCWrappedComponentProps

  constructor(props: ARCWrappedComponentProps) {
    super(props)
    this.updateARC(props.ARCConfig)
    this.actions = new ReduxActionsList({
      config: this.ARCConfig,
    })
    this.core = { ...core }
    this.arcCancelPendingRequest = null
  }

  getTrueStoreState() {
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
  }

  getPropsFromTrueStoreState = (props: ComponentProps) => {
    const ARCProps = this.getTrueStoreState()
    const baseProps = props || this.props
    return {
      ...baseProps,
      ...ARCProps,
    }
  }

  updateARC(config: ARCConfig) {
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
