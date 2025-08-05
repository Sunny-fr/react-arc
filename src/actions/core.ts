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
 * @param {ARCConfig} config
 * @param {string} [prop] - requested meta
 * @param {ComponentWithStoreProps} props - component props
 * @param reducerState
 */
function getMetas<Model>(config: ARCConfig<Model>, prop: string | undefined, props: ComponentPropsWithRequiredModelParams, reducerState: ARCStoreState<Model>): ARCMetas | any {
  if (!_getModel(config, props,reducerState)) return null
  const metaModel = _getModel(config, props, reducerState)
  if (!metaModel) return null
  if (typeof prop !== "undefined") {
    return metaModel.metas[prop as keyof ARCMetas] || null
  }
  return metaModel.metas
}


/**
 * returns the meta model
 * @param {ARCConfig} config
 * @param {ComponentWithStoreProps} props - component props

 * @param reducerState
 */
function _getModel<Model>(config: ARCConfig<Model>, props: ComponentPropsWithRequiredModelParams, reducerState: ARCStoreState<Model>): ARCMetaModel<Model> | null {
  // WARNING:
  // DEPRECATED TO BE WARNED
  // if (isNew(config, props)) {
  //   return props.temp
  // }
  const key = getKey<Model>(config, props)
  if (!key) {
    return null
  }
  return getCollection(reducerState)[key]
}


/**
 * returns the model
 * @param {ARCConfig} config
 * @param {ComponentWithStoreProps} props - component props
 * @param reducerState
 */
function getModel<Model>(config: ARCConfig<Model>, props: ComponentPropsWithRequiredModelParams, reducerState: ARCStoreState<Model>) {
  const metaModel = _getModel(config, props, reducerState)
  if (!metaModel) {
    return null
  }
  return metaModel.model
}


function getError<Model>(config: ARCConfig<Model>, props: ComponentPropsWithRequiredModelParams, reducerState: ARCStoreState<Model>) {
  const error = getMetas(config, "error", props, reducerState)
  if (!error) return null
  return error
}


/**
 * returns true if the component is syncing
 * @param {ARCConfig} config
 * @param {ComponentWithStoreProps} props - component props
 * @param reducerState
 */
function isSyncing<Model>(config: ARCConfig<Model>, props: ComponentPropsWithRequiredModelParams, reducerState: ARCStoreState<Model>) {
  //TODO hard code metas
  return !!getMetas(config, "fetching", props, reducerState)
}


/**
 * returns true if the component is loaded
 * @param {ARCConfig} config
 * @param {ComponentWithStoreProps} props - component props
 * @param reducerState
 */
function isLoaded<Model>(config: ARCConfig<Model>, props: ComponentPropsWithRequiredModelParams, reducerState: ARCStoreState<Model>) {
  if (isNew(config, props)) {
    return true
  }
  return !(!_getModel(config, props,reducerState) || !getMetas(config, "loaded", props, reducerState))
}

/**
 * returns true if the component can be re-fetched
 * @param {ARCConfig} config
 * @param {ComponentWithStoreProps} props - component props

 * @param reducerState
 */
function allowReFetch<Model>(config: ARCConfig<Model>, props: ComponentPropsWithRequiredModelParams, reducerState: ARCStoreState<Model>) {
  return !(config.fetchOnce && isLoaded(config, props, reducerState))
}

/**
 * returns true if the component can re-refetch on error
 * @param {ARCConfig} config
 * @param {ComponentWithStoreProps} props - component props
 * @param reducerState
 */
function errorReFetch<Model>(config: ARCConfig<Model>, props: ComponentPropsWithRequiredModelParams, reducerState: ARCStoreState<Model>) {
  //canReFetchOnerror
  if (
    config.refetchOnError === true &&
    !isSyncing(config, props, reducerState) &&
    !isLoaded(config, props, reducerState) &&
    !!getError(config, props, reducerState)
  )
    return true
  return !getError(config, props, reducerState)
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
 * @param reducerState
 */
function modelPicker<Model>(
  config: ARCConfig<Model>,
  //TODO: remove me
  //@ts-ignore
  props: ComponentPropsWithRequiredModelParams,
  listOfParams: ComponentPropsWithRequiredModelParams[] = [],
  reducerState: ARCStoreState<Model>
) {
  const models: ARCModel<Model>[] = []

  //return listOfParams.reduce((acc, params) => {}, models)
  listOfParams.forEach((keyProps) => {
    const modelParams = getParams(config, keyProps)
    const props: ComponentPropsWithRequiredModelParams = {
      ...modelParams,
    }
    const model = getModel(config, props, reducerState)
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
  reduxStoreState: ARCRootState,
  listOfParams: ComponentPropsWithRequiredModelParams[] = [],

) {
  const reducerState = getStore(config, reduxStoreState)

  return (modelPicker(
    config,
    {},
    listOfParams,
    reducerState
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


export interface CoreMethods {
  keyGenerator: KeyGeneratorFn
  getCollection<Model>(reducerState: ARCStoreState<Model>) : ARCMetaCollectionMap<Model>
  hasRequiredParams<Model>(config: ARCConfig<Model>, props: ComponentProps) : boolean
  missingParams<Model>(config: ARCConfig<Model>, props: ComponentProps) : string[]
  isNew<Model>(config: ARCConfig<Model>, props: ComponentProps) : boolean
  getKey<Model>(config: ARCConfig<Model>, props: ComponentProps) : string | null
  getParams<Model>(config: ARCConfig<Model>, props: ComponentPropsWithRequiredModelParams) : ComponentPropsWithRequiredModelParams | null
  getMetas<Model>(config: ARCConfig<Model>, prop: string | undefined, props: ComponentPropsWithRequiredModelParams, reducerState: ARCStoreState<Model>) : any
  _getModel<Model>(config: ARCConfig<Model>, props: ComponentPropsWithRequiredModelParams, reducerState: ARCStoreState<Model>) : ARCMetaModel<Model> | null
  getModel<Model> (config: ARCConfig<Model>, props: ComponentPropsWithRequiredModelParams, reducerState: ARCStoreState<Model>) : Model | null
  getError<Model>(config: ARCConfig<Model>, props: ComponentPropsWithRequiredModelParams, reducerState: ARCStoreState<Model>) : any
  isSyncing<Model>(config: ARCConfig<Model>, props: ComponentPropsWithRequiredModelParams, reducerState: ARCStoreState<Model>) : boolean
  isLoaded<Model>(config: ARCConfig<Model>, props: ComponentPropsWithRequiredModelParams, reducerState: ARCStoreState<Model>) : boolean
  allowReFetch<Model>(config: ARCConfig<Model>, props: ComponentPropsWithRequiredModelParams, reducerState: ARCStoreState<Model>) : boolean
  errorReFetch<Model>(config: ARCConfig<Model>, props: ComponentPropsWithRequiredModelParams, reducerState: ARCStoreState<Model>) : boolean
  getStore<Model>(config: ARCConfig<Model>, reduxStoreState: object) : ARCStoreState<Model>
  modelPicker<Model>(config: ARCConfig<Model>,
                props: ComponentWithStoreProps<Model>,
                listOfParams: ComponentPropsWithRequiredModelParams[],
                reducerState: ARCStoreState<Model>
  ) : Model[]
  freeModelPicker<Model>(
    config: ARCConfig<Model>,
    reduxStoreState: object,
    listOfParams: ComponentPropsWithRequiredModelParams[]
  ) : ARCModel<Model>[]
  getFetchingCount<Model>(props:ComponentWithStoreProps<Model>) : number

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


