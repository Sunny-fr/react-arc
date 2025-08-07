import {connect} from "react-redux"
import {extendWithDefaultProps, getDefaultConfig} from "../utils"
import {core} from "../actions/core"
import {ARCConfig} from "../types/config.types"
import {ComponentPropsWithRequiredModelParams, WithARCInjectProps} from "../types/components.types"
import {ComponentType} from "react"
import {ARCRootState} from "../types/connectors.types";

import {metaModelSelector} from "../hooks/selectors";


/**
 * Store Connector
 * @param {ARCConfig} config

 */
export function connectFn<Model, P>(config: ARCConfig<Model>) {
  return function(
    store: ARCRootState,
    ownProps: P
  ) {
    const namespace = config.name
    if (!store[namespace]) {
      throw new Error(`Namespace "${namespace}" not found in store. Please ensure the ARCConfig is correctly set up.`);
    }

    const mergedProps = {
      ...extendWithDefaultProps(config, ownProps),
    } as ComponentPropsWithRequiredModelParams

    const modelKey = core.getKey(config, mergedProps)

    const metaModel = metaModelSelector(store, config, modelKey)

    const loaded = metaModel?.metas?.loaded || false
    const model = metaModel?.model || config.defaultModel || null
    const error = metaModel?.metas?.error || null
    const loading = metaModel?.metas?.fetching || false
    const metas = metaModel?.metas || {}
    const isNew = !modelKey
    return {
      ...mergedProps,
      ARCConfig: config,
      loaded,
      metaModel,
      model,
      error,
      loading,
      metas,
      isNew,
    }
  }
}


export function withARC<Model, P>(config: ARCConfig<Model>) {
  const extendedConfig:ARCConfig<Model> = { ...getDefaultConfig(), ...config }
  function createHOC(Wrapped: ComponentType<P & WithARCInjectProps<Model>>) {
    return connect(connectFn<Model, P>(extendedConfig))(Wrapped)
  }
  return createHOC
}
