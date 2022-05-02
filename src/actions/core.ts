import {
  getParams as utilsGetParams,
  interpolate as utilsInterpolate,
} from "../utils"
import {
  ARCMetaModel,
  ARCMetasType,
  ARCModel,
  ARCModelKey,
} from "../types/model.types"
import { ARCConfig } from "../types/config.types"
import {
  ARCContainerProps,
  //ARCContainerProps,
  ComponentProps,
  ComponentPropsWithRequiredModelParams,
  ComponentWithStoreProps,
} from "../types/components.types"
import { ARCStoreState } from "../types/connectors.types"

type KeyGeneratorFn = (params: object) => ARCModelKey
/**
 * Generates Key
 * @param {object} params - Params
 * @return {ARCModelKey}
 */
const keyGenerator: KeyGeneratorFn = (params) => {
  return utilsInterpolate(null, params)
}

type HasRequiredParamsFn = (config: ARCConfig, props: ComponentProps) => boolean
/**
 * returns true if the component has all the required props
 * @param {ARCConfig} config
 * @param {ComponentProps} props - component props
 * @return {boolean}
 */
const hasRequiredParams: HasRequiredParamsFn = (config, props) => {
  return config.modelProps.every((prop) => {
    return typeof props[prop] !== "undefined"
  })
}

type MissingParamsFn = (config: ARCConfig, props: ComponentProps) => string[]
/**
 * returns the missing required props (useful for debugging)
 * @param {ARCConfig} config
 * @param {ComponentProps} props - component props
 * @return {array<string>}
 */
const missingParams: MissingParamsFn = (config, props) => {
  const missing: string[] = []
  return config.modelProps.reduce((state, prop) => {
    if (typeof props[prop] === "undefined") {
      state.push(prop)
    }
    return state
  }, missing)
}

type IsNewFn = (config: ARCConfig, props: ComponentProps) => boolean
/**
 * Is the data fetched or a new model is created ?
 * @param {ARCConfig} config
 * @param {ComponentProps} props - component props
 * @return {boolean}
 */
const isNew: IsNewFn = (config, props) => {
  return !getKey(config, props)
}

type GetKeyFn = (config: ARCConfig, props: ComponentProps) => ARCModelKey | null
/**
 * returns the reducer key
 * @param {ARCConfig} config
 * @param {ComponentProps} props - component props
 * @return {ARCModelKey|null}
 */
const getKey: GetKeyFn = (config, props) => {
  const params = getParams(config, props)
  return !params ? null : keyGenerator(params)
}

type GetParamsFn = (
  config: ARCConfig,
  props: ComponentProps
) => ComponentPropsWithRequiredModelParams | null
/**
 * returns the only the required params from the component props
 * @param {ARCConfig} config
 * @param {ComponentProps} props - component props
 * @return {ComponentPropsWithRequiredModelParams|null}
 */
const getParams: GetParamsFn = (config, props) => {
  if (!hasRequiredParams(config, props)) return null
  return utilsGetParams(config, props)
}

type GetMetasFn = (
  config: ARCConfig,
  prop: string | undefined,
  props: ComponentWithStoreProps
) => ARCMetasType
/**
 * returns the metas
 * @param {ARCConfig} config
 * @param {string} [prop] - requested meta
 * @param {ComponentWithStoreProps} props - component props
 * @return {null|ARCMetas|object|string|number|boolean}
 */
const getMetas: GetMetasFn = (config, prop, props) => {
  if (!_getModel(config, props)) return null
  const metaModel = _getModel(config, props)
  if (!metaModel) return null
  if (typeof prop !== "undefined") {
    return metaModel.metas[prop]
  }
  return metaModel.metas
}

type GetMetaModelFn = (
  config: ARCConfig,
  props: ComponentWithStoreProps | ARCContainerProps
) => ARCMetaModel | null
/**
 * returns the meta model
 * @param {ARCConfig} config
 * @param {ComponentWithStoreProps} props - component props
 * @return {ARCMetaModel|null}
 */
const _getModel: GetMetaModelFn = (config, props) => {
  //TO BE RENAMED
  if (isNew(config, props)) {
    return props.temp
  }
  const key = getKey(config, props)
  if (!key) {
    return null
  }
  return props.collection[key]
}

type GetModelFn = (
  config: ARCConfig,
  props: ComponentWithStoreProps
) => ARCModel | null
/**
 * returns the model
 * @param {ARCConfig} config
 * @param {ComponentWithStoreProps} props - component props
 * @return {ARCModel|null}
 */
const getModel: GetModelFn = (config, props) => {
  const metaModel = _getModel(config, props)
  if (!metaModel) {
    return null
  }
  return metaModel.model
}

type GetErrorFn = (
  config: ARCConfig,
  props: ComponentWithStoreProps
) => any | null
/**
 * returns the caught error
 * @param {ARCConfig} config
 * @param {ComponentWithStoreProps} props - component props
 * @return {object|null}
 */
const getError: GetErrorFn = (config, props) => {
  const error = getMetas(config, "error", props)
  if (!error) return null
  return error
}

type IsSyncingFn = (
  config: ARCConfig,
  props: ComponentWithStoreProps
) => boolean
/**
 * returns true if the component is syncing
 * @param {ARCConfig} config
 * @param {ComponentWithStoreProps} props - component props
 * @return {boolean}
 */
const isSyncing: IsSyncingFn = (config, props) => {
  //TODO hard code metas
  return !!getMetas(config, "fetching", props)
}

type IsLoadedFn = (config: ARCConfig, props: ComponentWithStoreProps) => boolean
/**
 * returns true if the component is loaded
 * @param {ARCConfig} config
 * @param {ComponentWithStoreProps} props - component props
 * @return {boolean}
 */
const isLoaded: IsLoadedFn = (config, props) => {
  if (isNew(config, props)) {
    return true
  }
  return !(!_getModel(config, props) || !getMetas(config, "loaded", props))
}

type AllowReFetchFn = (
  config: ARCConfig,
  props: ComponentWithStoreProps
) => boolean
/**
 * returns true if the component can be re-fetched
 * @param {ARCConfig} config
 * @param {ComponentWithStoreProps} props - component props
 * @return {boolean}
 */
const allowReFetch: AllowReFetchFn = (config, props) => {
  return !(config.fetchOnce && isLoaded(config, props))
}

type ErrorReFetchFn = (
  config: ARCConfig,
  props: ComponentWithStoreProps
) => boolean
/**
 * returns true if the component can re-refetch on error
 * @param {ARCConfig} config
 * @param {ComponentWithStoreProps} props - component props
 * @return {boolean}
 */
const errorReFetch: ErrorReFetchFn = (config, props) => {
  //canReFetchOnerror
  if (
    config.refetchOnError === true &&
    !isSyncing(config, props) &&
    !isLoaded(config, props) &&
    !!getError(config, props)
  )
    return true
  return !getError(config, props)
}

type GetStoreFn = (config: ARCConfig, reduxStoreState: object) => ARCStoreState
/**
 * the reducer state
 * @param {ARCConfig} config
 * @param {object} reduxStoreState - redux's store.getState()
 * @return {ARCStoreState}
 */
const getStore: GetStoreFn = (config, reduxStoreState) => {
  return reduxStoreState[config.name]
}

type ModelPickerFn = (
  config: ARCConfig,
  props: ComponentWithStoreProps,
  listOfParams: ComponentPropsWithRequiredModelParams[]
) => ARCModel[]
/**
 * Returns a list of fetched models
 * @param {ARCConfig} config
 * @param {ComponentWithStoreProps} props - component props
 * @param {array<ComponentPropsWithRequiredModelParams>} [listOfParams=[]] - list of model keys
 * @return {array<ARCModel>}
 */
const modelPicker: ModelPickerFn = (
  config,
  props,
  listOfParams: ComponentPropsWithRequiredModelParams[] = []
) => {
  const models: ARCModel[] = []
  const { collection, temp, error, loaded, fetching } = props
  //TODO REWRITE AS REDUCE FN
  //return listOfParams.reduce((acc, params) => {}, models)
  listOfParams.forEach((keyProps) => {
    const modelParams = getParams(config, keyProps)
    const props: ComponentWithStoreProps = {
      //TODO  REMOVE temp, error, loaded, fetching,
      temp,
      error,
      loaded,
      fetching,
      collection,
      ...modelParams,
    }
    models.push(getModel(config, props))
  })
  return models
}

type FreeModelPickerFn = (
  config: ARCConfig,
  reduxStoreState: object,
  listOfParams: ComponentPropsWithRequiredModelParams[]
) => ARCModel[]
/**
 * return a model
 * @param {ARCConfig} config
 * @param {object} reduxStoreState - redux's store.getState()
 * @param {array<ComponentPropsWithRequiredModelParams>} [listOfParams=[]] - list of model params
 * @return {array<ARCModel>}
 */
const freeModelPicker: FreeModelPickerFn = (
  config,
  reduxStoreState,
  listOfParams: ComponentPropsWithRequiredModelParams[] = []
) => {
  const { collection } = getStore(config, reduxStoreState)
  return modelPicker(
    config,
    {
      collection,
      //DUMMY DATA MUST BE REMOVED  temp: null, error: null, loaded: false, fetching: false
      temp: null,
      error: null,
      loaded: false,
      fetching: false,
    },
    listOfParams
  )
}
type GetFetchingCountFn = (props: ComponentWithStoreProps) => number
/**
 * Returns the number of fetching items
 * @param {ComponentWithStoreProps} props - component props
 * @return {number}
 */
const getFetchingCount: GetFetchingCountFn = (props) => {
  const { collection } = props
  return Object.keys(collection)
    .map((key) => collection[key])
    .filter((model) => model.metas.fetching).length
}

/** COLLECTIONS
 * SOON TO BE DROPPED
 * **/

type GetCollectionErrorFn = (props: ComponentWithStoreProps) => object | null
const getCollectionError: GetCollectionErrorFn = (props) => {
  const { error } = props
  return error
}
type IsCollectionLoadedFn = (props: ComponentWithStoreProps) => boolean
const isCollectionLoaded: IsCollectionLoadedFn = (props) => {
  const { loaded } = props
  return loaded
}

type IsCollectionSyncingFn = (props: ComponentWithStoreProps) => boolean
const isCollectionSyncing: IsCollectionSyncingFn = (props) => {
  const { fetching } = props
  return fetching
}
type AllowCollectionReFetchFn = (
  config: ARCConfig,
  props: ComponentWithStoreProps
) => boolean
const allowCollectionReFetch: AllowCollectionReFetchFn = (config, props) => {
  return !(config.fetchOnce && isCollectionLoaded(props))
}

export interface CoreMethods {
  keyGenerator: KeyGeneratorFn
  hasRequiredParams: HasRequiredParamsFn
  missingParams: MissingParamsFn
  isNew: IsNewFn
  getKey: GetKeyFn
  getParams: GetParamsFn
  getMetas: GetMetasFn
  _getModel: GetMetaModelFn
  getModel: GetModelFn
  getError: GetErrorFn
  isSyncing: IsSyncingFn
  isLoaded: IsLoadedFn
  allowReFetch: AllowReFetchFn
  errorReFetch: ErrorReFetchFn
  getStore: GetStoreFn
  modelPicker: ModelPickerFn
  freeModelPicker: FreeModelPickerFn
  getFetchingCount: GetFetchingCountFn

  /** COLLECTIONS
   * SOON TO BE DROPPED
   * **/
  getCollectionError: GetCollectionErrorFn
  isCollectionLoaded: IsCollectionLoadedFn
  isCollectionSyncing: IsCollectionSyncingFn
  allowCollectionReFetch: AllowCollectionReFetchFn
}

const core: CoreMethods = {
  keyGenerator,
  hasRequiredParams,
  missingParams,
  isNew,
  getKey,
  getParams,
  getMetas,
  _getModel,
  getModel,
  getError,
  isSyncing,
  isLoaded,
  allowReFetch,
  errorReFetch,
  getStore,
  modelPicker,
  freeModelPicker,
  getFetchingCount,

  /** COLLECTIONS
   * SOON TO BE DROPPED
   * **/
  getCollectionError,
  isCollectionLoaded,
  isCollectionSyncing,
  allowCollectionReFetch,
}

export default core
