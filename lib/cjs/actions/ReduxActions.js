"use strict";
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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReduxActions = exports.AXIOS_CANCEL_PAYLOAD = void 0;
var axios_1 = __importDefault(require("axios"));
var utils_1 = require("../utils");
var action_1 = require("../reducers/action");
// Error serializer for better error handling
// prevents mutations
function errorSerializer(error) {
    var _a, _b, _c, _d;
    // axios error
    if (error.isAxiosError) {
        var axiosError = error;
        return {
            message: axiosError.message,
            meta: {
                code: axiosError.code || "UNKNOWN_ERROR",
                message: axiosError.message,
                status: ((_a = axiosError.response) === null || _a === void 0 ? void 0 : _a.status) || 500,
                response: {
                    status: ((_b = axiosError.response) === null || _b === void 0 ? void 0 : _b.status) || 500,
                    statusText: ((_c = axiosError.response) === null || _c === void 0 ? void 0 : _c.statusText) || "Unknown",
                    data: ((_d = axiosError.response) === null || _d === void 0 ? void 0 : _d.data) || {},
                },
            },
        };
    }
    return "Error: ".concat(error.message || "Unknown error");
}
exports.AXIOS_CANCEL_PAYLOAD = {
    code: "ERR_CANCELED",
    name: "CanceledError"
};
var ReduxActions = /** @class */ (function () {
    function ReduxActions(options) {
        var _this = this;
        this.decorate = function (str, options) {
            return (0, utils_1.interpolate)(str, options || _this.config);
        };
        this.config = (0, utils_1.initializeConfig)(options.config);
        this.initialConfig = this.config;
        this.retryConditionFn = this.config.retryConditionFn;
        this.setHeaders();
        this.setupMethods();
        this.axios = axios_1.default.create();
    }
    ReduxActions.GenerateAbortSignal = function (axiosOptions) {
        var _a;
        return (_a = axiosOptions === null || axiosOptions === void 0 ? void 0 : axiosOptions.abortController) === null || _a === void 0 ? void 0 : _a.signal;
    };
    ReduxActions.prototype.getInitialConfig = function () {
        return this.initialConfig;
    };
    ReduxActions.prototype.generateAbortSignal = function (axiosOptions) {
        var _a;
        return (_a = axiosOptions === null || axiosOptions === void 0 ? void 0 : axiosOptions.abortController) === null || _a === void 0 ? void 0 : _a.signal;
    };
    ReduxActions.prototype.decorateHeaders = function (props) {
        if (props === void 0) { props = {}; }
        var headers = this.headers;
        if (Object.keys(headers || {}).length < 1) {
            return {};
        }
        return Object.keys(headers).reduce(function (state, header) {
            var _a;
            if (!headers[header])
                return state;
            return __assign(__assign({}, state), (_a = {}, _a[header] = (0, utils_1.interpolate)(headers[header], props), _a));
        }, {});
    };
    ReduxActions.prototype.setHeaders = function () {
        var headers = this.config.headers || {};
        this.headers = __assign({}, headers);
    };
    ReduxActions.prototype.updateConfig = function (config) {
        this.config = __assign(__assign({}, this.config), config);
        this.setHeaders();
        this.setupMethods();
    };
    ReduxActions.prototype.setupMethods = function () {
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
    ReduxActions.prototype.beforeFetch = function (_a) {
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
    ReduxActions.prototype.edit = function (data, params) {
        var _this = this;
        return function (dispatch) {
            dispatch({
                type: _this.decorate(action_1.ACTIONS.EDIT),
                payload: { data: data, params: params },
            });
        };
    };
    /** SINGLE ITEM **/
    ReduxActions.prototype.standAloneFetchOne = function (_params, config, _props, axiosOptions) {
        return this.axios({
            // methods are already lowercased in setupMethods
            method: config.methods.read,
            url: config.paths.item,
            headers: config.headers,
            signal: this.generateAbortSignal(axiosOptions),
        });
    };
    ReduxActions.prototype.fetchOne = function (params, props, axiosOptions) {
        var _this = this;
        if (props === void 0) { props = {}; }
        return function (dispatch) {
            var retryConditionFn = _this.retryConditionFn || (axiosOptions === null || axiosOptions === void 0 ? void 0 : axiosOptions.retryConditionFn);
            var config = _this.beforeFetch({ config: _this.config, params: params, props: props });
            var maxTries = _this.config.maxTries || 1;
            var applyRequest = function (tryNumber) {
                if (tryNumber === void 0) { tryNumber = 1; }
                //(!!axiosOptions ? axiosOptions.retryConditionFn : undefined)
                var actionType = _this.decorate(action_1.ACTIONS.FETCH);
                dispatch({
                    type: actionType,
                    payload: {
                        params: params,
                        tries: tryNumber,
                    },
                });
                return _this.standAloneFetchOne(params, config, props, axiosOptions)
                    .then(function (response) {
                    dispatch({
                        type: _this.decorate(action_1.ACTIONS.FETCH_FULFILLED),
                        payload: { data: response.data, params: params },
                    });
                    return Promise.resolve(response);
                })
                    .catch(function (error) {
                    if (error && error.code === exports.AXIOS_CANCEL_PAYLOAD.code && error.name === exports.AXIOS_CANCEL_PAYLOAD.name) {
                        dispatch({
                            type: _this.decorate(action_1.ACTIONS.FETCH_CANCELLED),
                            payload: {
                                error: errorSerializer(error),
                                params: params
                            },
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
                        type: _this.decorate(action_1.ACTIONS.FETCH_REJECTED),
                        payload: {
                            error: errorSerializer(error),
                            params: params
                        },
                    });
                    return Promise.reject(error);
                });
            };
            return applyRequest();
        };
    };
    /**  SAVE **/
    ReduxActions.prototype.standAloneSave = function (data, params, create, config, _props) {
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
    ReduxActions.prototype.save = function (data, params, create, props) {
        var _this = this;
        if (create === void 0) { create = false; }
        if (props === void 0) { props = {}; }
        return function (dispatch) {
            var config = _this.beforeFetch({ config: _this.config, params: params, props: props });
            dispatch({
                type: _this.decorate(action_1.ACTIONS.SAVE),
                payload: { data: data, params: params, create: create },
            });
            return _this.standAloneSave(data, params, create, config, props)
                .then(function (response) {
                dispatch({
                    type: _this.decorate(action_1.ACTIONS.SAVE_FULFILLED),
                    payload: { params: params, data: response.data, create: create },
                });
                return Promise.resolve(response);
            })
                .catch(function (error) {
                dispatch({
                    type: _this.decorate(action_1.ACTIONS.SAVE_REJECTED),
                    payload: {
                        error: errorSerializer(error),
                        data: data,
                        params: params,
                        create: create
                    },
                });
                return Promise.reject(error);
            });
        };
    };
    /** REMOVE **/
    ReduxActions.prototype.standAloneRemove = function (_params, config, _props) {
        var url = config.paths.item;
        return this.axios({
            // @ts-ignore
            method: config.methods.delete,
            url: url,
            headers: config.headers,
        });
    };
    ReduxActions.prototype.remove = function (params, props) {
        var _this = this;
        if (props === void 0) { props = {}; }
        return function (dispatch) {
            var config = _this.beforeFetch({ config: _this.config, params: params, props: props });
            dispatch({
                type: _this.decorate(action_1.ACTIONS.DELETE),
                payload: { params: params },
            });
            return _this.standAloneRemove(params, config, props)
                .then(function (response) {
                dispatch({
                    type: _this.decorate(action_1.ACTIONS.DELETE_FULFILLED),
                    payload: { params: params, data: response.data },
                });
                return Promise.resolve(response);
            })
                .catch(function (error) {
                dispatch({
                    type: _this.decorate(action_1.ACTIONS.DELETE_REJECTED),
                    payload: {
                        error: errorSerializer(error),
                        params: params
                    },
                });
                return Promise.reject(error);
            });
        };
    };
    ReduxActions.prototype.resetTemp = function () {
        var _this = this;
        return function (dispatch) {
            dispatch({ type: _this.decorate(action_1.ACTIONS.RESET) });
        };
    };
    return ReduxActions;
}());
exports.ReduxActions = ReduxActions;
