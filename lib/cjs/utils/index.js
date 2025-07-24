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
var deep_equal_1 = __importDefault(require("deep-equal"));
var lodash_clonedeep_1 = __importDefault(require("lodash.clonedeep"));
var defaultConfig_1 = __importDefault(require("../defaultConfig"));
function flatten(arcCollectionMap, withMetas) {
    if (withMetas === void 0) { withMetas = false; }
    var metaModels = Object.keys(arcCollectionMap).map(function (nodeName) {
        return arcCollectionMap[nodeName];
    });
    return withMetas ? metaModels : metaModels.map(function (metaModel) { return metaModel.model; });
}
function extendWithDefaultProps(config, ownProps) {
    var defaultProps = config.defaultProps || {};
    return Object.keys(defaultProps).reduce(function (state, prop) {
        if (typeof ownProps[prop] === "undefined") {
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
function extractParams(props, source) {
    if (props === void 0) { props = []; }
    if (source === void 0) { source = {}; }
    return props.reduce(function (params, prop) {
        var _a;
        return (__assign(__assign({}, params), (_a = {}, _a[prop] = source[prop], _a)));
    }, {});
}
function getParams(config, source) {
    if (source === void 0) { source = {}; }
    var props = config.modelProps;
    var defaultProps = config.defaultProps || {};
    var merged = __assign(__assign({}, defaultProps), source);
    var componentProps = {};
    return props.reduce(function (params, prop) {
        var _a;
        return (__assign(__assign({}, params), (_a = {}, _a[prop] = merged[prop], _a)));
    }, componentProps);
}
var changedProps = function (prevProps, nextProps) {
    var changed = [];
    if (!prevProps)
        return changed;
    if (typeof prevProps !== typeof prevProps)
        return Object.keys(prevProps);
    return Object.keys(nextProps).reduce(function (state, item) {
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
    var keys = Object.keys(params);
    // if no string is given we generate one ( params = {foo:'bar', baz:'wth'} will generate {foo}:{baz})
    // it will provide a unique id for models
    var stringToDecorate = str ||
        keys
            .sort()
            .map(function (v) { return "{" + v + "}"; })
            .join(":");
    // it will turn path/to/{id} to path/to/123
    var result = keys.reduce(function (prev, current) {
        if (!stringIsReplaceable(prev)) {
            return prev;
        }
        // @ts-ignore
        var elm_val = params[current];
        // skip functions
        if (typeof elm_val === "function")
            return prev;
        if (Array.isArray(elm_val)) {
            return prev.replace(new RegExp("{" + current + "}", "g"), "[" +
                elm_val
                    .map(function (item) {
                    return typeof item === "object" ? interpolate(null, item) : item;
                })
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
    return (0, lodash_clonedeep_1.default)(defaultConfig_1.default);
}
