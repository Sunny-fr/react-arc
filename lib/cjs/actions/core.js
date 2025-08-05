"use strict";
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
Object.defineProperty(exports, "__esModule", { value: true });
exports.core = void 0;
var utils_1 = require("../utils");
/**
 * Generates Key
 * @param {object} params - Params
 */
var keyGenerator = function (params) {
    return (0, utils_1.interpolate)(null, params);
};
function getCollection(reducerState) {
    return reducerState.collection || {};
}
/**
 * returns true if the component has all the required props
 * @param {ARCConfig} config
 * @param {ComponentProps} props - component props
 */
function hasRequiredParams(config, props) {
    return config.modelProps.every(function (prop) {
        return typeof props[prop] !== "undefined";
    });
}
/**
 * returns the missing required props (useful for debugging)
 * @param {ARCConfig} config
 * @param {ComponentProps} props - component props
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
 * @param {ComponentProps} props - component props
 */
function isNew(config, props) {
    return !getKey(config, props);
}
/**
 * returns the reducer key
 * @param {ARCConfig} config
 * @param {ComponentProps} props - component props
 */
function getKey(config, props) {
    var params = getParams(config, props);
    return !params ? null : keyGenerator(params);
}
/**
 * returns only the required params from the component props
 * @param {ARCConfig} config
 * @param {ComponentProps} props - component props
 */
function getParams(config, props) {
    if (!hasRequiredParams(config, props))
        return null;
    return (0, utils_1.getParams)(config, props);
}
/**
 * returns the metas
 * @param {ARCConfig} config
 * @param {string} [prop] - requested meta
 * @param {ComponentWithStoreProps} props - component props
 * @param reducerState
 */
function getMetas(config, prop, props, reducerState) {
    if (!_getModel(config, props, reducerState))
        return null;
    var metaModel = _getModel(config, props, reducerState);
    if (!metaModel)
        return null;
    if (typeof prop !== "undefined") {
        return metaModel.metas[prop] || null;
    }
    return metaModel.metas;
}
/**
 * returns the meta model
 * @param {ARCConfig} config
 * @param {ComponentWithStoreProps} props - component props

 * @param reducerState
 */
function _getModel(config, props, reducerState) {
    // WARNING:
    // DEPRECATED TO BE WARNED
    // if (isNew(config, props)) {
    //   return props.temp
    // }
    var key = getKey(config, props);
    if (!key) {
        return null;
    }
    return getCollection(reducerState)[key];
}
/**
 * returns the model
 * @param {ARCConfig} config
 * @param {ComponentWithStoreProps} props - component props
 * @param reducerState
 */
function getModel(config, props, reducerState) {
    var metaModel = _getModel(config, props, reducerState);
    if (!metaModel) {
        return null;
    }
    return metaModel.model;
}
function getError(config, props, reducerState) {
    var error = getMetas(config, "error", props, reducerState);
    if (!error)
        return null;
    return error;
}
/**
 * returns true if the component is syncing
 * @param {ARCConfig} config
 * @param {ComponentWithStoreProps} props - component props
 * @param reducerState
 */
function isSyncing(config, props, reducerState) {
    //TODO hard code metas
    return !!getMetas(config, "fetching", props, reducerState);
}
/**
 * returns true if the component is loaded
 * @param {ARCConfig} config
 * @param {ComponentWithStoreProps} props - component props
 * @param reducerState
 */
function isLoaded(config, props, reducerState) {
    if (isNew(config, props)) {
        return true;
    }
    return !(!_getModel(config, props, reducerState) || !getMetas(config, "loaded", props, reducerState));
}
/**
 * returns true if the component can be re-fetched
 * @param {ARCConfig} config
 * @param {ComponentWithStoreProps} props - component props

 * @param reducerState
 */
function allowReFetch(config, props, reducerState) {
    return !(config.fetchOnce && isLoaded(config, props, reducerState));
}
/**
 * returns true if the component can re-refetch on error
 * @param {ARCConfig} config
 * @param {ComponentWithStoreProps} props - component props
 * @param reducerState
 */
function errorReFetch(config, props, reducerState) {
    //canReFetchOnerror
    if (config.refetchOnError === true &&
        !isSyncing(config, props, reducerState) &&
        !isLoaded(config, props, reducerState) &&
        !!getError(config, props, reducerState))
        return true;
    return !getError(config, props, reducerState);
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
 * @param {ARCConfig} config
 * @param {ComponentWithStoreProps} props - component props
 * @param {array<ComponentPropsWithRequiredModelParams>} [listOfParams=[]] - list of model keys
 * @param reducerState
 */
function modelPicker(config, 
//TODO: remove me
//@ts-ignore
props, listOfParams, reducerState) {
    if (listOfParams === void 0) { listOfParams = []; }
    var models = [];
    //return listOfParams.reduce((acc, params) => {}, models)
    listOfParams.forEach(function (keyProps) {
        var modelParams = getParams(config, keyProps);
        var props = __assign({}, modelParams);
        var model = getModel(config, props, reducerState);
        if (model) {
            models.push(model);
        }
    });
    return models;
}
/**
 * return a model
 * @param {ARCConfig} config
 * @param {object} reduxStoreState - redux's store.getState()
 * @param {array<ComponentPropsWithRequiredModelParams>} [listOfParams=[]] - list of model params

 */
function freeModelPicker(config, reduxStoreState, listOfParams) {
    if (listOfParams === void 0) { listOfParams = []; }
    var reducerState = getStore(config, reduxStoreState);
    return (modelPicker(config, {}, listOfParams, reducerState) || []).filter(Boolean);
}
/**
 * Returns the number of fetching items
 * @param {ComponentWithStoreProps} props - component props
 */
function getFetchingCount(props) {
    var collection = props.collection;
    return Object.keys(collection)
        .map(function (key) { return collection[key]; })
        .filter(function (model) { return model.metas.fetching; }).length;
}
exports.core = {
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
