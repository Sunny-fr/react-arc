import {getParams as utilsGetParams, interpolate as utilsInterpolate,} from "../utils"
import {ARCMetaCollectionMap, ARCMetaModel, ARCMetas, ARCModel, ARCModelKey,} from "../types/model.types"
import {ARCConfig} from "../types/config.types"
import {
  // ARCContainerProps,
  ComponentProps,
  ComponentPropsWithRequiredModelParams,
  ComponentWithStoreProps,
} from "../types/components.types"
import {ARCRootState, ARCStoreState} from "../types/connectors.types"
import {metaModelSelector} from "../hooks/selectors";


// type AnyArcComponentProps<Model> = Omit<ComponentWithStoreProps<Model> | ARCContainerProps<Model>, 'dispatch'>

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
 * @param {ComponentProps} props - component props
 */
function hasRequiredParams<Model>(config: ARCConfig<Model>, props: ComponentProps) {
  return config.modelProps.every((prop) => {
    return typeof props[prop] !== "undefined"
  })
}


/**
 * returns the missing required props (useful for debugging)
 * @param {ARCConfig} config
 * @param {ComponentProps} props - component props
 */
function missingParams<Model>(config: ARCConfig<Model>, props: ComponentProps) {
  const missing: string[] = []
  return config.modelProps.reduce((state, prop) => {
    if (typeof props[prop] === "undefined") {
      state.push(prop)
    }
    return state
  }, missing)
}


/**
 * Is the data fetched or a new model is created ?
 * @param {ARCConfig} config
 * @param {ComponentProps} props - component props
 */
function isNew<Model>(config: ARCConfig<Model>, props: ComponentProps) {
  return !getKey(config, props)
}


/**
 * returns the reducer key
 * @param {ARCConfig} config
 * @param {ComponentProps} props - component props
 */
function getKey<Model>(config: ARCConfig<Model>, props: ComponentProps) {
  const params = getParams(config, props)
  return !params ? null : keyGenerator(params)
}

/**
 * returns only the required params from the component props
 * @param {ARCConfig} config
 * @param {ComponentProps} props - component props
 */
function getParams<Model>(config: ARCConfig<Model>, props: ComponentProps) {
  if (!hasRequiredParams(config, props)) return null
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
 * returns true if the component is syncing
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
function allowReFetch<Model>(config: ARCConfig<Model>, metaModel?: ARCMetaModel<Model> | null) {
  return !(config.fetchOnce && isLoaded(metaModel))
}

/**
 * returns true if the component can re-refetch on error
 * @param {ARCConfig} config
 * @param metaModel
 */
function errorReFetch<Model>(config: ARCConfig<Model>, metaModel?: ARCMetaModel<Model> | null) {
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
function getStore<Model>(config: ARCConfig<Model>, reduxStoreState: ARCRootState) {

  const store: ARCStoreState<Model> = reduxStoreState[config.name]
  if(!store) {
    throw new Error(`Namespace "${config.name}" not found in store. Please ensure the ARCConfig is correctly set up.`)
  }
  return store
}


/**
 * Returns a list of fetched models
 * @param {ARCConfig} config
 * @param {ComponentWithStoreProps} props - component props
 * @param {array<ComponentPropsWithRequiredModelParams>} [listOfParams=[]] - list of model keys
 * @param rootState
 */
function modelPicker<Model>(
  config: ARCConfig<Model>,
  //TODO: remove me
  //@ts-ignore
  props: ComponentPropsWithRequiredModelParams,
  listOfParams: ComponentPropsWithRequiredModelParams[] = [],
  rootState: ARCRootState
) {
  const models: ARCModel<Model>[] = []

  //return listOfParams.reduce((acc, params) => {}, models)
  listOfParams.forEach((keyProps) => {
    const modelParams = getParams(config, keyProps)
    const props: ComponentPropsWithRequiredModelParams = {
      ...modelParams,
    }
    const modelKey = getKey(config, props)
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
 * @param {ARCConfig} config
 * @param {object} rootState - redux's store.getState()
 * @param {array<ComponentPropsWithRequiredModelParams>} [listOfParams=[]] - list of model params

 */
function freeModelPicker<Model>(
  config: ARCConfig<Model>,
  rootState: ARCRootState,
  listOfParams: ComponentPropsWithRequiredModelParams[] = [],

) {
  return (modelPicker(
    config,
    {},
    listOfParams,
    rootState
  ) || []).filter(Boolean)
}


/**
 * Returns the number of fetching items
 * @param {ComponentWithStoreProps} props - component props
 */
function getFetchingCount<Model>(collection: ARCMetaCollectionMap<Model>) {
  return Object.keys(collection)
    .map((key) => collection[key])
    .filter((model) => model.metas.fetching).length
}


export interface CoreMethods {
  keyGenerator: KeyGeneratorFn
  getCollection<Model>(reducerState: ARCStoreState<Model>) : ARCMetaCollectionMap<Model>
  hasRequiredParams<Model>(config: ARCConfig<Model>, props: ComponentProps) : boolean
  missingParams<Model>(config: ARCConfig<Model>, props: ComponentProps) : string[]
  isNew<Model>(config: ARCConfig<Model>, props: ComponentProps) : boolean
  getKey<Model>(config: ARCConfig<Model>, props: ComponentProps) : string | null
  getParams<Model>(config: ARCConfig<Model>, props: ComponentPropsWithRequiredModelParams) : ComponentPropsWithRequiredModelParams | null
  getMetas<Model>(prop: keyof ARCMetas | undefined, metaModel?: ARCMetaModel<Model> | null) : ARCMetas | any | null
  _getModel<Model>(metaModel: ARCMetaModel<Model> | null) : ARCMetaModel<Model> | null
  getModel<Model> (metaModel?: ARCMetaModel<Model> | null) : Model | null
  getError<Model>( metaModel?: ARCMetaModel<Model> | null) : any
  isSyncing<Model>( metaModel?: ARCMetaModel<Model> | null) : boolean
  isLoaded<Model>( metaModel?: ARCMetaModel<Model> | null) : boolean
  allowReFetch<Model>(config: ARCConfig<Model>,  metaModel?: ARCMetaModel<Model> | null) : boolean
  errorReFetch<Model>(config: ARCConfig<Model>, metaModel?: ARCMetaModel<Model> | null) : boolean
  getStore<Model>(config: ARCConfig<Model>, reduxStoreState: object) : ARCStoreState<Model>
  modelPicker<Model>(
    config: ARCConfig<Model>,
                props: ComponentWithStoreProps,
                listOfParams: ComponentPropsWithRequiredModelParams[],
                rootState: ARCRootState
  ) : Model[]
  freeModelPicker<Model>(
    config: ARCConfig<Model>,
    rootState: ARCRootState,
    listOfParams: ComponentPropsWithRequiredModelParams[]
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


