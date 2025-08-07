"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useContainer = useContainer;
exports.Container = Container;
const react_1 = require("react");
const ReduxActions_1 = require("../actions/ReduxActions");
const core_1 = require("../actions/core");
const utils_1 = require("../utils");
function useContainer({ ARCConfig: initialConfig }) {
    const abortControllerRef = (0, react_1.useRef)(null);
    // Initialize ARC configuration with default values and provided configuration
    const [ARCConfig, actions] = (0, react_1.useMemo)(() => {
        const config = (0, utils_1.initializeConfig)(initialConfig);
        const actionsList = new ReduxActions_1.ReduxActions({ config });
        return [config, actionsList];
    }, [initialConfig]);
    // Update ARC configuration
    const updateARC = (0, react_1.useCallback)((config) => {
        actions.updateConfig(config);
        return config;
    }, [actions]);
    return {
        ARCConfig,
        actions,
        core: core_1.core,
        abortController: abortControllerRef,
        updateARC
    };
}
// Container functional component that uses the useContainer hook
function Container(props) {
    const { ARCConfig } = props;
    const container = useContainer({ ARCConfig });
    return {
        ...container,
        props
    };
}
exports.default = Container;
