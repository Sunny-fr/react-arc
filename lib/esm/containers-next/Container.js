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
import { useCallback, useMemo, useRef } from "react";
import { ReduxActions } from "../actions/ReduxActions";
import { core } from "../actions/core";
import { initializeConfig } from "../utils";
export function useContainer(_a) {
    var initialConfig = _a.ARCConfig;
    var abortControllerRef = useRef(null);
    // Initialize ARC configuration with default values and provided configuration
    var _b = useMemo(function () {
        var config = initializeConfig(initialConfig);
        var actionsList = new ReduxActions({ config: config });
        return [config, actionsList];
    }, [initialConfig]), ARCConfig = _b[0], actions = _b[1];
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
