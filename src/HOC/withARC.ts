import {connect} from "react-redux"
import {extendWithDefaultProps, getDefaultConfig} from "../utils"
import {core} from "../actions/core"
import {ARCConfig} from "../types/config.types"
import {ARCConnectedComponent, ComponentPropsWithRequiredModelParams} from "../types/components.types"
import {ComponentType} from "react"
import {ARCRootState, ARCStoreState} from "../types/connectors.types";

import {metaModelSelector} from "../hooks/selectors";




/**
 * Store Connector
 * @param {ARCConfig} config

 */
export function connectFn<Model, P extends object = {}>(config: ARCConfig<Model>) {
  return function(
    store: ARCRootState,
    ownProps: P
  ):ARCConnectedComponent<Model> & P {
    const namespace = config.name
    if (!store[namespace]) {
      throw new Error(`Namespace "${namespace}" not found in store. Please ensure the ARCConfig is correctly set up.`);
    }

    const mergedProps: ComponentPropsWithRequiredModelParams = {
      ...extendWithDefaultProps(config, ownProps),
    }

    const modelKey = core.getKey(config, mergedProps)

    const metaModel = metaModelSelector(store, config, modelKey)

    const loaded = metaModel?.metas?.loaded || false
    const model = metaModel?.model || config.defaultModel || null
    const error = metaModel?.metas?.error || null
    const syncing = metaModel?.metas?.fetching || false
    const metas = metaModel?.metas || {}
    const isNew = !modelKey
    return {
      ...mergedProps,
      ARCConfig: config,
      loaded,
      metaModel,
      model,
      error,
      syncing,
      metas,
      isNew,
    } as ARCConnectedComponent<Model> & P
  }
}

/**
 *
 * @param {ARCConfig} config
 * @return {function(Component)<ARCWrappedComponent>}
 */
export function withARC<Model>(config: ARCConfig<Model>) {

  const extendedConfig:ARCConfig<Model> = { ...getDefaultConfig(), ...config }

  function createHOC<P extends object = {}>(Wrapped: ComponentType<P
    & ARCConnectedComponent<Model> & { ARCConfig: ARCConfig<Model> } & { ARCReducerState: ARCStoreState<Model> }
  >) {
    return connect(connectFn<Model, P>(extendedConfig))(Wrapped)
  }
  return createHOC
}
