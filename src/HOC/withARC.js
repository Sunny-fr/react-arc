import React from "react"
import { connect } from "react-redux"
import { getDefaultConfig, extendWithMissingDefaultProps } from "../utils"
import core from "../actions/core"

export const connectFn = (ARCConfig) => (store, ownProps) => {
  const namespace = ARCConfig.name
  const collection = store[namespace].collection
  const arcProps = {
    collection,
    tempModel: store[namespace].temp,
  }
  const mergedProps = {
    ...extendWithMissingDefaultProps(ARCConfig, ownProps),
    ...arcProps,
  }
  const metaModel = core._getModel(ARCConfig, mergedProps)
  const loaded = core.isLoaded(ARCConfig, mergedProps)
  const model = core.getModel(ARCConfig, mergedProps)
  const error = core.getError(ARCConfig, mergedProps)
  const syncing = core.isSyncing(ARCConfig, mergedProps)
  const metas = core.getMetas(ARCConfig, undefined, mergedProps)
  return {
    ARCConfig,
    loaded,
    metaModel,
    model,
    error,
    syncing,
    metas,
    ...extendWithMissingDefaultProps(ARCConfig, ownProps),
  }
}

export function withARC(ARCConfig) {
  const extendedConfig = { ...getDefaultConfig(), ...ARCConfig }
  return function ARCHoc(Wrapped) {
    return connect(connectFn(extendedConfig))(Wrapped)
  }
}
