import {connect} from "react-redux"
import {extendWithDefaultProps, getDefaultConfig} from "../utils"
import {core} from "../actions/core"
import {ARCConfig} from "../types/config.types"
import {ARCContainer, ARCContainerProps, ConnectorProps} from "../types/components.types"
import {ARCRootState} from "../types/connectors.types";

import {metaModelSelector} from "../hooks/selectors";


/**
 * Store Connector
 * @param {ARCConfig} config

 */
export function connectFn<Model, RequiredProps, OwnProps = {}>(config: ARCConfig<Model, RequiredProps>) {
  return function(
    store: ARCRootState,
    ownProps: OwnProps
  ):ConnectorProps<Model, RequiredProps, OwnProps> {
    const namespace = config.name
    if (!store[namespace]) {
      throw new Error(`Namespace "${namespace}" not found in store. Please ensure the ARCConfig is correctly set up.`);
    }

    const mergedProps = {
      ...extendWithDefaultProps(config, ownProps),
    } as ARCContainerProps<Model, RequiredProps, OwnProps>

    // const mergedProps = ownProps as ComponentPropsWithRequiredModelParams & AnyProps

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
      modelKey,
      loaded,
      metaModel,
      model,
      error,
      loading,
      metas,
      isNew,
    } as unknown as ConnectorProps<Model, RequiredProps, OwnProps>
  }
}


export function withARC<Model, RequiredProps = {}, OwnProps = {}>(config: ARCConfig<Model, RequiredProps>) {
  const extendedConfig:ARCConfig<Model, RequiredProps> = { ...getDefaultConfig(), ...config }
  function createHOC(Wrapped: ARCContainer<Model, RequiredProps, OwnProps>) {
    const Connector = connect<any, any, RequiredProps & OwnProps, ARCRootState>(
      connectFn<Model, RequiredProps, OwnProps>(extendedConfig)
    )(Wrapped)
    Connector.displayName = `withARC(${Wrapped.displayName || Wrapped.name || 'Component'})`
    //type PropsFromRedux = ConnectedProps<typeof Connector>
    return Connector //as ARCContainer<Model, RequiredProps, OwnProps & PropsFromRedux>
  }
  return createHOC
}
