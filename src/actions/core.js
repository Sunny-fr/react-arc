import { getParams, interpolate } from "../utils"

const core = {
  /**
   * Generates Key
   * @param {object} params - Params
   * @return {ArcModelKey}
   */
  keyGenerator(params) {
    return interpolate(null, params)
  },
  /**
   * returns true if the component has all the required props
   * @param {ARCConfig} ARCConfig
   * @param {object} props - component props
   * @return {boolean}
   */
  hasRequiredParams(ARCConfig, props) {
    return ARCConfig.modelProps.every((prop) => {
      return typeof props[prop] !== "undefined"
    })
  },
  /**
   * returns the missing required props (useful for debugging)
   * @param {ARCConfig} ARCConfig
   * @param {object} props - component props
   * @return {array<string>}
   */
  missingParams(ARCConfig, props) {
    return ARCConfig.modelProps.reduce((state, prop) => {
      if (typeof props[prop] !== "undefined") return state
      return state.concat(prop)
    }, [])
  },
  /**
   * Is the data fetched or a new model is created ?
   * @param {ARCConfig} ARCConfig
   * @param {object} props - component props
   * @return {boolean}
   */
  isNew(ARCConfig, props) {
    return !this.getKey(ARCConfig, props)
  },
  /**
   * returns the reducer key
   * @param {ARCConfig} ARCConfig
   * @param {object} props - component props
   * @return {ArcModelKey|null}
   */
  getKey(ARCConfig, props) {
    const params = this.getParams(ARCConfig, props)
    return !params ? null : this.keyGenerator(params)
  },
  /**
   * returns the only the required params from the component props
   * @param {ARCConfig} ARCConfig
   * @param {object} props - component props
   * @return {object|null}
   */
  getParams(ARCConfig, props) {
    if (!this.hasRequiredParams(ARCConfig, props)) return null
    return getParams(ARCConfig, props)
  },
  /**
   * returns the metas
   * @param {ARCConfig} ARCConfig
   * @param {string} [prop] - requested meta
   * @param {object} props - component props
   * @return {null|object|*}
   */
  getMetas(ARCConfig, prop, props) {
    if (!this._getModel(ARCConfig, props)) return null
    return !!prop
      ? this._getModel(ARCConfig, props).metas[prop]
      : this._getModel(ARCConfig, props).metas
  },
  /**
   * returns the meta model
   * @param {ARCConfig} ARCConfig
   * @param {object} props - component props
   * @return {object}
   */
  _getModel(ARCConfig, props) {
    //TO BE RENAMED
    return this.isNew(ARCConfig, props)
      ? props.tempModel
      : props.collection[this.getKey(ARCConfig, props)]
  },
  /**
   * returns the model
   * @param {ARCConfig} ARCConfig
   * @param {object} props - component props
   * @return {ArcModel|null}
   */
  getModel(ARCConfig, props) {
    const metaModel = this._getModel(ARCConfig, props)
    if (!metaModel) {
      return null
    }
    return metaModel.model
  },
  /**
   * returns the caught error
   * @param {ARCConfig} ARCConfig
   * @param {object} props - component props
   * @return {object|null}
   */
  getError(ARCConfig, props) {
    return this.getMetas(ARCConfig, "error", props)
  },
  /**
   * returns true if the component is syncing
   * @param {ARCConfig} ARCConfig
   * @param {object} props - component props
   * @return {boolean}
   */
  isSyncing(ARCConfig, props) {
    return this.getMetas(ARCConfig, "fetching", props)
  },
  /**
   * returns true if the component is loaded
   * @param {ARCConfig} ARCConfig
   * @param {object} props - component props
   * @return {boolean}
   */
  isLoaded(ARCConfig, props) {
    if (this.isNew(ARCConfig, props)) return true
    return !(
      !this._getModel(ARCConfig, props) ||
      !this.getMetas(ARCConfig, "loaded", props)
    )
  },
  /**
   * returns true if the component can be re-fetched
   * @param {ARCConfig} ARCConfig
   * @param {object} props - component props
   * @return {boolean}
   */
  allowReFetch(ARCConfig, props) {
    return !(ARCConfig.fetchOnce && this.isLoaded(ARCConfig, props))
  },
  /**
   * returns true if the component can re-refetch on error
   * @param {ARCConfig} ARCConfig
   * @param {object} props - component props
   * @return {boolean}
   */
  errorReFetch(ARCConfig, props) {
    //canReFetchOnerror
    if (
      ARCConfig.refetchOnError === true &&
      !this.isSyncing(ARCConfig, props) &&
      !this.isLoaded(ARCConfig, props) &&
      !!this.getError(ARCConfig, props)
    )
      return true
    return !this.getError(ARCConfig, props)
  },
  /**
   * the reducer state
   * @param {ARCConfig} ARCConfig
   * @param {object} reduxStoreState - redux's store.getState()
   * @return {object}
   */
  getStore(ARCConfig, reduxStoreState) {
    return reduxStoreState[ARCConfig.name]
  },
  /**
   * Returns a list of fetched models
   * @param {ARCConfig} ARCConfig
   * @param {object} props - component props
   * @param {array<ArcModelKey>} [keys=[]] - list of model keys
   * @return {array<ArcModel>}
   */
  modelPicker(ARCConfig, props, keys = []) {
    const { collection } = props
    return keys.reduce((state, keyProps) => {
      const modelParams = this.getParams(ARCConfig, keyProps)
      return state.concat(
        this.getModel(ARCConfig, { collection, ...modelParams })
      )
    }, [])
  },

  /**
   * return a model
   * @param {ARCConfig} ARCConfig
   * @param {object} reduxStoreState - redux's store.getState()
   * @param {array<ArcModelKey>} [keys=[]] - list of model keys
   * @return {array<ArcModel>}
   */
  freeModelPicker(ARCConfig, reduxStoreState, keys = []) {
    const { collection } = this.getStore(ARCConfig, reduxStoreState)
    return this.modelPicker(ARCConfig, { collection }, keys)
  },

  /**
   * Returns the number of fetching items
   * @param {ARCConfig} ARCConfig
   * @param {object} props - component props
   * @return {number}
   */
  getFetchingCount(ARCConfig, props) {
    const { collection } = props || this.props
    return Object.keys(collection)
      .map((key) => collection[key])
      .filter((model) => model.metas.fetching).length
  },

  /** COLLECTIONS **/
  getCollectionError(ARCConfig, props) {
    const { error } = props
    return error
  },
  isCollectionLoaded(ARCConfig, props) {
    const { loaded } = props
    return loaded
  },
  isCollectionSyncing(ARCConfig, props) {
    const { fetching } = props
    return fetching
  },
  allowCollectionReFetch(ARCConfig, props) {
    return !(ARCConfig.fetchOnce && this.isCollectionLoaded(ARCConfig, props))
  },
}

export default core
