"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.useModelContainer = useModelContainer;
exports.ModelContainer = ModelContainer;
const react_1 = __importStar(require("react"));
const utils_1 = require("../utils");
const commons_1 = __importDefault(require("../commons"));
const Container_1 = require("./Container");
const react_redux_1 = require("react-redux");
const selectors_1 = require("../hooks/selectors");
function useModelContainer({ ARCConfig, props }) {
    const dispatch = (0, react_redux_1.useDispatch)();
    const reduxContext = (0, react_1.useContext)(react_redux_1.ReactReduxContext);
    const container = (0, Container_1.useContainer)({ ARCConfig });
    const { actions, core, abortController: abortControllerRef, } = container;
    const delayedTimeoutRef = (0, react_1.useRef)(undefined);
    const isMountedRef = (0, react_1.useRef)(true); // Reference to track if the component is mounted
    const [fetchStatus, setFetchStatus] = (0, react_1.useState)({
        inProgress: false,
        hasInitialFetch: false
    });
    /** PUBLIC METHODS **/
    /**
     * Returns model data retrieved from the server
     * @param componentProps Optional component props
     * @returns The model data
     */
    const getModel = (0, react_1.useCallback)((componentProps) => {
        return (componentProps || props).model;
    }, [props]);
    /**
     * Returns any error information
     * @param componentProps Optional component props
     * @returns Error information
     */
    const getError = (0, react_1.useCallback)((componentProps) => {
        return (componentProps || props).error;
    }, [props]);
    /**
     * Checks if there's any sync activity in progress
     * @param componentProps Optional component props
     * @returns Boolean indicating if sync is in progress
     */
    const isSyncing = (0, react_1.useCallback)((componentProps) => {
        return (componentProps || props).loading;
    }, [props]);
    /**
     * Checks if the model has been loaded at least once
     * @param componentProps Optional component props
     * @returns Boolean indicating if model is loaded
     */
    const isLoaded = (0, react_1.useCallback)((componentProps) => {
        return (componentProps || props).loaded;
    }, [props]);
    /** PUBLIC ACTIONS METHODS **/
    /**
     * Checks if the component has not the required params and should be considered as new
     * @param componentProps Optional props to check against instead of current props
     * @returns boolean indicating if the model is new
     */
    const isNew = (0, react_1.useCallback)((componentProps) => {
        return core.isNew(ARCConfig, componentProps || props);
    }, [core, ARCConfig, props]);
    /**
     * Returns null or string that acts as unique identifier (based on required props)
     * @param componentProps Optional props to generate key from
     * @returns A string key or null
     */
    const getKey = (0, react_1.useCallback)((componentProps) => {
        return core.getKey(ARCConfig, componentProps || props);
    }, [core, ARCConfig, props]);
    /**
     * Retrieves params from props or model
     * @param componentProps Optional props to get params from
     * @returns The extracted params
     */
    const getParams = (0, react_1.useCallback)((componentProps) => {
        return core.getParams(ARCConfig, componentProps || props);
    }, [core, ARCConfig, props]);
    /**
     * Checks if the component has the required params based on modelProps in config
     * @param componentProps Optional props to check against
     * @returns Boolean indicating if required params are present
     */
    const hasRequiredParams = (0, react_1.useCallback)((componentProps) => {
        return core.hasRequiredParams(ARCConfig, componentProps || props);
    }, [core, ARCConfig, props]);
    /**
     * Gets a model and its meta data
     * @param componentProps Optional component props to use
     * @returns The model data
     */
    const _getModel = (0, react_1.useCallback)((componentProps) => {
        return core._getModel(componentProps.metaModel);
    }, [core, ARCConfig, props]);
    /**
     * Returns meta information (loaded, error, etc.)
     * @param prop Specific meta property to retrieve
     * @param componentProps Optional component props
     * @returns The requested meta information
     */
    const getMetas = (0, react_1.useCallback)((prop, componentProps) => {
        const metas = (componentProps || props).metas;
        if (!metas) {
            return metas;
        }
        return !!prop ? metas[prop] : metas;
    }, [props]);
    /**
     * Fetches a model from the server
     * @param params The params required for fetching
     * @returns Promise resolving to the fetch result
     */
    const fetch = (0, react_1.useCallback)((params) => {
        // Don't fetch if the component is unmounted
        if (!isMountedRef.current) {
            return Promise.resolve();
        }
        // Create new AbortController only if needed
        if (!abortControllerRef.current) {
            abortControllerRef.current = new AbortController();
        }
        // Mark fetch as in progress
        setFetchStatus(prev => ({ ...prev, inProgress: true }));
        const axiosOptions = {
            abortController: abortControllerRef.current
        };
        // Use then/catch instead of finally for better compatibility
        return dispatch(actions.fetchOne(params, props, axiosOptions))
            .then((result) => {
            // Once request is complete successfully, update status
            if (isMountedRef.current) {
                setFetchStatus(prev => ({ ...prev, inProgress: false }));
            }
            return result;
        })
            .catch((error) => {
            // Once request fails, update status
            if (isMountedRef.current) {
                setFetchStatus(prev => ({ ...prev, inProgress: false }));
            }
            throw error; // re-throw to propagate the error
        });
    }, [dispatch, actions, props, abortControllerRef]);
    /** ADDITIONAL METHODS **/
    /**
     * Returns count of fetching requests
     * @returns Number of active fetch requests
     */
    const getFetchingCount = (0, react_1.useCallback)(() => {
        return (0, selectors_1.fetchingCountSelector)(reduxContext?.store.getState(), ARCConfig.name);
    }, [ARCConfig]);
    /**
     * Determines if a refetch is allowed based on the fetchOnce flag
     * @param componentProps Optional component props
     * @returns Boolean indicating if refetch is allowed
     */
    const allowReFetch = (0, react_1.useCallback)((componentProps) => {
        return core.allowReFetch(ARCConfig, componentProps?.metaModel);
    }, [core, ARCConfig, props]);
    /**
     * Determines if a refetch is allowed on error
     * @param componentProps Optional component props
     * @returns Boolean indicating if refetch on error is allowed
     */
    const errorReFetch = (0, react_1.useCallback)((componentProps) => {
        return core.errorReFetch(ARCConfig, componentProps?.metaModel);
    }, [core, ARCConfig, props]);
    /**
     * Determines if fetch is authorized based on several conditions
     * @param componentProps The component props to check
     * @param options Options for fetch authorization
     * @returns Boolean indicating if fetch is authorized
     */
    const _fetchAuthorization = (0, react_1.useCallback)((componentProps, { skipReFetchStep = false }) => {
        const modelKey = core.getKey(ARCConfig, props);
        const metaModel = (0, selectors_1.metaModelSelector)(reduxContext?.store.getState(), ARCConfig, modelKey);
        //const metaModel = componentProps?.metaModel
        if (isNew(componentProps)) {
            return false;
        }
        if (!hasRequiredParams(componentProps)) {
            return false;
        }
        if (typeof core._getModel(metaModel) === "undefined" || !metaModel) {
            return true;
        }
        if (core.isSyncing(metaModel)) {
            return false;
        }
        if (!skipReFetchStep &&
            core.isLoaded(metaModel) &&
            allowReFetch(componentProps)) {
            return true;
        }
        if (!skipReFetchStep &&
            !!core.getError(metaModel) &&
            errorReFetch(componentProps)) {
            return true;
        }
        return false;
    }, [core, isNew, hasRequiredParams, allowReFetch, errorReFetch, ARCConfig]);
    /**
     * Get the model data with appropriate fallback
     * @returns The model data or default model
     */
    const getModelDataTyped = (0, react_1.useCallback)(() => {
        const loaded = isLoaded();
        const error = getError();
        return !error && loaded && !isNew() ? getModel() : ARCConfig.defaultModel;
    }, [isLoaded, getError, isNew, getModel, ARCConfig]);
    /**
     * Schedule a delayed fetch for throttling
     * @param options Options for the delayed fetch
     */
    const delayedFetch = (0, react_1.useCallback)(({ skipReFetchStep = false }) => {
        delayedTimeoutRef.current = window.setTimeout(() => {
            prepareFetch({ skipReFetchStep });
        }, ARCConfig.requestFetchDelay);
    }, [ARCConfig]); // Note: Will add prepareFetch to dependencies after it's defined
    /**
     * Prepares a fetch with max pending request check
     * @param options Options for preparing the fetch
     */
    const prepareFetch = (0, react_1.useCallback)(({ skipReFetchStep = false }) => {
        // Don't trigger a fetch if the component is unmounted
        if (!isMountedRef.current)
            return;
        // For initial fetch on mount, check if we've already done it
        if (!skipReFetchStep && fetchStatus.hasInitialFetch)
            return;
        // If this is the initial fetch, mark it as done
        if (!skipReFetchStep) {
            setFetchStatus(prev => ({ ...prev, hasInitialFetch: true }));
        }
        if (_fetchAuthorization(props, { skipReFetchStep })) {
            const max = ARCConfig.maxPendingRequestsPerReducer;
            if (max && max > -1) {
                const count = getFetchingCount();
                if (count > max) {
                    return delayedFetch({ skipReFetchStep });
                }
            }
            const params = getParams(props);
            if (!params) {
                console.error('Fetch params are missing');
                return;
            }
            fetch(params);
        }
    }, [
        _fetchAuthorization,
        props,
        ARCConfig,
        getFetchingCount,
        getParams,
        fetch,
        fetchStatus.hasInitialFetch,
        delayedFetch
    ]);
    // Fix circular dependency by updating delayedFetch to include prepareFetch in dependencies
    // eslint-disable-next-line react-hooks/exhaustive-deps
    (0, react_1.useCallback)(delayedFetch, [prepareFetch, ARCConfig]);
    // Mount effect - run once at component initialization
    (0, react_1.useEffect)(() => {
        //console.log('ModelContainer mounted with props:', props)
        isMountedRef.current = true;
        // Use a small delay to ensure state stability before initial fetch
        const initTimeout = setTimeout(() => {
            if (isMountedRef.current) {
                prepareFetch({ skipReFetchStep: false });
            }
        }, 0);
        // Cleanup function executed only on real unmount
        return () => {
            //console.log('ModelContainer unmounting - cleanup phase')
            isMountedRef.current = false;
            clearTimeout(initTimeout);
            clearTimeout(delayedTimeoutRef.current);
            // Only abort request if there's actually a fetch in progress
            if (abortControllerRef.current && fetchStatus.inProgress) {
                //console.log('ModelContainer unmounted, aborting ongoing request')
                abortControllerRef.current.abort(commons_1.default.cancelRequestPayload({ ARCConfig }));
                abortControllerRef.current = null;
            }
        };
    }, []); // Empty deps array ensures this runs only on mount/unmount
    // Separate update effect for props changes - avoids restarting the complete lifecycle
    (0, react_1.useEffect)(() => {
        // Skip for initial render - the first useEffect already handles it
        if (fetchStatus.hasInitialFetch && isMountedRef.current) {
            prepareFetch({ skipReFetchStep: true });
        }
    }, [props, prepareFetch, fetchStatus.hasInitialFetch]);
    return {
        ...container,
        isNew,
        getKey,
        getParams,
        hasRequiredParams,
        _getModel,
        fetch,
        getFetchingCount,
        getModel,
        getMetas,
        getError,
        isSyncing,
        isLoaded,
        allowReFetch,
        errorReFetch,
        getModelDataTyped,
        prepareFetch
    };
}
function ModelContainer(props) {
    const { ARCConfig, component: Component } = props;
    const dispatch = (0, react_redux_1.useDispatch)();
    const { isLoaded, isSyncing, getError, getModelDataTyped, getParams, fetch } = useModelContainer({
        ARCConfig,
        props: { ...props, dispatch }
    });
    const componentProps = (0, utils_1.omit)(props, ['ARCConfig', 'component']);
    const loaded = isLoaded();
    const loading = isSyncing();
    const error = getError();
    const data = getModelDataTyped();
    if (!Component) {
        console.error('ModelContainer: component prop is required');
        return null;
    }
    const params = getParams(props);
    if (!params) {
        console.error('ModelContainer: params are required');
        return null;
    }
    return (react_1.default.createElement(Component, { ...componentProps, loading: loading, loaded: loaded, model: data, error: error, fetch: fetch ? () => fetch(params) : undefined }));
}
exports.default = ModelContainer;
