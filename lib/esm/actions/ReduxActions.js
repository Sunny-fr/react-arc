import axios from "axios";
import { initializeConfig, interpolate } from "../utils";
import { ACTIONS } from "../reducers/action";
// Error serializer for better error handling
// prevents mutations
function errorSerializer(error) {
    // axios error
    if (error.isAxiosError) {
        const axiosError = error;
        return {
            message: axiosError.message,
            meta: {
                code: axiosError.code || "UNKNOWN_ERROR",
                message: axiosError.message,
                status: axiosError.response?.status || 500,
                response: {
                    status: axiosError.response?.status || 500,
                    statusText: axiosError.response?.statusText || "Unknown",
                    data: axiosError.response?.data || {},
                },
            },
        };
    }
    return `Error: ${error.message || "Unknown error"}`;
}
export const AXIOS_CANCEL_PAYLOAD = {
    code: "ERR_CANCELED",
    name: "CanceledError"
};
export class ReduxActions {
    config;
    initialConfig;
    retryConditionFn;
    axios;
    headers;
    methods;
    constructor(options) {
        this.config = initializeConfig(options.config);
        this.initialConfig = this.config;
        this.retryConditionFn = this.config.retryConditionFn;
        this.setHeaders();
        this.setupMethods();
        this.axios = axios.create();
    }
    static GenerateAbortSignal(axiosOptions) {
        return axiosOptions?.abortController?.signal;
    }
    getInitialConfig() {
        return this.initialConfig;
    }
    generateAbortSignal(axiosOptions) {
        return axiosOptions?.abortController?.signal;
    }
    decorateHeaders(props = {}) {
        const { headers } = this;
        if (Object.keys(headers || {}).length < 1) {
            return {};
        }
        return Object.keys(headers).reduce((state, header) => {
            if (!headers[header])
                return state;
            return {
                ...state,
                [header]: interpolate(headers[header], props),
            };
        }, {});
    }
    setHeaders() {
        const headers = this.config.headers || {};
        this.headers = { ...headers };
    }
    updateConfig(config) {
        this.config = { ...this.config, ...config };
        this.setHeaders();
        this.setupMethods();
    }
    setupMethods() {
        const { methods } = this.config;
        this.methods = {
            // @ts-ignore Default methods are already extended
            create: methods.create.toLowerCase(),
            // @ts-ignore Default methods are already extended
            read: methods.read.toLowerCase(),
            // @ts-ignore Default methods are already extended
            update: methods.update.toLowerCase(),
            // @ts-ignore Default methods are already extended
            delete: methods.delete.toLowerCase(),
        };
    }
    decorate = (str) => {
        return interpolate(str, { ...this.config, actionNamespace: this.config.name.toUpperCase() });
    };
    beforeFetch({ config, props = {}, params, }) {
        const paths = {
            item: "",
        };
        //DECORATE URLS
        return {
            ...config,
            headers: this.decorateHeaders({ ...props, ...params }),
            paths: Object.keys(config.paths).reduce((s, path) => {
                const _path = config.paths[path];
                if (!_path) {
                    throw new Error(`Path ${path} in your ARCConfig  is not defined in config`);
                }
                const value = this.decorate(_path);
                return {
                    ...s,
                    [path]: value,
                };
            }, paths),
        };
    }
    /** EDITING **/
    edit(data, params) {
        return (dispatch) => {
            dispatch({
                type: this.decorate(ACTIONS.EDIT),
                payload: { data, params },
            });
        };
    }
    /** SINGLE ITEM **/
    standAloneFetchOne(_params, config, _props, axiosOptions) {
        return this.axios({
            // methods are already lowercased in setupMethods
            method: config.methods.read,
            url: config.paths.item,
            headers: config.headers,
            signal: this.generateAbortSignal(axiosOptions),
        });
    }
    fetchOne(params, props = {}, axiosOptions) {
        return (dispatch) => {
            const retryConditionFn = this.retryConditionFn || axiosOptions?.retryConditionFn;
            const config = this.beforeFetch({ config: this.config, params, props });
            const maxTries = this.config.maxTries || 1;
            const applyRequest = (tryNumber = 1) => {
                //(!!axiosOptions ? axiosOptions.retryConditionFn : undefined)
                const actionType = this.decorate(ACTIONS.FETCH);
                dispatch({
                    type: actionType,
                    payload: {
                        params,
                        tries: tryNumber,
                    },
                });
                return this.standAloneFetchOne(params, config, props, axiosOptions)
                    .then((response) => {
                    dispatch({
                        type: this.decorate(ACTIONS.FETCH_FULFILLED),
                        payload: { data: response.data, params },
                    });
                    return Promise.resolve(response);
                })
                    .catch((error) => {
                    if (error && error.code === AXIOS_CANCEL_PAYLOAD.code && error.name === AXIOS_CANCEL_PAYLOAD.name) {
                        dispatch({
                            type: this.decorate(ACTIONS.FETCH_CANCELLED),
                            payload: {
                                error: errorSerializer(error),
                                params
                            },
                        });
                        return Promise.reject(error);
                    }
                    if (typeof retryConditionFn === "function" &&
                        retryConditionFn(error, {
                            params,
                            config,
                            props,
                            axiosOptions,
                            tryNumber,
                        })) {
                        //console.log(`retry #${tryNumber}`)
                        return applyRequest(tryNumber + 1);
                    }
                    if (typeof retryConditionFn !== "function" &&
                        tryNumber < maxTries) {
                        //console.log(`retry #${tryNumber}`)
                        return applyRequest(tryNumber + 1);
                    }
                    dispatch({
                        type: this.decorate(ACTIONS.FETCH_REJECTED),
                        payload: {
                            error: errorSerializer(error),
                            params
                        },
                    });
                    return Promise.reject(error);
                });
            };
            return applyRequest();
        };
    }
}
