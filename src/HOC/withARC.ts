import { connect } from "react-redux"
import { extendWithDefaultProps, getDefaultConfig } from "../utils"
import core from "../actions/core"
import { ARCConfig } from "../types/config.types"
import { ComponentWithStoreProps } from "../types/components.types"
import { ComponentType} from "react"
import {ARCStoreState} from "../types/connectors.types";

/**
 * Store Connector
 * @param {ARCConfig} config

 */
export function connectFn<Model>(config: ARCConfig<Model>) {
  return function(
    store: ARCStoreState<Model>,
    ownProps: object
  )  {
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
    const mergedProps: ComponentWithStoreProps<Model> = {
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
}

/**
 *
 * @param {ARCConfig} config
 * @return {function(Component)<ARCWrappedComponent>}
 */
export function withARC<Model>(config: ARCConfig<Model>) {
  /** @type {ARCConfig} **/
  const extendedConfig:ARCConfig<Model> = { ...getDefaultConfig(), ...config }
  /**
   * @param {Component} Wrapped
   * @return {function(ARCMappedProps)<ARCWrappedComponent>}
   */
  function ARCHoc<T>(Wrapped: ComponentType<T>) {
    // @ts-ignore
    return connect(connectFn(extendedConfig))(Wrapped)
  }
  return ARCHoc
}
