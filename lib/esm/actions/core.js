var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
import { getParams as utilsGetParams, interpolate as utilsInterpolate, } from "../utils";
import { metaModelSelector } from "../hooks/selectors";
/**
 * Generates Key
 * @param {object} params - Params
 */
var keyGenerator = function (params) {
    return utilsInterpolate(null, params);
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
    return config.modelProps.every(function (prop) {
        return typeof props[prop] !== "undefined";
    });
}
/**
 * returns the missing required props (useful for debugging)
 * @param {ARCConfig} config
 * @param {AnyProps} props - component props
 */
function missingParams(config, props) {
    var missing = [];
    return config.modelProps.reduce(function (state, prop) {
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
    var params = getParams(config, props);
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
    return utilsGetParams(config, props);
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
    return (metaModel === null || metaModel === void 0 ? void 0 : metaModel.metas.error) || null;
}
/**
 * returns true if the component is loading
 * @param metaModel
 */
function isSyncing(metaModel) {
    return !!(metaModel === null || metaModel === void 0 ? void 0 : metaModel.metas.fetching) || false;
}
/**
 * returns true if the component is loaded
 * @param metaModel
 */
function isLoaded(metaModel) {
    return (metaModel === null || metaModel === void 0 ? void 0 : metaModel.metas.loaded) || false;
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
    var store = reduxStoreState[config.name];
    if (!store) {
        throw new Error("Namespace \"".concat(config.name, "\" not found in store. Please ensure the ARCConfig is correctly set up."));
    }
    return store;
}
/**
 * Returns a list of fetched models
 * @param rootState
 * @param {ARCConfig} config
 * @param {array<ComponentPropsWithRequiredModelParams>} [listOfParams=[]] - list of model keys

 */
function modelPicker(rootState, config, listOfParams) {
    if (listOfParams === void 0) { listOfParams = []; }
    var models = [];
    listOfParams.forEach(function (keyProps) {
        var modelParams = getParams(config, keyProps);
        var props = __assign({}, modelParams);
        var modelKey = getKey(config, props);
        var metaModel = metaModelSelector(rootState, config, modelKey);
        var model = getModel(metaModel);
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
function freeModelPicker(rootState, config, listOfParams) {
    if (listOfParams === void 0) { listOfParams = []; }
    return (modelPicker(rootState, config, listOfParams) || []).filter(Boolean);
}
/**
 * Returns the number of fetching items
 * @param {ARCMetaCollectionMap} collection
 */
function getFetchingCount(collection) {
    return Object.keys(collection)
        .map(function (key) { return collection[key]; })
        .filter(function (model) { return model.metas.fetching; }).length;
}
export var core = {
    getCollection: getCollection,
    keyGenerator: keyGenerator,
    hasRequiredParams: hasRequiredParams,
    missingParams: missingParams,
    isNew: isNew,
    getKey: getKey,
    getParams: getParams,
    getMetas: getMetas,
    _getModel: _getModel,
    getModel: getModel,
    getError: getError,
    isSyncing: isSyncing,
    isLoaded: isLoaded,
    allowReFetch: allowReFetch,
    errorReFetch: errorReFetch,
    getStore: getStore,
    modelPicker: modelPicker,
    freeModelPicker: freeModelPicker,
    getFetchingCount: getFetchingCount,
};
