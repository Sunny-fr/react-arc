import React from "react"
import { ReduxActionsList } from "../actions/ReduxActionsList"
import core from "../actions/core"
import { getDefaultConfig } from "../utils"
import { ReactReduxContext } from "react-redux"

export class Container extends React.Component {
  static contextType = ReactReduxContext

  constructor(props) {
    super(props)
    this.updateARC(props.ARCConfig)
    this.actions = new ReduxActionsList({
      config: this.ARCConfig,
      retryConditionFn: props.retryConditionFn,
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

  getPropsFromTrueStoreState = (props) => {
    const ARCProps = this.getTrueStoreState()
    const baseProps = props || this.props
    return {
      ...baseProps,
      ...ARCProps,
    }
  }

  updateARC(config) {
    this.ARCConfig = { ...(this.ARCConfig || getDefaultConfig()), ...config }
    if (this.actions) this.actions.updateConfig(this.ARCConfig)
  }

  render() {
    if (this.getError()) return null
    if (!this.isLoaded()) return <p>loading</p>
    return <div>loaded (you should do something with your view :) )</div>
  }
}

export default Container
