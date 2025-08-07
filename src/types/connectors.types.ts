/**
 * ARCMappedProps
 */
import {ARCConfig} from "./config.types"
import { ARCMetaCollectionMap} from "./model.types"

// import {DefaultRootState} from "react-redux";

interface DefaultRootState {}


export interface ARCRootState extends DefaultRootState {
  [key: ARCConfig<any>['name']]: ARCStoreState<any>
}




/**
 * ARC Store
 */

export interface ARCStoreState<Model> {
  collection: ARCMetaCollectionMap<Model>
}
