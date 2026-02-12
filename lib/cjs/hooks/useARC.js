"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.useARC = useARC;
const react_1 = require("react");
const core_1 = require("../actions/core");
const react_redux_1 = require("react-redux");
const ReduxActions_1 = require("../actions/ReduxActions");
const utils_1 = require("../utils");
const commons_1 = __importDefault(require("../commons"));
const selectors_1 = require("./selectors");
function fetchAuthorization({ ARCConfig: config, props, reduxContext, options = {} }) {
    const modelKey = core_1.core.getKey(config, props);
    const metaModel = (0, selectors_1.metaModelSelector)(reduxContext?.store.getState(), config.name, modelKey);
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
    if (!options?.skipReFetchStep &&
        metaModel.metas.loaded &&
        (!(config.fetchOnce && metaModel.metas.loaded))) {
        // console.log('//model seems to be loaded but its ok to re-fetch it')
        return true;
    }
    if (!options?.skipReFetchStep &&
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
function useARC({ ARCConfig: initialConfig, props, selectors = [] }) {
    const dispatch = (0, react_redux_1.useDispatch)();
    const reduxContext = (0, react_1.useContext)(react_redux_1.ReactReduxContext);
    const isMountedRef = (0, react_1.useRef)(true);
    const abortControllerRef = (0, react_1.useRef)(null);
    const delayedTimeoutRef = (0, react_1.useRef)(undefined);
    const extraPropsFromSelectors = (0, react_1.useMemo)(() => {
        return selectors.reduce((acc, selector) => {
            const selectedProps = selector(reduxContext?.store.getState() || {}, props);
            return { ...acc, ...selectedProps };
        }, {});
    }, [reduxContext, props, selectors]);
    const [config, actions] = (0, react_1.useMemo)(() => {
        const config = (0, utils_1.initializeConfig)(initialConfig);
        const reduxActions = new ReduxActions_1.ReduxActions({ config });
        if (config.fetchers?.fetch) {
            reduxActions.standAloneFetchOne = config.fetchers?.fetch;
        }
        return [config, reduxActions];
    }, [initialConfig]);
    const modelKey = core_1.core.getKey(config, props);
    const computedParams = core_1.core.getParams(config, props);
    const fetchingCount = (0, react_redux_1.useSelector)((state) => {
        if (!state[config.name] || !state[config.name].collection) {
            return 0;
        }
        return Object.values(state[config.name].collection).filter((metaModel) => metaModel.metas.fetching).length;
    });
    const metaModel = (0, react_redux_1.useSelector)((state) => {
        return (0, selectors_1.metaModelSelector)(state, config.name, modelKey);
    });
    const _fetchAuthorization = (0, react_1.useCallback)((props, options) => {
        return fetchAuthorization({
            ARCConfig: config,
            props,
            options: options,
            reduxContext
        });
    }, 
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [config, metaModel, props]);
    const arcFetch = (0, react_1.useCallback)((params) => {
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
        const axiosOptions = {
            abortController: abortControllerRef.current
        };
        const extendedProps = {
            ...props,
            ...extraPropsFromSelectors,
        };
        // Use then/catch instead of finally for better compatibility
        return dispatch(actions.fetchOne(params, extendedProps, axiosOptions))
            .then((result) => {
            // Once request is complete successfully, update status
            // if (isMountedRef.current) {
            //   setFetchStatus(prev => ({ ...prev, inProgress: false }))
            // }
            return result;
        })
            .catch((e) => {
            // Once request fails, update status
            // if (isMountedRef.current) {
            //   setFetchStatus(prev => ({ ...prev, inProgress: false }))
            // }
            if (e.name === ReduxActions_1.AXIOS_CANCEL_PAYLOAD.name && e.code === ReduxActions_1.AXIOS_CANCEL_PAYLOAD.code) {
                return;
            }
            return;
        });
    }, [dispatch, actions, props, abortControllerRef, extraPropsFromSelectors]);
    const delayedFetch = (0, react_1.useCallback)(({ skipReFetchStep = false }) => {
        delayedTimeoutRef.current = window.setTimeout(() => {
            prepareFetch({ skipReFetchStep });
        }, config.requestFetchDelay);
    }, 
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [config]);
    const prepareFetch = (0, react_1.useCallback)(({ skipReFetchStep = false }) => {
        // Don't trigger a fetch if the component is unmounted
        if (!isMountedRef.current)
            return;
        // For initial fetch on mount, check if we've already done it
        // if (!skipReFetchStep && fetchStatus.hasInitialFetch) return
        // If this is the initial fetch, mark it as done
        // if (!skipReFetchStep) {
        //   setFetchStatus(prev => ({ ...prev, hasInitialFetch: true }))
        // }
        const authorized = _fetchAuthorization(props, {
            skipReFetchStep,
        });
        if (authorized) {
            const max = config.maxPendingRequestsPerReducer;
            if (max && max > -1) {
                if (fetchingCount > max) {
                    return delayedFetch({ skipReFetchStep });
                }
            }
            if (!computedParams) {
                console.error('Fetch params are missing');
                return;
            }
            arcFetch(computedParams);
        }
    }, 
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [arcFetch, computedParams]);
    (0, react_1.useEffect)(() => {
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
            if (abortControllerRef.current /*&& fetchStatus.inProgress*/) {
                abortControllerRef.current.abort(commons_1.default.cancelRequestPayload({ ARCConfig: config }));
                abortControllerRef.current = null;
            }
        };
    }, 
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []);
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
    const fetchHandler = ({ params } = {}) => {
        if (typeof params !== 'undefined') {
            return arcFetch(params);
        }
        return arcFetch(computedParams || config.defaultProps);
    };
    return {
        //data: metaModel?.model,
        data: metaModel?.model || null,
        error: metaModel?.metas.error || null,
        loaded: metaModel?.metas.loaded || false,
        loading: metaModel?.metas.fetching || false,
        ARCConfig: config,
        fetch: fetchHandler
        // error: state.error,
        // loading: state.loading,
        // loaded: state.loaded,
        // response: state.response,
        // arc: arcMethods,
    };
}
