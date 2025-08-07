"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.core = void 0;
const utils_1 = require("../utils");
const selectors_1 = require("../hooks/selectors");
/**
 * Generates Key
 * @param {object} params - Params
 */
const keyGenerator = (params) => {
    return (0, utils_1.interpolate)(null, params);
};
function getCollection(reducerState) {
    return reducerState.collection || {};
}
/**
 * returns true if the component has all the required props
 * @param {ARCConfig} config
 * @param {AnyProps} props - component props
 */
function hasRequiredParams(config, props) {
    return config.modelProps.every((prop) => {
        return typeof props[prop] !== "undefined";
    });
}
/**
 * returns the missing required props (useful for debugging)
 * @param {ARCConfig} config
 * @param {AnyProps} props - component props
 */
function missingParams(config, props) {
    const missing = [];
    return config.modelProps.reduce((state, prop) => {
        if (typeof props[prop] === "undefined") {
            state.push(prop);
        }
        return state;
    }, missing);
}
/**
 * Is the data fetched or a new model is created ?
 * @param {ARCConfig} config
 * @param {AnyProps} props - component props
 */
function isNew(config, props) {
    return !getKey(config, props);
}
/**
 * returns the reducer key
 * @param {ARCConfig} config
 * @param {AnyProps} props - component props
 */
function getKey(config, props) {
    const params = getParams(config, props);
    return !params ? null : keyGenerator(params);
}
/**
 * returns only the required params from the component props
 * @param {ARCConfig} config
 * @param {AnyProps} props - component props
 */
function getParams(config, props) {
    if (!hasRequiredParams(config, props))
        return null;
    return (0, utils_1.getParams)(config, props);
}
/**
 * returns the metas
 * @param {string} [prop] - requested meta
 * @param metaModel
 */
function getMetas(prop, metaModel) {
    if (!metaModel)
        return null;
    if (!metaModel)
        return null;
    if (typeof prop !== "undefined") {
        return metaModel.metas[prop];
    }
    return metaModel.metas;
}
/**
 * returns the meta model
 * @param metaModel
 */
function _getModel(metaModel) {
    return metaModel || null;
}
/**
 * returns the model
 * @param metaModel
 */
function getModel(metaModel) {
    if (!metaModel) {
        return null;
    }
    return metaModel.model;
}
function getError(metaModel) {
    return metaModel?.metas.error || null;
}
/**
 * returns true if the component is loading
 * @param metaModel
 */
function isSyncing(metaModel) {
    return !!metaModel?.metas.fetching || false;
}
/**
 * returns true if the component is loaded
 * @param metaModel
 */
function isLoaded(metaModel) {
    return metaModel?.metas.loaded || false;
}
/**
 * returns true if the component can be re-fetched
 * @param {ARCConfig} config
 * @param metaModel

 */
function allowReFetch(config, metaModel) {
    return !(config.fetchOnce && isLoaded(metaModel));
}
/**
 * returns true if the component can re-refetch on error
 * @param {ARCConfig} config
 * @param metaModel
 */
function errorReFetch(config, metaModel) {
    //canReFetchOnerror
    if (config.refetchOnError === true &&
        !isSyncing(metaModel) &&
        !isLoaded(metaModel) &&
        !!getError(metaModel))
        return true;
    return !getError(metaModel);
}
/**
 * the reducer state
 * @param {ARCConfig} config
 * @param {ARCRootState} reduxStoreState - redux's store.getState()
 */
function getStore(config, reduxStoreState) {
    const store = reduxStoreState[config.name];
    if (!store) {
        throw new Error(`Namespace "${config.name}" not found in store. Please ensure the ARCConfig is correctly set up.`);
    }
    return store;
}
/**
 * Returns a list of fetched models
 * @param rootState
 * @param {ARCConfig} config
 * @param {array<ComponentPropsWithRequiredModelParams>} [listOfParams=[]] - list of model keys

 */
function modelPicker(rootState, config, listOfParams = []) {
    const models = [];
    listOfParams.forEach((keyProps) => {
        const modelParams = getParams(config, keyProps);
        const props = {
            ...modelParams,
        };
        const modelKey = getKey(config, props);
        const metaModel = (0, selectors_1.metaModelSelector)(rootState, config, modelKey);
        const model = getModel(metaModel);
        if (model) {
            models.push(model);
        }
    });
    return models;
}
/**
 * return a model
 * @param {object} rootState - redux's store.getState()
 * @param {ARCConfig} config
 * @param {array<ComponentPropsWithRequiredModelParams>} [listOfParams=[]] - list of model params

 */
function freeModelPicker(rootState, config, listOfParams = []) {
    return (modelPicker(rootState, config, listOfParams) || []).filter(Boolean);
}
/**
 * Returns the number of fetching items
 * @param {ARCMetaCollectionMap} collection
 */
function getFetchingCount(collection) {
    return Object.keys(collection)
        .map((key) => collection[key])
        .filter((model) => model.metas.fetching).length;
}
exports.core = {
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
};
