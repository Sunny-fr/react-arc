"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.useARC = useARC;
var react_1 = require("react");
var core_1 = require("../actions/core");
var react_redux_1 = require("react-redux");
var ReduxActions_1 = require("../actions/ReduxActions");
var utils_1 = require("../utils");
var commons_1 = __importDefault(require("../commons"));
var selectors_1 = require("./selectors");
function fetchAuthorization(_a) {
    var config = _a.ARCConfig, props = _a.props, reduxContext = _a.reduxContext, _b = _a.options, options = _b === void 0 ? {} : _b;
    var modelKey = core_1.core.getKey(config, props);
    var metaModel = (0, selectors_1.metaModelSelector)(reduxContext === null || reduxContext === void 0 ? void 0 : reduxContext.store.getState(), config, modelKey);
    if (core_1.core.isNew(config, props)) {
        // console.log('//model is new no data to be retrieved')
        return false;
    }
    if (!core_1.core.hasRequiredParams(config, props)) {
        // console.log("// model has not the required params, we don't fetch it")
        return false;
    }
    if (!metaModel) {
        // console.log('//model has never been fetch, its ok to fetch')
        return true;
    }
    //const trueMetaModel = core._getModel(metaModel, reduxContext)
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
function useARC(_a) {
    var initialConfig = _a.ARCConfig, props = _a.props;
    var dispatch = (0, react_redux_1.useDispatch)();
    var reduxContext = (0, react_1.useContext)(react_redux_1.ReactReduxContext);
    var isMountedRef = (0, react_1.useRef)(true);
    var abortControllerRef = (0, react_1.useRef)(null);
    var delayedTimeoutRef = (0, react_1.useRef)(undefined);
    var _b = (0, react_1.useMemo)(function () {
        var _a;
        var config = (0, utils_1.initializeConfig)(initialConfig);
        var actionsList = new ReduxActions_1.ReduxActions({ config: config });
        if ((_a = config.fetchers) === null || _a === void 0 ? void 0 : _a['fetch']) {
            actionsList.standAloneFetchOne = config.fetchers['fetch'];
        }
        return [config, actionsList];
    }, [initialConfig]), config = _b[0], actions = _b[1];
    var modelKey = core_1.core.getKey(config, props);
    var params = core_1.core.getParams(config, props);
    var fetchingCount = (0, react_redux_1.useSelector)(function (state) {
        return (0, selectors_1.fetchingCountSelector)(state, config);
    });
    var metaModel = (0, react_redux_1.useSelector)(function (state) {
        return (0, selectors_1.metaModelSelector)(state, config, modelKey);
    });
    var _fetchAuthorization = (0, react_1.useCallback)(function (props, options) {
        return fetchAuthorization({
            ARCConfig: config,
            props: props,
            options: options,
            reduxContext: reduxContext
        });
    }, [config, metaModel, props]);
    var arcFetch = (0, react_1.useCallback)(function (params) {
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
            if (e.name === ReduxActions_1.AXIOS_CANCEL_PAYLOAD.name && e.code === ReduxActions_1.AXIOS_CANCEL_PAYLOAD.code) {
                return;
            }
            return;
        });
    }, [dispatch, actions, props, abortControllerRef]);
    var delayedFetch = (0, react_1.useCallback)(function (_a) {
        var _b = _a.skipReFetchStep, skipReFetchStep = _b === void 0 ? false : _b;
        delayedTimeoutRef.current = window.setTimeout(function () {
            prepareFetch({ skipReFetchStep: skipReFetchStep });
        }, config.requestFetchDelay);
    }, [config]);
    var prepareFetch = (0, react_1.useCallback)(function (_a) {
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
    (0, react_1.useEffect)(function () {
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
                abortControllerRef.current.abort(commons_1.default.cancelRequestPayload({ ARCConfig: config }));
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
