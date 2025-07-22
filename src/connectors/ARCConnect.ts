import {ARCConfig} from "../types/config.types";
import {ARCStoreState} from "../types/connectors.types";
import {ComponentWithStoreProps} from "../types/components.types";
import {extendWithDefaultProps} from "../utils";
import {core} from "../actions/core";

/**
 * Store Connector
 * @param {ARCConfig} config

 */
export function ARCConnect<T extends object, Model>(config: ARCConfig<Model>) {
  return function (
    store: ARCStoreState<Model>,
    ownProps: T
  ):ComponentWithStoreProps<Model> {
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
      fetching:syncing,
      syncing:syncing,
      metas,
      isNew,
      temp:  store[namespace].temp,
      collection: collection
    }
  }
}