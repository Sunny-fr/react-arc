import { useCallback, useMemo, useRef } from "react";
import { ReduxActions } from "../actions/ReduxActions";
import { core } from "../actions/core";
import { initializeConfig } from "../utils";
export function useContainer({ ARCConfig: initialConfig }) {
    const abortControllerRef = useRef(null);
    // Initialize ARC configuration with default values and provided configuration
    const [ARCConfig, actions] = useMemo(() => {
        const config = initializeConfig(initialConfig);
        const reduxActions = new ReduxActions({ config });
        if (config.fetchers?.fetch) {
            reduxActions.standAloneFetchOne = config.fetchers.fetch;
        }
        return [config, reduxActions];
    }, [initialConfig]);
    // Update ARC configuration
    const updateARC = useCallback((config) => {
        actions.updateConfig(config);
        return config;
    }, [actions]);
    return {
        ARCConfig,
        actions,
        core: core,
        abortController: abortControllerRef,
        updateARC
    };
}
// Container functional component that uses the useContainer hook
export function Container(props) {
    const { ARCConfig } = props;
    const container = useContainer({ ARCConfig });
    return {
        ...container,
        props
    };
}
export default Container;
