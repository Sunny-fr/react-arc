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
 */
function getMetas(config, prop, props) {
    if (!_getModel(config, props))
        return null;
    var metaModel = _getModel(config, props);
    if (!metaModel)
        return null;
    if (typeof prop !== "undefined") {
        return metaModel.metas[prop];
    }
    return metaModel.metas;
}
/**
 * returns the meta model
 * @param {ARCConfig} config
 * @param {ComponentWithStoreProps} props - component props

 */
function _getModel(config, props) {
    // WARNING:
    // DEPRECATED TO BE WARNED
    // if (isNew(config, props)) {
    //   return props.temp
    // }
    var key = getKey(config, props);
    if (!key) {
        return null;
    }
    return props.collection[key];
}
/**
 * returns the model
 * @param {ARCConfig} config
 * @param {ComponentWithStoreProps} props - component props

 */
function getModel(config, props) {
    var metaModel = _getModel(config, props);
    if (!metaModel) {
        return null;
    }
    return metaModel.model;
}
function getError(config, props) {
    var error = getMetas(config, "error", props);
    if (!error)
        return null;
    return error;
}
/**
 * returns true if the component is syncing
 * @param {ARCConfig} config
 * @param {ComponentWithStoreProps} props - component props
 */
function isSyncing(config, props) {
    //TODO hard code metas
    return !!getMetas(config, "fetching", props);
}
/**
 * returns true if the component is loaded
 * @param {ARCConfig} config
 * @param {ComponentWithStoreProps} props - component props
 */
function isLoaded(config, props) {
    if (isNew(config, props)) {
        return true;
    }
    return !(!_getModel(config, props) || !getMetas(config, "loaded", props));
}
/**
 * returns true if the component can be re-fetched
 * @param {ARCConfig} config
 * @param {ComponentWithStoreProps} props - component props

 */
function allowReFetch(config, props) {
    return !(config.fetchOnce && isLoaded(config, props));
}
/**
 * returns true if the component can re-refetch on error
 * @param {ARCConfig} config
 * @param {ComponentWithStoreProps} props - component props
 */
function errorReFetch(config, props) {
    //canReFetchOnerror
    if (config.refetchOnError === true &&
        !isSyncing(config, props) &&
        !isLoaded(config, props) &&
        !!getError(config, props))
        return true;
    return !getError(config, props);
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
 */
function modelPicker(config, props, listOfParams) {
    if (listOfParams === void 0) { listOfParams = []; }
    var models = [];
    var collection = props.collection;
    //TODO REWRITE AS REDUCE FN
    //return listOfParams.reduce((acc, params) => {}, models)
    listOfParams.forEach(function (keyProps) {
        var modelParams = getParams(config, keyProps);
        var props = __assign({ 
            //TODO  REMOVE temp, error, loaded, fetching,
            // temp,
            // error,
            // loaded,
            // fetching,
            collection: collection }, modelParams);
        var model = getModel(config, props);
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
    var collection = getStore(config, reduxStoreState).collection;
    return (modelPicker(config, {
        collection: collection,
        //DUMMY DATA MUST BE REMOVED  temp: null, error: null, loaded: false, fetching: false
        // temp: null,
        // error: null,
        // loaded: false,
        // fetching: false,
    }, listOfParams) || []).filter(Boolean);
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
/** COLLECTIONS
 * SOON TO BE DROPPED
 * **/
function getCollectionError(props) {
    var _a = props.error, error = _a === void 0 ? false : _a;
    return error;
}
//type IsCollectionLoadedFn = (props: ComponentWithStoreProps) => boolean
function isCollectionLoaded(props) {
    var _a = props.loaded, loaded = _a === void 0 ? false : _a;
    return loaded;
}
function isCollectionSyncing(props) {
    var _a = props.fetching, fetching = _a === void 0 ? false : _a;
    return fetching;
}
function allowCollectionReFetch(config, props) {
    return !(config.fetchOnce && isCollectionLoaded(props));
}
exports.core = {
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
    /** COLLECTIONS
     * SOON TO BE DROPPED
     * **/
    getCollectionError: getCollectionError,
    isCollectionLoaded: isCollectionLoaded,
    isCollectionSyncing: isCollectionSyncing,
    allowCollectionReFetch: allowCollectionReFetch,
};
