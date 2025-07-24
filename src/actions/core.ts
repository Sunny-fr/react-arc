import {
  getParams as utilsGetParams,
  interpolate as utilsInterpolate,
} from "../utils"
import {
  ARCMetaModel, ARCMetas,
  ARCModel,
  ARCModelKey,
} from "../types/model.types"
import {ARCConfig} from "../types/config.types"
import {
  ARCContainerProps,
  ComponentProps,
  ComponentPropsWithRequiredModelParams,
  ComponentWithStoreProps,
} from "../types/components.types"
import {ARCRootState, ARCStoreState} from "../types/connectors.types"


type AnyArcComponentProps<Model> = Omit<ComponentWithStoreProps<Model> | ARCContainerProps<Model>, 'dispatch'>

type KeyGeneratorFn = (params: object) => ARCModelKey
/**
 * Generates Key
 * @param {object} params - Params
 */
const keyGenerator: KeyGeneratorFn = (params: object): ARCModelKey => {
  return utilsInterpolate(null, params)
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
 * @param {ARCConfig} config
 * @param {string} [prop] - requested meta
 * @param {ComponentWithStoreProps} props - component props
 */
function getMetas<Model>(config: ARCConfig<Model>, prop: string | undefined, props: AnyArcComponentProps<Model>): ARCMetas | any {
  if (!_getModel(config, props)) return null
  const metaModel = _getModel(config, props)
  if (!metaModel) return null
  if (typeof prop !== "undefined") {
    return metaModel.metas[prop]
  }
  return metaModel.metas
}


/**
 * returns the meta model
 * @param {ARCConfig} config
 * @param {ComponentWithStoreProps} props - component props

 */
function _getModel<Model>(config: ARCConfig<Model>, props: AnyArcComponentProps<Model>) {
  // WARNING:
  // DEPRECATED TO BE WARNED
  // if (isNew(config, props)) {
  //   return props.temp
  // }
  const key = getKey<Model>(config, props)
  if (!key) {
    return null
  }
  return props.collection[key]
}


/**
 * returns the model
 * @param {ARCConfig} config
 * @param {ComponentWithStoreProps} props - component props

 */
function getModel<Model>(config: ARCConfig<Model>, props: AnyArcComponentProps<Model>) {
  const metaModel = _getModel(config, props)
  if (!metaModel) {
    return null
  }
  return metaModel.model
}


function getError<Model>(config: ARCConfig<Model>, props: ComponentWithStoreProps<Model>) {
  const error = getMetas(config, "error", props)
  if (!error) return null
  return error
}


/**
 * returns true if the component is syncing
 * @param {ARCConfig} config
 * @param {ComponentWithStoreProps} props - component props
 */
function isSyncing<Model>(config: ARCConfig<Model>, props: ComponentWithStoreProps<Model>) {
  //TODO hard code metas
  return !!getMetas(config, "fetching", props)
}


/**
 * returns true if the component is loaded
 * @param {ARCConfig} config
 * @param {ComponentWithStoreProps} props - component props
 */
function isLoaded<Model>(config: ARCConfig<Model>, props: ComponentWithStoreProps<Model>) {
  if (isNew(config, props)) {
    return true
  }
  return !(!_getModel(config, props) || !getMetas(config, "loaded", props))
}

/**
 * returns true if the component can be re-fetched
 * @param {ARCConfig} config
 * @param {ComponentWithStoreProps} props - component props

 */
function allowReFetch<Model>(config: ARCConfig<Model>, props: ComponentWithStoreProps<Model>) {
  return !(config.fetchOnce && isLoaded(config, props))
}

/**
 * returns true if the component can re-refetch on error
 * @param {ARCConfig} config
 * @param {ComponentWithStoreProps} props - component props
 */
function errorReFetch<Model>(config: ARCConfig<Model>, props: ComponentWithStoreProps<Model>) {
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

/**
 * the reducer state
 * @param {ARCConfig} config
 * @param {ARCRootState} reduxStoreState - redux's store.getState()
 */
function getStore<Model>(config: ARCConfig<Model>, reduxStoreState: ARCRootState<Model>) {
  if(!reduxStoreState[config.name]) {
    throw new Error(`Namespace "${config.name}" not found in store. Please ensure the ARCConfig is correctly set up.`)
  }
  return reduxStoreState[config.name]
}


/**
 * Returns a list of fetched models
 * @param {ARCConfig} config
 * @param {ComponentWithStoreProps} props - component props
 * @param {array<ComponentPropsWithRequiredModelParams>} [listOfParams=[]] - list of model keys
 */
function modelPicker<Model>(
  config: ARCConfig<Model>,
  props: ComponentWithStoreProps<Model>,
  listOfParams: ComponentPropsWithRequiredModelParams[] = []
) {
  const models: ARCModel<Model>[] = []
  const {collection} = props
  //TODO REWRITE AS REDUCE FN
  //return listOfParams.reduce((acc, params) => {}, models)
  listOfParams.forEach((keyProps) => {
    const modelParams = getParams(config, keyProps)
    const props: ComponentWithStoreProps<Model> = {
      //TODO  REMOVE temp, error, loaded, fetching,
      // temp,
      // error,
      // loaded,
      // fetching,
      collection,
      ...modelParams,
    }
    const model = getModel(config, props)
    if (model) {
      models.push(model)
    }
  })
  return models
}


/**
 * return a model
 * @param {ARCConfig} config
 * @param {object} reduxStoreState - redux's store.getState()
 * @param {array<ComponentPropsWithRequiredModelParams>} [listOfParams=[]] - list of model params

 */
function freeModelPicker<Model>(
  config: ARCConfig<Model>,
  reduxStoreState: ARCRootState<Model>,
  listOfParams: ComponentPropsWithRequiredModelParams[] = []
) {
  const {collection} = getStore(config, reduxStoreState)
  return (modelPicker(
    config,
    {
      collection,
      //DUMMY DATA MUST BE REMOVED  temp: null, error: null, loaded: false, fetching: false
      // temp: null,
      // error: null,
      // loaded: false,
      // fetching: false,
    },
    listOfParams
  ) || []).filter(Boolean)
}


/**
 * Returns the number of fetching items
 * @param {ComponentWithStoreProps} props - component props
 */
function getFetchingCount<Model>(props:ComponentWithStoreProps<Model>) {
  const {collection} = props
  return Object.keys(collection)
    .map((key) => collection[key])
    .filter((model) => model.metas.fetching).length
}

/** COLLECTIONS
 * SOON TO BE DROPPED
 * **/


function getCollectionError<Model>(props: ComponentWithStoreProps<Model>) {
  const {error=false} = props
  return error
}
//type IsCollectionLoadedFn = (props: ComponentWithStoreProps) => boolean
function isCollectionLoaded<Model>(props: ComponentWithStoreProps<Model>) {
  const {loaded= false} = props
  return loaded
}


function isCollectionSyncing<Model>(props:ComponentWithStoreProps<Model>) {
  const {fetching=false} = props
  return fetching
}

function allowCollectionReFetch<Model>(config:ARCConfig<Model>, props: ComponentWithStoreProps<Model>) {
  return !(config.fetchOnce && isCollectionLoaded(props))
}

export interface CoreMethods {
  keyGenerator: KeyGeneratorFn
  hasRequiredParams<Model>(config: ARCConfig<Model>, props: ComponentProps) : boolean
  missingParams<Model>(config: ARCConfig<Model>, props: ComponentProps) : string[]
  isNew<Model>(config: ARCConfig<Model>, props: ComponentProps) : boolean
  getKey<Model>(config: ARCConfig<Model>, props: ComponentProps) : string | null
  getParams<Model>(config: ARCConfig<Model>, props: ComponentProps) : ComponentPropsWithRequiredModelParams | null
  getMetas<Model>(config: ARCConfig<Model>, prop: string | undefined, props: ComponentProps) : any
  _getModel<Model>(config: ARCConfig<Model>, props: AnyArcComponentProps<Model>) : ARCMetaModel<Model> | null
  getModel<Model> (config: ARCConfig<Model>, props: AnyArcComponentProps<Model>) : Model | null
  getError<Model>(config: ARCConfig<Model>, props: ComponentWithStoreProps<Model>) : any
  isSyncing<Model>(config: ARCConfig<Model>, props: ComponentWithStoreProps<Model>) : boolean
  isLoaded<Model>(config: ARCConfig<Model>, props: ComponentWithStoreProps<Model>) : boolean
  allowReFetch<Model>(config: ARCConfig<Model>, props: ComponentWithStoreProps<Model>) : boolean
  errorReFetch<Model>(config: ARCConfig<Model>, props: ComponentWithStoreProps<Model>) : boolean
  getStore<Model>(config: ARCConfig<Model>, reduxStoreState: object) : ARCStoreState<Model>
  modelPicker<Model>(config: ARCConfig<Model>,
                props: ComponentWithStoreProps<Model>,
                listOfParams: ComponentPropsWithRequiredModelParams[]) : Model[]
  freeModelPicker<Model>(
    config: ARCConfig<Model>,
    reduxStoreState: object,
    listOfParams: ComponentPropsWithRequiredModelParams[]
  ) : ARCModel<Model>[]
  getFetchingCount<Model>(props:ComponentWithStoreProps<Model>) : number

  /** COLLECTIONS
   * SOON TO BE DROPPED
   * **/
  getCollectionError<Model>(props: ComponentWithStoreProps<Model>) : any
  isCollectionLoaded<Model>(props: ComponentWithStoreProps<Model>) : boolean
  isCollectionSyncing<Model>(props: ComponentWithStoreProps<Model>) : boolean
  allowCollectionReFetch<Model>(config:ARCConfig<Model>, props: ComponentWithStoreProps<Model>) : boolean
}

export const core: CoreMethods = {
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


