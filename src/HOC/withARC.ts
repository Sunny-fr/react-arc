import {connect} from "react-redux"
import {extendWithDefaultProps, getDefaultConfig} from "../utils"
import {core} from "../actions/core"
import {ARCConfig} from "../types/config.types"
import {ComponentPropsWithRequiredModelParams} from "../types/components.types"
import {ComponentType} from "react"
import {ARCRootState, ARCStoreState} from "../types/connectors.types";


/**
 * Store Connector
 * @param {ARCConfig} config

 */
export function connectFn<Model>(config: ARCConfig<Model>) {
  return function(
    store: ARCRootState,
    ownProps: object
  )  {
    const namespace = config.name
    if (!store[namespace]) {
      throw new Error(`Namespace "${namespace}" not found in store. Please ensure the ARCConfig is correctly set up.`);
    }

    const reducerState:ARCStoreState<Model> = store[namespace]

    // const collection = reducerState.collection

    const mergedProps: ComponentPropsWithRequiredModelParams = {
      ...extendWithDefaultProps(config, ownProps),
      //...removeMissingProps(ownProps),
      // collection,
    }
    const metaModel = core._getModel(config, mergedProps, reducerState)
    const loaded = core.isLoaded(config, mergedProps, reducerState)
    const model = core.getModel(config, mergedProps, reducerState)
    const error = core.getError(config, mergedProps, reducerState)
    const syncing = core.isSyncing(config, mergedProps, reducerState)
    const metas = core.getMetas(config, undefined, mergedProps, reducerState)
    const isNew = core.isNew(config, mergedProps)
    return {
      ...extendWithDefaultProps(config, ownProps),
      ARCConfig: config,
      ARCReducerState: reducerState,
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
