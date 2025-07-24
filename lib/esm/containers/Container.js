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
import { useRef, useCallback, useMemo } from "react";
import { ReduxActionsList } from "../actions/ReduxActionsList";
import { core } from "../actions/core";
import { getDefaultConfig } from "../utils";
import { useStore } from "react-redux";
export function useContainer(_a) {
    var initialConfig = _a.ARCConfig;
    var store = useStore();
    var abortControllerRef = useRef(null);
    // Initialize ARC configuration with default values and provided configuration
    var _b = useMemo(function () {
        var config = __assign(__assign({}, (getDefaultConfig())), initialConfig);
        var actionsList = new ReduxActionsList({ config: config });
        return [config, actionsList];
    }, [initialConfig]), ARCConfig = _b[0], actions = _b[1];
    // Get current store state for the specific namespace
    var getTrueStoreState = useCallback(function () {
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
    var getPropsFromTrueStoreState = useCallback(function (props) {
        var ARCProps = getTrueStoreState();
        return __assign(__assign({}, props), ARCProps);
    }, [getTrueStoreState]);
    // Update ARC configuration
    var updateARC = useCallback(function (config) {
        actions.updateConfig(config);
        return config;
    }, [actions]);
    return {
        ARCConfig: ARCConfig,
        actions: actions,
        core: core,
        abortController: abortControllerRef,
        getTrueStoreState: getTrueStoreState,
        getPropsFromTrueStoreState: getPropsFromTrueStoreState,
        updateARC: updateARC
    };
}
// Container functional component that uses the useContainer hook
export function Container(props) {
    var ARCConfig = props.ARCConfig;
    var container = useContainer({ ARCConfig: ARCConfig });
    return __assign(__assign({}, container), { props: props });
}
export default Container;
