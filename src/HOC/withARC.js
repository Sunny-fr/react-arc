import React from "react"
import { connect } from "react-redux"
import { extendWithDefaultProps, getDefaultConfig } from "../utils"
import core from "../actions/core"

export const connectFn = (ARCConfig) => (store, ownProps) => {
  const namespace = ARCConfig.name
  const collection = store[namespace].collection
  const arcProps = {
    collection,
    tempModel: store[namespace].temp,
  }
  const mergedProps = {
    ...extendWithDefaultProps(ARCConfig, ownProps),
    //...removeMissingProps(ownProps),
    ...arcProps,
  }
  const metaModel = core._getModel(ARCConfig, mergedProps)
  const loaded = core.isLoaded(ARCConfig, mergedProps)
  const model = core.getModel(ARCConfig, mergedProps)
  const error = core.getError(ARCConfig, mergedProps)
  const syncing = core.isSyncing(ARCConfig, mergedProps)
  const metas = core.getMetas(ARCConfig, undefined, mergedProps)
  const isNew = core.isNew(ARCConfig, mergedProps)
  return {
    ...extendWithDefaultProps(ARCConfig, ownProps),
    ARCConfig,
    loaded,
    metaModel,
    model,
    error,
    syncing,
    metas,
    isNew,
  }
}

export function withARC(ARCConfig) {
  const extendedConfig = { ...getDefaultConfig(), ...ARCConfig }
  return function ARCHoc(Wrapped) {
    return connect(connectFn(extendedConfig))(Wrapped)
  }
}
