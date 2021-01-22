import React from "react"
import { ReduxActionsList } from "../actions/ReduxActionsList"
import core from "../actions/core"
import { getDefaultConfig } from "../utils"
import { ReactReduxContext } from "react-redux"

export class AbstractContainer extends React.Component {
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
    return {
      tempModel: store[this.ARCConfig.name].temp,
      loaded: store[this.ARCConfig.name].loaded,
      fetching: store[this.ARCConfig.name].fetching,
      error: store[this.ARCConfig.name].error,
      collection: store[this.ARCConfig.name].collection,
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

export default AbstractContainer
