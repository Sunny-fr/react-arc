import {getParams as utilsGetParams, interpolate as utilsInterpolate} from "../utils"
import {ARCMetaCollectionMap, ARCMetaModel, ARCMetas, ARCModel, ARCModelKey,} from "../types/model.types"
import {ARCConfig} from "../types/config.types"
import {ARCContainerProps} from "../types/components.types"
import {ARCRootState, ARCStoreState} from "../types/connectors.types"
import {metaModelSelector} from "../hooks/selectors";


type KeyGeneratorFn = (params: object) => ARCModelKey
/**
 * Generates Key
 * @param {object} params - Params
 */
const keyGenerator: KeyGeneratorFn = (params: object): ARCModelKey => {
  return utilsInterpolate(null, params)
}


function getCollection<Model>( reducerState:ARCStoreState<Model>) {
  return reducerState.collection || {}
}

/**
 * returns true if the component has all the required props
 * @param {ARCConfig} config
 * @param {RequiredProps} props - component props
 */
function hasRequiredParams<Model, RequiredProps, OwnProps = {}>(config: ARCConfig<Model, RequiredProps>, props: ARCContainerProps<Model, RequiredProps, OwnProps>) {
  return config.modelProps.every((prop) => {
    return typeof props[prop as keyof RequiredProps] !== "undefined"
  })
}


/**
 * returns the missing required props (useful for debugging)
 * @param {ARCConfig} config
 * @param {RequiredProps} props - component props
 */
function missingParams<Model, RequiredProps, OwnProps = {}>(config: ARCConfig<Model, RequiredProps>, props: ARCContainerProps<Model, RequiredProps, OwnProps>) {
  const missing: string[] = []
  return config.modelProps.reduce((state, prop) => {
    if (typeof props[prop as keyof RequiredProps] === "undefined") {
      state.push(prop)
    }
    return state
  }, missing)
}


/**
 * Is the data fetched or a new model is created ?
 * @param {ARCConfig} config
 * @param {RequiredProps} props - component props
 */
function isNew<Model, RequiredProps, OwnProps = {}>(config: ARCConfig<Model, RequiredProps>, props: ARCContainerProps<Model, RequiredProps, OwnProps>) {
  return !getKey(config, props)
}


/**
 * returns the reducer key
 * @param {ARCConfig} config
 * @param {RequiredProps} props - component props
 */
function getKey<Model, RequiredProps, OwnProps = {}>(config: ARCConfig<Model, RequiredProps>, props: ARCContainerProps<Model, RequiredProps, OwnProps>) {
  const params = getParams(config, props)
  return !params ? null : keyGenerator(params)
}

/**
 * returns only the required params from the component props
 * @param {ARCConfig} config
 * @param {RequiredProps} props - component props
 */
function getParams<Model, RequiredProps, OwnProps = {}>(config: ARCConfig<Model, RequiredProps>, props: RequiredProps & OwnProps) {
  if (!hasRequiredParams(config, props as ARCContainerProps<Model, RequiredProps, OwnProps>)) return null
  return utilsGetParams(config, props)
}

/**
 * returns the metas
 * @param {string} [prop] - requested meta
 * @param metaModel
 */
function getMetas<Model>(prop: keyof ARCMetas | undefined, metaModel?: ARCMetaModel<Model> | null): ARCMetas | any | null {
  if (!metaModel) return null
  if (!metaModel) return null
  if (typeof prop !== "undefined") {
    return metaModel.metas[prop]
  }
  return metaModel.metas
}


/**
 * returns the meta model
 * @param metaModel
 */
function _getModel<Model>(metaModel: ARCMetaModel<Model> | null): ARCMetaModel<Model> | null {

  return metaModel || null
}


/**
 * returns the model
 * @param metaModel
 */
function getModel<Model>(metaModel?: ARCMetaModel<Model> | null) {

  if (!metaModel) {
    return null
  }
  return metaModel.model
}


function getError<Model>( metaModel?: ARCMetaModel<Model> | null) {
  return metaModel?.metas.error || null
}


/**
 * returns true if the component is loading
 * @param metaModel
 */
function isSyncing<Model>(metaModel?: ARCMetaModel<Model> | null) {
  return !!metaModel?.metas.fetching || false
}


/**
 * returns true if the component is loaded
 * @param metaModel
 */
function isLoaded<Model>( metaModel?: ARCMetaModel<Model> | null) {
  return metaModel?.metas.loaded || false
}

/**
 * returns true if the component can be re-fetched
 * @param {ARCConfig} config
 * @param metaModel

 */
function allowReFetch<Model, RequiredProps>(config: ARCConfig<Model, RequiredProps>, metaModel?: ARCMetaModel<Model> | null) {
  return !(config.fetchOnce && isLoaded(metaModel))
}

/**
 * returns true if the component can re-refetch on error
 * @param {ARCConfig} config
 * @param metaModel
 */
function errorReFetch<Model, RequiredProps>(config: ARCConfig<Model, RequiredProps>, metaModel?: ARCMetaModel<Model> | null) {
  //canReFetchOnerror
  if (
    config.refetchOnError === true &&
    !isSyncing(metaModel) &&
    !isLoaded(metaModel) &&
    !!getError(metaModel)
  )
    return true
  return !getError(metaModel)
}

/**
 * the reducer state
 * @param {ARCConfig} config
 * @param {ARCRootState} reduxStoreState - redux's store.getState()
 */
function getStore<Model, RequiredProps = {}>(config: ARCConfig<Model, RequiredProps>, reduxStoreState: ARCRootState) {

  const store: ARCStoreState<Model> = reduxStoreState[config.name]
  if(!store) {
    throw new Error(`Namespace "${config.name}" not found in store. Please ensure the ARCConfig is correctly set up.`)
  }
  return store
}


/**
 * Returns a list of fetched models
 * @param rootState
 * @param {ARCConfig} config
 * @param {array<RequiredProps>} [listOfParams=[]] - list of model keys

 */
function modelPicker<Model, RequiredProps ={}, OwnProps = {}>(
  rootState: ARCRootState,
  config: ARCConfig<Model, RequiredProps>,
  listOfParams: RequiredProps[] = [],
) {
  const models: ARCModel<Model>[] = []
  listOfParams.forEach((keyProps) => {
    const modelParams = getParams<Model, RequiredProps, OwnProps>(config, keyProps as  ARCContainerProps<Model, RequiredProps, OwnProps>)
    const props = {
      ...modelParams,
    } as RequiredProps
    const modelKey = getKey<Model, RequiredProps, OwnProps>(config, props as  ARCContainerProps<Model, RequiredProps, OwnProps>)
    const metaModel = metaModelSelector(rootState, config, modelKey)
    const model = getModel(metaModel)
    if (model) {
      models.push(model)
    }
  })
  return models
}


/**
 * return a model
 * @param {object} rootState - redux's store.getState()
 * @param {ARCConfig} config
 * @param {array<RequiredProps>} [listOfParams=[]] - list of model params

 */
function freeModelPicker<Model, RequiredProps ={}>(
  rootState: ARCRootState,
  config: ARCConfig<Model, RequiredProps>,
  listOfParams: RequiredProps[] = [],
) {
  return (modelPicker(
    rootState,
    config,
    listOfParams,
  ) || []).filter(Boolean)
}


/**
 * Returns the number of fetching items
 * @param {ARCMetaCollectionMap} collection
 */
function getFetchingCount<Model>(collection: ARCMetaCollectionMap<Model>) {
  return Object.keys(collection)
    .map((key) => collection[key])
    .filter((model) => model.metas.fetching).length
}


export interface CoreMethods {
  keyGenerator: KeyGeneratorFn
  getCollection<Model>(reducerState: ARCStoreState<Model>) : ARCMetaCollectionMap<Model>
  hasRequiredParams<Model, RequiredProps>(config: ARCConfig<Model, RequiredProps>, props: RequiredProps) : boolean
  missingParams<Model, RequiredProps, OwnProps = {}>(config: ARCConfig<Model, RequiredProps>, props: ARCContainerProps<Model, RequiredProps, OwnProps>) : string[]
  isNew<Model, RequiredProps>(config: ARCConfig<Model, RequiredProps>, props: RequiredProps) : boolean
  getKey<Model, RequiredProps>(config: ARCConfig<Model, RequiredProps>, props: RequiredProps) : string | null
  getParams<Model, RequiredProps>(config: ARCConfig<Model, RequiredProps>, props: RequiredProps) : RequiredProps | null
  getMetas<Model>(prop: keyof ARCMetas | undefined, metaModel?: ARCMetaModel<Model> | null) : ARCMetas | any | null
  _getModel<Model>(metaModel: ARCMetaModel<Model> | null) : ARCMetaModel<Model> | null
  getModel<Model> (metaModel?: ARCMetaModel<Model> | null) : Model | null
  getError<Model>( metaModel?: ARCMetaModel<Model> | null) : any
  isSyncing<Model>( metaModel?: ARCMetaModel<Model> | null) : boolean
  isLoaded<Model>( metaModel?: ARCMetaModel<Model> | null) : boolean
  allowReFetch<Model, RequiredProps>(config: ARCConfig<Model, RequiredProps>,  metaModel?: ARCMetaModel<Model> | null) : boolean
  errorReFetch<Model, RequiredProps>(config: ARCConfig<Model, RequiredProps>, metaModel?: ARCMetaModel<Model> | null) : boolean
  getStore<Model, RequiredProps>(config: ARCConfig<Model, RequiredProps>, reduxStoreState: object) : ARCStoreState<Model>
  modelPicker<Model, RequiredProps>(
    rootState: ARCRootState,
    config: ARCConfig<Model, RequiredProps>,
    listOfParams: RequiredProps[],
  ) : Model[]
  freeModelPicker<Model, RequiredProps>(
    rootState: ARCRootState,
    config: ARCConfig<Model, RequiredProps>,
    listOfParams: RequiredProps[]
  ) : ARCModel<Model>[]
  getFetchingCount<Model>(props:ARCMetaCollectionMap<Model>) : number

}

export const core:CoreMethods = {
  getCollection,
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

} as const


