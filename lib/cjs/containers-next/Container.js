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
exports.useContainer = useContainer;
exports.Container = Container;
var react_1 = require("react");
var ReduxActions_1 = require("../actions/ReduxActions");
var core_1 = require("../actions/core");
var utils_1 = require("../utils");
var react_redux_1 = require("react-redux");
function useContainer(_a) {
    var initialConfig = _a.ARCConfig;
    var store = (0, react_redux_1.useStore)();
    var abortControllerRef = (0, react_1.useRef)(null);
    // Initialize ARC configuration with default values and provided configuration
    var _b = (0, react_1.useMemo)(function () {
        var config = (0, utils_1.initializeConfig)(initialConfig);
        var actionsList = new ReduxActions_1.ReduxActions({ config: config });
        return [config, actionsList];
    }, [initialConfig]), ARCConfig = _b[0], actions = _b[1];
    // Get current store state for the specific namespace
    var getTrueStoreState = (0, react_1.useCallback)(function () {
        var state = store.getState();
        var namespace = ARCConfig.name;
        if (!state[namespace]) {
            console.error("Namespace \"".concat(namespace, "\" not found in store. Please check ARCConfig setup."));
            return { collection: {} };
        }
        return {
            collection: state[namespace].collection,
        };
    }, [store, ARCConfig]);
    // Get combined props from store state and provided props
    var getPropsFromTrueStoreState = (0, react_1.useCallback)(function (props) {
        var ARCProps = getTrueStoreState();
        return __assign(__assign({}, props), ARCProps);
    }, [getTrueStoreState]);
    // Update ARC configuration
    var updateARC = (0, react_1.useCallback)(function (config) {
        actions.updateConfig(config);
        return config;
    }, [actions]);
    return {
        ARCConfig: ARCConfig,
        actions: actions,
        core: core_1.core,
        abortController: abortControllerRef,
        getTrueStoreState: getTrueStoreState,
        getPropsFromTrueStoreState: getPropsFromTrueStoreState,
        updateARC: updateARC
    };
}
// Container functional component that uses the useContainer hook
function Container(props) {
    var ARCConfig = props.ARCConfig;
    var container = useContainer({ ARCConfig: ARCConfig });
    return __assign(__assign({}, container), { props: props });
}
exports.default = Container;
