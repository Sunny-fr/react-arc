import {connect} from "react-redux"
import {extendWithDefaultProps, getDefaultConfig} from "../utils"
import {core} from "../actions/core"
import {ARCConfig} from "../types/config.types"
import {ComponentWithStoreProps} from "../types/components.types"
import {ComponentType} from "react"
import {ARCRootState, ARCStoreState} from "../types/connectors.types";


/**
 * Store Connector
 * @param {ARCConfig} config

 */
export function connectFn<Model>(config: ARCConfig<Model>) {
  return function(
    store: ARCRootState<Model>,
    ownProps: object
  )  {
    const namespace = config.name
    if (!store[namespace]) {
      throw new Error(`Namespace "${namespace}" not found in store. Please ensure the ARCConfig is correctly set up.`);
    }

    const reducerState = store[namespace] as unknown as  ARCStoreState<Model>

    const collection = reducerState.collection
    const arcProps = {
      collection,
      tempModel: reducerState.temp,
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

  const extendedConfig:ARCConfig<Model> = { ...getDefaultConfig(), ...config }
  /**
   * @param {Component} Wrapped
   * @return {function(ARCMappedProps)<ARCWrappedComponent>}
   */
  function ARCHoc<T>(Wrapped: ComponentType<T>) {

    //@ts-ignore
    return connect(connectFn(extendedConfig))(Wrapped)
  }
  return ARCHoc
}
