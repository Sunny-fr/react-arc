/**
 * ARCMappedProps
 */
import { ARCConfig } from "./config.types"
import {ARCCollectionMap, ARCMetaCollectionMap, ARCMetaModel} from "./model.types"


export interface ARCMappedProps<Model> {
  loaded: boolean
  metaModel: object
  model: object
  error: object
  syncing: boolean
  metas: object
  isNew: boolean
  ARCConfig: ARCConfig<Model>
  collection: ARCCollectionMap<Model>
  tempModel?: Model | object
}

/**
 *  StoreConnector
 */

export type ARCStoreConnector = <Model>(
  store: object,
  ownProps: object
) => ARCMappedProps<Model>

/**
 * ARC Store
 */

export interface ARCStoreState<Model> {
  collection: ARCMetaCollectionMap<Model>
  temp: ARCMetaModel<Model>
  fetching: boolean
  loaded: boolean
  error: object | null
}
