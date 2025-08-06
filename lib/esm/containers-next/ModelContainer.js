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
import React, { useCallback, useContext, useEffect, useRef, useState } from "react";
import { omit } from "../utils";
import commons from "../commons";
import { useContainer } from "./Container";
import { ReactReduxContext, useDispatch } from "react-redux";
import { fetchingCountSelector, metaModelSelector } from "../hooks/selectors";
export function useModelContainer(_a) {
    var ARCConfig = _a.ARCConfig, props = _a.props;
    var dispatch = useDispatch();
    var reduxContext = useContext(ReactReduxContext);
    var container = useContainer({ ARCConfig: ARCConfig });
    var actions = container.actions, core = container.core, abortControllerRef = container.abortController;
    var delayedTimeoutRef = useRef(undefined);
    var isMountedRef = useRef(true); // Reference to track if the component is mounted
    var _b = useState({
        inProgress: false,
        hasInitialFetch: false
    }), fetchStatus = _b[0], setFetchStatus = _b[1];
    /** PUBLIC METHODS **/
    /**
     * Returns model data retrieved from the server
     * @param componentProps Optional component props
     * @returns The model data
     */
    var getModel = useCallback(function (componentProps) {
        return (componentProps || props).model;
    }, [props]);
    /**
     * Returns any error information
     * @param componentProps Optional component props
     * @returns Error information
     */
    var getError = useCallback(function (componentProps) {
        return (componentProps || props).error;
    }, [props]);
    /**
     * Checks if there's any sync activity in progress
     * @param componentProps Optional component props
     * @returns Boolean indicating if sync is in progress
     */
    var isSyncing = useCallback(function (componentProps) {
        return (componentProps || props).loading;
    }, [props]);
    /**
     * Checks if the model has been loaded at least once
     * @param componentProps Optional component props
     * @returns Boolean indicating if model is loaded
     */
    var isLoaded = useCallback(function (componentProps) {
        return (componentProps || props).loaded;
    }, [props]);
    /** PUBLIC ACTIONS METHODS **/
    /**
     * Checks if the component has not the required params and should be considered as new
     * @param componentProps Optional props to check against instead of current props
     * @returns boolean indicating if the model is new
     */
    var isNew = useCallback(function (componentProps) {
        return core.isNew(ARCConfig, componentProps || props);
    }, [core, ARCConfig, props]);
    /**
     * Returns null or string that acts as unique identifier (based on required props)
     * @param componentProps Optional props to generate key from
     * @returns A string key or null
     */
    var getKey = useCallback(function (componentProps) {
        return core.getKey(ARCConfig, componentProps || props);
    }, [core, ARCConfig, props]);
    /**
     * Retrieves params from props or model
     * @param componentProps Optional props to get params from
     * @returns The extracted params
     */
    var getParams = useCallback(function (componentProps) {
        return core.getParams(ARCConfig, componentProps || props);
    }, [core, ARCConfig, props]);
    /**
     * Checks if the component has the required params based on modelProps in config
     * @param componentProps Optional props to check against
     * @returns Boolean indicating if required params are present
     */
    var hasRequiredParams = useCallback(function (componentProps) {
        return core.hasRequiredParams(ARCConfig, componentProps || props);
    }, [core, ARCConfig, props]);
    /**
     * Gets a model and its meta data
     * @param componentProps Optional component props to use
     * @returns The model data
     */
    var _getModel = useCallback(function (componentProps) {
        return core._getModel(componentProps === null || componentProps === void 0 ? void 0 : componentProps.metaModel);
    }, [core, ARCConfig, props]);
    /**
     * Returns meta information (loaded, error, etc.)
     * @param prop Specific meta property to retrieve
     * @param componentProps Optional component props
     * @returns The requested meta information
     */
    var getMetas = useCallback(function (prop, componentProps) {
        var metas = (componentProps || props).metas;
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
    var fetch = useCallback(function (params) {
        // Don't fetch if the component is unmounted
        if (!isMountedRef.current) {
            return Promise.resolve();
        }
        // Create new AbortController only if needed
        if (!abortControllerRef.current) {
            abortControllerRef.current = new AbortController();
        }
        // Mark fetch as in progress
        setFetchStatus(function (prev) { return (__assign(__assign({}, prev), { inProgress: true })); });
        var axiosOptions = {
            abortController: abortControllerRef.current
        };
        // Use then/catch instead of finally for better compatibility
        return dispatch(actions.fetchOne(params, props, axiosOptions))
            .then(function (result) {
            // Once request is complete successfully, update status
            if (isMountedRef.current) {
                setFetchStatus(function (prev) { return (__assign(__assign({}, prev), { inProgress: false })); });
            }
            return result;
        })
            .catch(function (error) {
            // Once request fails, update status
            if (isMountedRef.current) {
                setFetchStatus(function (prev) { return (__assign(__assign({}, prev), { inProgress: false })); });
            }
            throw error; // re-throw to propagate the error
        });
    }, [dispatch, actions, props, abortControllerRef]);
    /**
     * Edit a model without sending it to the server
     * @param model The model data to edit
     */
    var edit = useCallback(function (model) {
        var fetchParams = getParams();
        if (!fetchParams)
            return;
        dispatch(actions.edit(model, fetchParams));
    }, [dispatch, actions, getParams]);
    /**
     * Save a model to the server
     */
    var save = useCallback(function () {
        var currentIsNew = isNew(props);
        var model = getModel();
        var extracted = getParams(props);
        var params = __assign(__assign({}, extracted), (currentIsNew ? getParams(model || undefined) : getParams()));
        dispatch(actions.save(model || {}, params, currentIsNew, props));
    }, [dispatch, actions, isNew, getParams, props, ARCConfig, getModel]);
    /**
     * Delete a model from the server
     */
    var remove = useCallback(function () {
        var params = getParams();
        params && dispatch(actions.remove(params, props));
    }, [dispatch, actions, isNew, getParams, props]);
    /** ADDITIONAL METHODS **/
    /**
     * Returns count of fetching requests
     * @returns Number of active fetch requests
     */
    var getFetchingCount = useCallback(function () {
        return fetchingCountSelector(reduxContext === null || reduxContext === void 0 ? void 0 : reduxContext.store.getState(), ARCConfig);
    }, [ARCConfig]);
    /**
     * Determines if a refetch is allowed based on the fetchOnce flag
     * @param componentProps Optional component props
     * @returns Boolean indicating if refetch is allowed
     */
    var allowReFetch = useCallback(function (componentProps) {
        return core.allowReFetch(ARCConfig, componentProps === null || componentProps === void 0 ? void 0 : componentProps.metaModel);
    }, [core, ARCConfig, props]);
    /**
     * Determines if a refetch is allowed on error
     * @param componentProps Optional component props
     * @returns Boolean indicating if refetch on error is allowed
     */
    var errorReFetch = useCallback(function (componentProps) {
        return core.errorReFetch(ARCConfig, componentProps === null || componentProps === void 0 ? void 0 : componentProps.metaModel);
    }, [core, ARCConfig, props]);
    /**
     * Determines if fetch is authorized based on several conditions
     * @param componentProps The component props to check
     * @param options Options for fetch authorization
     * @returns Boolean indicating if fetch is authorized
     */
    var _fetchAuthorization = useCallback(function (componentProps, _a) {
        var _b = _a.skipReFetchStep, skipReFetchStep = _b === void 0 ? false : _b;
        var modelKey = core.getKey(ARCConfig, props);
        var metaModel = metaModelSelector(reduxContext === null || reduxContext === void 0 ? void 0 : reduxContext.store.getState(), ARCConfig, modelKey);
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
    var getModelDataTyped = useCallback(function () {
        var loaded = isLoaded();
        var error = getError();
        return !error && loaded && !isNew() ? getModel() : ARCConfig.defaultModel;
    }, [isLoaded, getError, isNew, getModel, ARCConfig]);
    /**
     * Schedule a delayed fetch for throttling
     * @param options Options for the delayed fetch
     */
    var delayedFetch = useCallback(function (_a) {
        var _b = _a.skipReFetchStep, skipReFetchStep = _b === void 0 ? false : _b;
        delayedTimeoutRef.current = window.setTimeout(function () {
            prepareFetch({ skipReFetchStep: skipReFetchStep });
        }, ARCConfig.requestFetchDelay);
    }, [ARCConfig]); // Note: Will add prepareFetch to dependencies after it's defined
    /**
     * Prepares a fetch with max pending request check
     * @param options Options for preparing the fetch
     */
    var prepareFetch = useCallback(function (_a) {
        var _b = _a.skipReFetchStep, skipReFetchStep = _b === void 0 ? false : _b;
        // Don't trigger a fetch if the component is unmounted
        if (!isMountedRef.current)
            return;
        // For initial fetch on mount, check if we've already done it
        if (!skipReFetchStep && fetchStatus.hasInitialFetch)
            return;
        // If this is the initial fetch, mark it as done
        if (!skipReFetchStep) {
            setFetchStatus(function (prev) { return (__assign(__assign({}, prev), { hasInitialFetch: true })); });
        }
        if (_fetchAuthorization(props, { skipReFetchStep: skipReFetchStep })) {
            var max = ARCConfig.maxPendingRequestsPerReducer;
            if (max && max > -1) {
                var count = getFetchingCount();
                if (count > max) {
                    return delayedFetch({ skipReFetchStep: skipReFetchStep });
                }
            }
            var params = getParams(props);
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
    useCallback(delayedFetch, [prepareFetch, ARCConfig]);
    // Mount effect - run once at component initialization
    useEffect(function () {
        //console.log('ModelContainer mounted with props:', props)
        isMountedRef.current = true;
        // Use a small delay to ensure state stability before initial fetch
        var initTimeout = setTimeout(function () {
            if (isMountedRef.current) {
                prepareFetch({ skipReFetchStep: false });
            }
        }, 0);
        // Cleanup function executed only on real unmount
        return function () {
            //console.log('ModelContainer unmounting - cleanup phase')
            isMountedRef.current = false;
            clearTimeout(initTimeout);
            clearTimeout(delayedTimeoutRef.current);
            // Only abort request if there's actually a fetch in progress
            if (abortControllerRef.current && fetchStatus.inProgress) {
                //console.log('ModelContainer unmounted, aborting ongoing request')
                abortControllerRef.current.abort(commons.cancelRequestPayload({ ARCConfig: ARCConfig }));
                abortControllerRef.current = null;
            }
        };
    }, []); // Empty deps array ensures this runs only on mount/unmount
    // Separate update effect for props changes - avoids restarting the complete lifecycle
    useEffect(function () {
        // Skip for initial render - the first useEffect already handles it
        if (fetchStatus.hasInitialFetch && isMountedRef.current) {
            prepareFetch({ skipReFetchStep: true });
        }
    }, [props, prepareFetch, fetchStatus.hasInitialFetch]);
    return __assign(__assign({}, container), { isNew: isNew, getKey: getKey, getParams: getParams, hasRequiredParams: hasRequiredParams, _getModel: _getModel, fetch: fetch, edit: edit, save: save, remove: remove, getFetchingCount: getFetchingCount, getModel: getModel, getMetas: getMetas, getError: getError, isSyncing: isSyncing, isLoaded: isLoaded, allowReFetch: allowReFetch, errorReFetch: errorReFetch, getModelDataTyped: getModelDataTyped, prepareFetch: prepareFetch });
}
export function ModelContainer(props) {
    var ARCConfig = props.ARCConfig, Component = props.component;
    var dispatch = useDispatch();
    var modelContainer = useModelContainer({
        ARCConfig: ARCConfig,
        props: __assign(__assign({}, props), { dispatch: dispatch })
    });
    var isLoaded = modelContainer.isLoaded, isSyncing = modelContainer.isSyncing, getError = modelContainer.getError, getModelDataTyped = modelContainer.getModelDataTyped, getParams = modelContainer.getParams, fetch = modelContainer.fetch;
    var componentProps = omit(props, ['ARCConfig', 'component']);
    var loaded = isLoaded();
    var loading = isSyncing();
    var error = getError();
    var data = getModelDataTyped();
    if (!Component) {
        console.error('ModelContainer: component prop is required');
        return null;
    }
    var params = getParams(componentProps);
    if (!params) {
        console.error('ModelContainer: params are required');
        return null;
    }
    return (React.createElement(Component, __assign({}, componentProps, { loading: loading, loaded: loaded, model: data, error: error, fetch: function () { return fetch(params); } })));
}
export default ModelContainer;
