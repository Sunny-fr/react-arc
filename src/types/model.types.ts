/**
 *  Generated Key using params
 */
export type ARCModelKey = string

/**
 * Arc Metas
 */
export interface ARCMetas {
  loaded: boolean
  fetching: boolean
  fetchRequested: boolean
  valid: boolean
  saving: boolean
  deleting: boolean
  saved: boolean
  tries: number
  start: number
  end: number
}

export type ARCMetasType = ARCMetas | object | string | number | boolean | null

/**
 * Meta Model
 * @export
 */
export interface ARCMetaModel {
  metas: ARCMetas
  model: ARCModel
}

/**
 * Model Data Model
 */
export type ARCModel = any

export const ARCModelDefaults: ARCModel = {}

export type ARCMetaCollectionMap = Record<ARCModelKey, ARCMetaModel>
export type ARCCollectionMap = Record<ARCModelKey, ARCModel>
