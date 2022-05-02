import { connect, DefaultRootState } from "react-redux"
import { extendWithDefaultProps, getDefaultConfig } from "../utils"
import core from "../actions/core"
import { ARCConfig } from "../types/config.types"
import { ComponentWithStoreProps } from "../types/components.types"
import { Component } from "react"

/**
 * Store Connector
 * @param {ARCConfig} config
 * @return {function(StoreConnector)<ARCMappedProps>}
 */
export const connectFn = (config: ARCConfig) => (
  store: DefaultRootState,
  ownProps: object
) => {
  const namespace = config.name
  const collection = store[namespace].collection
  const arcProps = {
    collection,
    tempModel: store[namespace].temp,
    // To be dropped
    temp: store[namespace].temp,
    // To be dropped
    fetching: store[namespace].fetching,
    // To be dropped
    loaded: store[namespace].loaded,
    // To be dropped
    error: store[namespace].error,
  }
  const mergedProps: ComponentWithStoreProps = {
    ...extendWithDefaultProps(config, ownProps),
    //...removeMissingProps(ownProps),
    ...arcProps,
  }
  const metaModel = core._getModel(config, mergedProps)
  const loaded = core.isLoaded(config, mergedProps)
  const model = core.getModel(config, mergedProps)
  const error = core.getError(config, mergedProps)
  const syncing = core.isSyncing(config, mergedProps)
  const metas = core.getMetas(config, undefined, mergedProps)
  const isNew = core.isNew(config, mergedProps)
  return {
    ...extendWithDefaultProps(config, ownProps),
    ARCConfig: config,
    loaded,
    metaModel,
    model,
    error,
    syncing,
    metas,
    isNew,
  }
}

/**
 *
 * @param {ARCConfig} config
 * @return {function(Component)<ARCWrappedComponent>}
 */
export function withARC(config: ARCConfig) {
  /** @type {ARCConfig} **/
  const extendedConfig = { ...getDefaultConfig(), ...config }
  /**
   * @param {Component} Wrapped
   * @return {function(ARCMappedProps)<ARCWrappedComponent>}
   */
  function ARCHoc(Wrapped: Component) {
    // @ts-ignore
    return connect(connectFn(extendedConfig))(Wrapped)
  }
  return ARCHoc
}
