/**
 * ARCMappedProps
 */
import {ARCConfig} from "./config.types"
import {ARCCollectionMap, ARCMetaCollectionMap} from "./model.types"

// import {DefaultRootState} from "react-redux";

interface DefaultRootState {}


export interface ARCRootState extends DefaultRootState {
  [key: ARCConfig<any>['name']]: ARCStoreState<any>
}

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
 * ARC Store
 */

export interface ARCStoreState<Model> {
  collection: ARCMetaCollectionMap<Model>
}
