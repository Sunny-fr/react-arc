/**
 *  Generated Key using params
 */
export type ARCModelKey = string;
/**
 * Arc Metas
 */
export interface ARCMetas {
    loaded: boolean;
    fetching: boolean;
    fetchRequested: boolean;
    valid: boolean;
    saving: boolean;
    deleting: boolean;
    saved: boolean;
    tries: number;
    start: number;
    end: number;
    error?: any;
}
export type ARCMetasType = ARCMetas | object | string | number | boolean | null;
/**
 * Meta Model
 * @export
 */
export interface ARCMetaModel<Model> {
    metas: ARCMetas;
    model: ARCModel<Model>;
}
/**
 * Model Data Model
 */
export type ARCModel<Model> = Model;
export type ARCMetaCollectionMap<Model> = Record<ARCModelKey, ARCMetaModel<Model>>;
export type ARCCollectionMap<Model> = Record<ARCModelKey, ARCModel<Model>>;
