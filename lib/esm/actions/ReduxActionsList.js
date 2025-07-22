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
import axios from "axios";
import { getDefaultConfig, interpolate } from "../utils";
//type Actions = any //{ type: 'FOO' } | { type: 'BAR'; result: number };
//type ThunkResult<R> = ThunkAction<R, ARCStoreState, undefined, Actions>
var ERRORS = {
    CANCEL_HTTP_REQUEST: "ARC:Cancel",
};
var ReduxActionsList = /** @class */ (function () {
    function ReduxActionsList(options) {
        var _this = this;
        this.decorate = function (str, options) {
            return interpolate(str, options || _this.config);
        };
        this.config = __assign(__assign({}, getDefaultConfig()), (options.config || {}));
        this.initialConfig = this.config;
        this.retryConditionFn = this.config.retryConditionFn;
        this.setHeaders();
        this.setupMethods();
        this.axios = axios.create();
    }
    ReduxActionsList.GenerateAbortSignal = function (axiosOptions) {
        var _a;
        return (_a = axiosOptions === null || axiosOptions === void 0 ? void 0 : axiosOptions.abortController) === null || _a === void 0 ? void 0 : _a.signal;
    };
    ReduxActionsList.prototype.getInitialConfig = function () {
        return this.initialConfig;
    };
    ReduxActionsList.prototype.generateAbortSignal = function (axiosOptions) {
        var _a;
        return (_a = axiosOptions === null || axiosOptions === void 0 ? void 0 : axiosOptions.abortController) === null || _a === void 0 ? void 0 : _a.signal;
    };
    ReduxActionsList.prototype.decorateHeaders = function (props) {
        if (props === void 0) { props = {}; }
        var headers = this.headers;
        if (Object.keys(headers || {}).length < 1) {
            return {};
        }
        return Object.keys(headers).reduce(function (state, header) {
            var _a;
            if (!headers[header])
                return state;
            return __assign(__assign({}, state), (_a = {}, _a[header] = interpolate(headers[header], props), _a));
        }, {});
    };
    ReduxActionsList.prototype.setHeaders = function () {
        var headers = this.config.headers || {};
        this.headers = __assign({}, headers);
    };
    ReduxActionsList.prototype.updateConfig = function (config) {
        this.config = __assign(__assign({}, this.config), config);
        this.setHeaders();
        this.setupMethods();
    };
    ReduxActionsList.prototype.setupMethods = function () {
        var methods = this.config.methods;
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
    };
    ReduxActionsList.prototype.beforeFetch = function (_a) {
        var _this = this;
        var config = _a.config, _b = _a.props, props = _b === void 0 ? {} : _b, params = _a.params;
        var paths = {
            item: "",
        };
        //DECORATE URLS
        return __assign(__assign({}, config), { headers: this.decorateHeaders(__assign(__assign({}, props), params)), paths: Object.keys(config.paths).reduce(function (s, path) {
                var _a;
                var _path = config.paths[path];
                if (!_path) {
                    throw new Error("Path ".concat(path, " in your ARCConfig  is not defined in config"));
                }
                var value = _this.decorate(_path, params);
                return __assign(__assign({}, s), (_a = {}, _a[path] = value, _a));
            }, paths) });
    };
    /** EDITING **/
    ReduxActionsList.prototype.edit = function (data, params) {
        var _this = this;
        return function (dispatch) {
            dispatch({
                type: _this.decorate("EDIT_{uppercaseName}"),
                payload: { data: data, params: params },
            });
        };
    };
    /** SINGLE ITEM **/
    ReduxActionsList.prototype.standAloneFetchOne = function (_params, config, _props, axiosOptions) {
        return this.axios({
            // methods are already lowercased in setupMethods
            method: config.methods.read,
            url: config.paths.item,
            headers: config.headers,
            signal: this.generateAbortSignal(axiosOptions),
        });
    };
    ReduxActionsList.prototype.fetchOne = function (params, props, axiosOptions) {
        var _this = this;
        if (props === void 0) { props = {}; }
        return function (dispatch) {
            var retryConditionFn = _this.retryConditionFn || (axiosOptions === null || axiosOptions === void 0 ? void 0 : axiosOptions.retryConditionFn);
            var config = _this.beforeFetch({ config: _this.config, params: params, props: props });
            var maxTries = _this.config.maxTries || 1;
            var applyRequest = function (tryNumber) {
                if (tryNumber === void 0) { tryNumber = 1; }
                //(!!axiosOptions ? axiosOptions.retryConditionFn : undefined)
                dispatch({
                    type: _this.decorate("FETCH_{uppercaseName}"),
                    payload: {
                        params: params,
                        tries: tryNumber,
                    },
                });
                return _this.standAloneFetchOne(params, config, props, axiosOptions)
                    .then(function (response) {
                    dispatch({
                        type: _this.decorate("FETCH_{uppercaseName}_FULFILLED"),
                        payload: { data: response.data, params: params },
                    });
                    return Promise.resolve(response);
                })
                    .catch(function (error) {
                    if (error && error.type === ERRORS.CANCEL_HTTP_REQUEST) {
                        dispatch({
                            type: _this.decorate("FETCH_{uppercaseName}_CANCELLED"),
                            payload: { error: error, params: params },
                        });
                        return Promise.reject(error);
                    }
                    if (typeof retryConditionFn === "function" &&
                        retryConditionFn(error, {
                            params: params,
                            config: config,
                            props: props,
                            axiosOptions: axiosOptions,
                            tryNumber: tryNumber,
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
                        type: _this.decorate("FETCH_{uppercaseName}_REJECTED"),
                        payload: { error: error, params: params },
                    });
                    return Promise.reject(error);
                });
            };
            return applyRequest();
        };
    };
    /**  SAVE **/
    ReduxActionsList.prototype.standAloneSave = function (data, params, create, config, _props) {
        // @ts-ignore
        var method = create ? config.methods.create : config.methods.update;
        var url = this.decorate(this.config.paths.item, method === "post" ? {} : params);
        return this.axios({
            method: method,
            url: url,
            headers: config.headers,
            data: data,
        });
    };
    ReduxActionsList.prototype.save = function (data, params, create, props) {
        var _this = this;
        if (create === void 0) { create = false; }
        if (props === void 0) { props = {}; }
        return function (dispatch) {
            var config = _this.beforeFetch({ config: _this.config, params: params, props: props });
            dispatch({
                type: _this.decorate("SAVE_{uppercaseName}"),
                payload: { data: data, params: params, create: create },
            });
            return _this.standAloneSave(data, params, create, config, props)
                .then(function (response) {
                dispatch({
                    type: _this.decorate("SAVE_{uppercaseName}_FULFILLED"),
                    payload: { params: params, data: response.data, create: create },
                });
                return Promise.resolve(response);
            })
                .catch(function (error) {
                dispatch({
                    type: _this.decorate("SAVE_{uppercaseName}_REJECTED"),
                    payload: { error: error, data: data, params: params, create: create },
                });
                return Promise.reject(error);
            });
        };
    };
    /** REMOVE **/
    ReduxActionsList.prototype.standAloneRemove = function (_params, config, _props) {
        var url = config.paths.item;
        return this.axios({
            // @ts-ignore
            method: config.methods.delete,
            url: url,
            headers: config.headers,
        });
    };
    ReduxActionsList.prototype.remove = function (params, props) {
        var _this = this;
        if (props === void 0) { props = {}; }
        return function (dispatch) {
            var config = _this.beforeFetch({ config: _this.config, params: params, props: props });
            dispatch({
                type: _this.decorate("DELETE_{uppercaseName}"),
                payload: { params: params },
            });
            return _this.standAloneRemove(params, config, props)
                .then(function (response) {
                dispatch({
                    type: _this.decorate("DELETE_{uppercaseName}_FULFILLED"),
                    payload: { params: params, data: response.data },
                });
                return Promise.resolve(response);
            })
                .catch(function (error) {
                dispatch({
                    type: _this.decorate("DELETE_{uppercaseName}_REJECTED"),
                    payload: { error: error, params: params },
                });
                return Promise.reject(error);
            });
        };
    };
    /**
     * LISTS
     * to be deprecated
     * **/
    ReduxActionsList.prototype.standAloneFetchAll = function (_params, config, _props, axiosOptions) {
        var url = config.paths.collection;
        return this.axios({
            method: config.methods.read,
            url: url,
            headers: config.headers,
            signal: this.generateAbortSignal(axiosOptions),
        });
    };
    ReduxActionsList.prototype.fetchAll = function (params, props, axiosOptions) {
        var _this = this;
        if (props === void 0) { props = {}; }
        return function (dispatch) {
            dispatch({
                type: _this.decorate("FETCH_{uppercaseName}S"),
                payload: { params: params },
            });
            var config = _this.beforeFetch({ config: _this.config, params: params, props: props });
            return _this.standAloneFetchAll(params, config, props, axiosOptions)
                .then(function (response) {
                dispatch({
                    type: _this.decorate("FETCH_{uppercaseName}S_FULFILLED"),
                    payload: { data: response.data },
                });
                return Promise.resolve(response);
            })
                .catch(function (error) {
                if (error && error.type === ERRORS.CANCEL_HTTP_REQUEST) {
                    dispatch({
                        type: _this.decorate("FETCH_{uppercaseName}S_CANCELLED"),
                        payload: { error: error, params: params },
                    });
                    return Promise.reject(error);
                }
                dispatch({
                    type: _this.decorate("FETCH_{uppercaseName}S_REJECTED"),
                    payload: { error: error, params: params },
                });
                return Promise.reject(error);
            });
        };
    };
    ReduxActionsList.prototype.reset = function () {
        var _this = this;
        return function (dispatch) {
            dispatch({ type: _this.decorate("RESET_{uppercaseName}S") });
            return;
        };
    };
    ReduxActionsList.prototype.resetTemp = function () {
        var _this = this;
        return function (dispatch) {
            dispatch({ type: _this.decorate("RESET_{uppercaseName}_TEMP") });
        };
    };
    return ReduxActionsList;
}());
export { ReduxActionsList };
