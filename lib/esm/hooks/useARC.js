import { useCallback, useEffect, useMemo, useRef } from "react";
import { core } from "../actions/core";
import { useDispatch, useSelector } from "react-redux";
import { AXIOS_CANCEL_PAYLOAD, ReduxActions } from "../actions/ReduxActions";
import { initializeConfig } from "../utils";
import commons from "../commons";
import { fetchingCountSelector, metaModelSelector } from "./selectors";
function fetchAuthorization(_a) {
    var config = _a.ARCConfig, metaModel = _a.metaModel, props = _a.props, _b = _a.options, options = _b === void 0 ? {} : _b;
    if (core.isNew(config, props)) {
        // console.log('//model is new no data to be retrieved')
        return false;
    }
    if (!core.hasRequiredParams(config, props)) {
        // console.log("// model has not the required params, we don't fetch it")
        return false;
    }
    if (!metaModel) {
        // console.log('//model has never been fetch, its ok to fetch')
        return true;
    }
    if (metaModel.metas.fetching) {
        // console.log('//model seems to be loading we dont allow to fetch it again')
        return false;
    }
    if (!(options === null || options === void 0 ? void 0 : options.skipReFetchStep) &&
        metaModel.metas.loaded &&
        (!(config.fetchOnce && metaModel.metas.loaded))) {
        // console.log('//model seems to be loaded but its ok to re-fetch it')
        return true;
    }
    if (!(options === null || options === void 0 ? void 0 : options.skipReFetchStep) &&
        !!metaModel.metas.error &&
        (config.refetchOnError === true &&
            !metaModel.metas.fetching &&
            !metaModel.metas.loaded &&
            !!metaModel.metas.error)) {
        // console.log('//model had an error previously, but its ok to refetch it')
        return true;
    }
    return false;
}
export function useARC(_a) {
    var initialConfig = _a.ARCConfig, props = _a.props;
    var dispatch = useDispatch();
    var isMountedRef = useRef(true);
    var abortControllerRef = useRef(null);
    var delayedTimeoutRef = useRef(undefined);
    var _b = useMemo(function () {
        var _a;
        var config = initializeConfig(initialConfig);
        var actionsList = new ReduxActions({ config: config });
        if ((_a = config.fetchers) === null || _a === void 0 ? void 0 : _a['fetch']) {
            actionsList.standAloneFetchOne = config.fetchers['fetch'];
        }
        return [config, actionsList];
    }, [initialConfig]), config = _b[0], actions = _b[1];
    var modelKey = core.getKey(config, props);
    var params = core.getParams(config, props);
    var fetchingCount = useSelector(function (state) {
        return fetchingCountSelector(state, config);
    });
    var metaModel = useSelector(function (state) {
        return metaModelSelector(state, config, modelKey);
    });
    var _fetchAuthorization = useCallback(function (props, options) {
        return fetchAuthorization({
            ARCConfig: config,
            metaModel: metaModel,
            props: props,
            options: options,
        });
    }, [config, metaModel, props]);
    var arcFetch = useCallback(function (params) {
        // Don't fetch if the component is unmounted
        if (!isMountedRef.current) {
            return Promise.resolve();
        }
        // Create new AbortController only if needed
        if (!abortControllerRef.current) {
            abortControllerRef.current = new AbortController();
        }
        // Mark fetch as in progress
        // setFetchStatus(prev => ({ ...prev, inProgress: true }))
        var axiosOptions = {
            abortController: abortControllerRef.current
        };
        // Use then/catch instead of finally for better compatibility
        return dispatch(actions.fetchOne(params, props, axiosOptions))
            .then(function (result) {
            // Once request is complete successfully, update status
            // if (isMountedRef.current) {
            //   setFetchStatus(prev => ({ ...prev, inProgress: false }))
            // }
            return result;
        })
            .catch(function (e) {
            // Once request fails, update status
            // if (isMountedRef.current) {
            //   setFetchStatus(prev => ({ ...prev, inProgress: false }))
            // }
            if (e.name === AXIOS_CANCEL_PAYLOAD.name && e.code === AXIOS_CANCEL_PAYLOAD.code) {
                return;
            }
            return;
        });
    }, [dispatch, actions, props, abortControllerRef]);
    var delayedFetch = useCallback(function (_a) {
        var _b = _a.skipReFetchStep, skipReFetchStep = _b === void 0 ? false : _b;
        delayedTimeoutRef.current = window.setTimeout(function () {
            prepareFetch({ skipReFetchStep: skipReFetchStep });
        }, config.requestFetchDelay);
    }, [config]);
    var prepareFetch = useCallback(function (_a) {
        var _b = _a.skipReFetchStep, skipReFetchStep = _b === void 0 ? false : _b;
        // Don't trigger a fetch if the component is unmounted
        if (!isMountedRef.current)
            return;
        // For initial fetch on mount, check if we've already done it
        // if (!skipReFetchStep && fetchStatus.hasInitialFetch) return
        // If this is the initial fetch, mark it as done
        // if (!skipReFetchStep) {
        //   setFetchStatus(prev => ({ ...prev, hasInitialFetch: true }))
        // }
        var authorized = _fetchAuthorization(props, {
            skipReFetchStep: skipReFetchStep,
        });
        if (authorized) {
            var max = config.maxPendingRequestsPerReducer;
            if (max && max > -1) {
                var count = fetchingCount;
                if (count > max) {
                    return delayedFetch({ skipReFetchStep: skipReFetchStep });
                }
            }
            if (!params) {
                console.error('Fetch params are missing');
                return;
            }
            arcFetch(params);
        }
    }, [
        arcFetch,
        params
    ]);
    useEffect(function () {
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
            if (abortControllerRef.current /*&& fetchStatus.inProgress*/) {
                //console.log('ModelContainer unmounted, aborting ongoing request')
                abortControllerRef.current.abort(commons.cancelRequestPayload({ ARCConfig: config }));
                abortControllerRef.current = null;
            }
        };
    }, []);
    //
    // const arcMethods: UseARCMethods<Model> = {
    //   arc,
    //   get: (args: {
    //     props?: ComponentProps
    //     params: ComponentPropsWithRequiredModelParams
    //   }) => {
    //     const {props = {}, params = {}} = args
    //     return handle(() => arc.get({props: props || defaultProps, params}))
    //   },
    //   remove: (args: {
    //     props?: ComponentProps
    //     params: ComponentPropsWithRequiredModelParams
    //   }) => {
    //     const {props, params} = args
    //     return handle(() =>
    //       arc.remove({props: props || defaultProps, params})
    //     )
    //   },
    //   create: (args: {
    //     props?: ComponentProps
    //     params: ComponentPropsWithRequiredModelParams
    //     body: any
    //   }) => {
    //     const {props, params, body} = args
    //     return handle(() =>
    //       arc.create({props: props || defaultProps, params, body})
    //     )
    //   },
    //   update: (args: {
    //     props?: ComponentProps
    //     params: ComponentPropsWithRequiredModelParams
    //     body: any
    //   }) => {
    //     const {props, params, body} = args
    //     return handle(() =>
    //       arc.update({props: props || defaultProps, params, body})
    //     )
    //   },
    //   extract: (props: ComponentProps) =>
    //     arc.extractParams(props || defaultProps),
    //   extractParams: (props: ComponentProps) =>
    //     arc.extractParams(props || defaultProps),
    //   custom: (fetcher: () => Promise<ARCResponse<Model>>) => {
    //     return handle(fetcher)
    //   },
    // }
    return {
        //data: metaModel?.model,
        data: (metaModel === null || metaModel === void 0 ? void 0 : metaModel.model) || null,
        error: (metaModel === null || metaModel === void 0 ? void 0 : metaModel.metas.error) || null,
        loaded: (metaModel === null || metaModel === void 0 ? void 0 : metaModel.metas.loaded) || false,
        loading: (metaModel === null || metaModel === void 0 ? void 0 : metaModel.metas.fetching) || false,
        ARCConfig: config,
        // error: state.error,
        // loading: state.loading,
        // loaded: state.loaded,
        // response: state.response,
        // arc: arcMethods,
    };
}
