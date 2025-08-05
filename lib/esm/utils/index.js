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
import equal from "deep-equal";
import defaultConfig from "../defaultConfig";
import axios from "axios";
import { ReduxActions } from "../actions/ReduxActions";
export function flatten(arcCollectionMap, withMetas) {
    if (withMetas === void 0) { withMetas = false; }
    var metaModels = Object.keys(arcCollectionMap).map(function (nodeName) {
        return arcCollectionMap[nodeName];
    });
    return withMetas ? metaModels : metaModels.map(function (metaModel) { return metaModel.model; });
}
export function extendWithDefaultProps(config, ownProps) {
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
export function extractParams(props, source) {
    if (props === void 0) { props = []; }
    if (source === void 0) { source = {}; }
    return props.reduce(function (params, prop) {
        var _a;
        return (__assign(__assign({}, params), (_a = {}, _a[prop] = source[prop], _a)));
    }, {});
}
export function getParams(config, source) {
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
export var changedProps = function (prevProps, nextProps) {
    var changed = [];
    if (!prevProps)
        return changed;
    if (typeof prevProps !== typeof prevProps)
        return Object.keys(prevProps);
    return Object.keys(nextProps).reduce(function (state, item) {
        if (!equal(prevProps[item], nextProps[item])) {
            state.push(item);
        }
        return state;
    }, changed);
};
export function cleanParams(str) {
    return str.replace(/({[A-z0-9_\-]+})/g, "");
}
export function stringIsReplaceable(str) {
    return (/{([A-z0-9_\-]+)}/g).test(str);
}
export function interpolate(str, params) {
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
export function getDefaultConfig() {
    return defaultConfig;
    // return JSON.parse(
    //   JSON.stringify(defaultConfig)
    // ) as ARCConfig<Model>
}
export var omit = function (props, prop) {
    var omitted = typeof prop === 'string' ? [prop] : prop;
    return Object.keys(props).reduce(function (state, current) {
        var _a;
        return omitted.includes(current)
            ? state
            : __assign(__assign({}, state), (_a = {}, _a[current] = props[current], _a));
    }, {});
};
export function initializeConfig(config) {
    if (!config) {
        return getDefaultConfig();
    }
    var FETCHER_MAP = __assign({ fetch: function (_params, config, _props, axiosOptions) {
            return axios({
                // methods are already lowercased in setupMethods
                method: config.methods.read,
                url: config.paths.item,
                headers: config.headers,
                signal: axiosOptions ? ReduxActions.GenerateAbortSignal(axiosOptions) : undefined,
            });
        } }, config.fetchers);
    var extendedConfig = __assign(__assign(__assign({}, getDefaultConfig()), config), { actionNamespace: (config === null || config === void 0 ? void 0 : config.actionNamespace) || config.name.toUpperCase(), fetchers: FETCHER_MAP });
    return extendedConfig;
}
