"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.changedProps = void 0;
exports.flatten = flatten;
exports.extendWithDefaultProps = extendWithDefaultProps;
exports.extractParams = extractParams;
exports.getParams = getParams;
exports.cleanParams = cleanParams;
exports.stringIsReplaceable = stringIsReplaceable;
exports.interpolate = interpolate;
exports.getDefaultConfig = getDefaultConfig;
exports.omit = omit;
exports.initializeConfig = initializeConfig;
const deep_equal_1 = __importDefault(require("deep-equal"));
const defaultConfig_1 = __importDefault(require("../defaultConfig"));
const axios_1 = __importDefault(require("axios"));
const ReduxActions_1 = require("../actions/ReduxActions");
function flatten(arcCollectionMap, withMetas = false) {
    const metaModels = Object.keys(arcCollectionMap).map((nodeName) => arcCollectionMap[nodeName]);
    return withMetas ? metaModels : metaModels.map((metaModel) => metaModel.model);
}
function extendWithDefaultProps(config, ownProps) {
    const defaultProps = (config.defaultProps || {}); //keyof ARCConfig<Model,RequiredProps>['defaultProps']
    return Object.keys(defaultProps).reduce((state, prop) => {
        const originalProps = ownProps;
        if (typeof originalProps[prop] === "undefined") {
            state[prop] = defaultProps[prop];
        }
        return state;
    }, ownProps);
}
//
// export const getDefaultFromMissingProps = (ARCConfig, ownProps) => {
//   const defaultProps = ARCConfig.defaultProps || {}
//   return Object.keys(defaultProps).reduce((state, prop) => {
//     if (typeof ownProps[prop] === "undefined") {
//       state[prop] = defaultProps[prop]
//     }
//     return state
//   }, {})
// }
//
// export const removeMissingProps = (ARCConfig, ownProps) => {
//   const defaultProps = ARCConfig.defaultProps || {}
//
//   return Object.keys(defaultProps).reduce(
//     (state, prop) => {
//       if (typeof ownProps[prop] === "undefined") {
//         //ugly shit
//         delete state[prop]
//         return state
//       }
//       return state
//     },
//     { ...ownProps }
//   )
// }
function extractParams(props = [], source = {}) {
    return props.reduce((params, prop) => ({
        ...params,
        [prop]: source[prop],
    }), {});
}
function getParams(config, source = {}) {
    const props = config.modelProps;
    const defaultProps = config.defaultProps || {};
    const merged = { ...defaultProps, ...source };
    const componentProps = {};
    return props.reduce((params, prop) => ({
        ...params,
        [prop]: merged[prop],
    }), componentProps);
}
const changedProps = function (prevProps, nextProps) {
    const changed = [];
    if (!prevProps)
        return changed;
    if (typeof prevProps !== typeof prevProps)
        return Object.keys(prevProps);
    return Object.keys(nextProps).reduce((state, item) => {
        if (!(0, deep_equal_1.default)(prevProps[item], nextProps[item])) {
            state.push(item);
        }
        return state;
    }, changed);
};
exports.changedProps = changedProps;
function cleanParams(str) {
    return str.replace(/({[A-z0-9_\-]+})/g, "");
}
function stringIsReplaceable(str) {
    return (/{([A-z0-9_\-]+)}/g).test(str);
}
function interpolate(str, params) {
    const keys = Object.keys(params);
    // if no string is given we generate one ( params = {foo:'bar', baz:'wth'} will generate {foo}:{baz})
    // it will provide a unique id for models
    const stringToDecorate = str ||
        keys
            .sort()
            .map((v) => "{" + v + "}")
            .join(":");
    // it will turn path/to/{id} to path/to/123
    const result = keys.reduce((prev, current) => {
        if (!stringIsReplaceable(prev)) {
            return prev;
        }
        // @ts-ignore
        const elm_val = params[current];
        // skip functions
        if (typeof elm_val === "function")
            return prev;
        if (Array.isArray(elm_val)) {
            return prev.replace(new RegExp("{" + current + "}", "g"), "[" +
                elm_val
                    .map((item) => typeof item === "object" ? interpolate(null, item) : item)
                    .join("|") +
                "]");
        }
        if (typeof elm_val === "undefined")
            return prev;
        return prev.replace(new RegExp("{" + current + "}", "g"), String(elm_val));
    }, stringToDecorate);
    // if params are missing we remove them
    // path/to/123/{anotherId} => path/to/123/
    return cleanParams(result);
}
function getDefaultConfig() {
    return defaultConfig_1.default;
    // return JSON.parse(
    //   JSON.stringify(defaultConfig)
    // ) as ARCConfig<Model>
}
function omit(obj, keysToOmit = []) {
    const keys = Array.isArray(keysToOmit) ? keysToOmit : [keysToOmit];
    const result = {};
    const objKeys = Object.keys(obj);
    for (const key of objKeys) {
        if (!keys.includes(key)) {
            result[key] = obj[key];
        }
    }
    return result;
}
function initializeConfig(config) {
    if (!config) {
        return getDefaultConfig();
    }
    const FETCHER_MAP = {
        fetch: (_params, config, _props, axiosOptions) => {
            return (0, axios_1.default)({
                // methods are already lowercased in setupMethods
                method: config.methods.read,
                url: config.paths.item,
                headers: config.headers,
                signal: axiosOptions ? ReduxActions_1.ReduxActions.GenerateAbortSignal(axiosOptions) : undefined,
            });
        },
        ...config.fetchers
    };
    const extendedConfig = {
        ...getDefaultConfig(),
        ...config,
        actionNamespace: config?.actionNamespace || config.name.toUpperCase(),
        fetchers: FETCHER_MAP
    };
    return extendedConfig;
}
