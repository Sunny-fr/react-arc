/**
 * ARCMappedProps
 */
import { ARCConfig } from "./config.types"
import { ARCCollectionMap, ARCModel } from "./model.types"

export interface ARCMappedProps {
  loaded: boolean
  metaModel: object
  model: object
  error: object
  syncing: boolean
  metas: object
  isNew: boolean
  ARCConfig: ARCConfig
  collection: ARCCollectionMap
  tempModel: object
}

/**
 *  StoreConnector
 */

export type ARCStoreConnector = (
  store: object,
  ownProps: object
) => ARCMappedProps

/**
 * ARC Store
 */

export interface ARCStoreState {
  collection: ARCCollectionMap
  temp: ARCModel
  fetching: boolean
  loaded: boolean
  error: object | null
}
