/**
 * ARCMappedProps
 */
import { ARCConfig } from "./config.types";
import { ARCCollectionMap, ARCMetaCollectionMap } from "./model.types";
interface DefaultRootState {
}
export interface ARCRootState extends DefaultRootState {
    [key: ARCConfig<any>['name']]: ARCStoreState<any>;
}
export interface ARCMappedProps<Model> {
    loaded: boolean;
    metaModel: object;
    model: object;
    error: object;
    syncing: boolean;
    metas: object;
    isNew: boolean;
    ARCConfig: ARCConfig<Model>;
    collection: ARCCollectionMap<Model>;
    tempModel?: Model | object;
}
/**
 *  StoreConnector
 */
export type ARCStoreConnector = <Model>(store: object, ownProps: object) => ARCMappedProps<Model>;
/**
 * ARC Store
 */
export interface ARCStoreState<Model> {
    collection: ARCMetaCollectionMap<Model>;
}
export {};
