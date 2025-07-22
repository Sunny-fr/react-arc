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
Object.defineProperty(exports, "__esModule", { value: true });
exports.mixerStore = void 0;
var utils_1 = require("../utils");
var time = function () {
    return new Date().getTime();
};
var ACTIONS_MAPPER = {
    //DEPRECATED
    COLLECTION_RESET: "RESET_{uppercaseName}S",
    COLLECTION_FETCH: "FETCH_{uppercaseName}S",
    COLLECTION_FETCH_FULFILLED: "FETCH_{uppercaseName}S_FULFILLED",
    COLLECTION_FETCH_CANCELLED: "FETCH_{uppercaseName}S_CANCELLED",
    COLLECTION_FETCH_REJECTED: "FETCH_{uppercaseName}S_REJECTED",
    //END DEPRECATED
    INIT: "INIT_{uppercaseName}",
    FETCH: "FETCH_{uppercaseName}",
    FETCH_REJECTED: "FETCH_{uppercaseName}_REJECTED",
    FETCH_CANCELLED: "FETCH_{uppercaseName}_CANCELLED",
    FETCH_FULFILLED: "FETCH_{uppercaseName}_FULFILLED",
    RESET: "RESET_{uppercaseName}_TEMP",
    EDIT: "EDIT_{uppercaseName}",
    SAVE: "SAVE_{uppercaseName}",
    SAVE_REJECTED: "SAVE_{uppercaseName}_REJECTED",
    SAVE_FULFILLED: "SAVE_{uppercaseName}_FULFILLED",
    DELETE: "DELETE_{uppercaseName}",
    DELETE_REJECTED: "DELETE_{uppercaseName}_REJECTED",
    DELETE_FULFILLED: "DELETE_{uppercaseName}_FULFILLED",
};
function mixerStore(options) {
    var config = (options === null || options === void 0 ? void 0 : options.config) || {};
    var extendedConfig = __assign(__assign({}, (0, utils_1.getDefaultConfig)()), config);
    var defaultModelObject = JSON.parse(JSON.stringify(extendedConfig.defaultModel));
    /* REDUCER STRUCTURE */
    /** @type {ARCMetaModel} **/
    var defaultMetaModel = {
        metas: {
            loaded: false,
            fetching: false,
            fetchRequested: false,
            valid: false,
            saving: false,
            deleting: false,
            saved: false,
            tries: 0,
            start: 0,
            end: 0,
        },
        model: __assign({}, defaultModelObject),
    };
    var defaultState = {
        collection: {},
        temp: {
            metas: __assign({}, defaultMetaModel.metas),
            model: __assign({}, defaultMetaModel.model),
        },
        fetching: false,
        loaded: false,
        error: null,
    };
    function mapModels(list) {
        var collectionMap = {};
        return list.reduce(function (prev, current) {
            var tempKey = (0, utils_1.interpolate)(null, (0, utils_1.getParams)(extendedConfig, current));
            var key = tempKey || JSON.stringify(current);
            prev[key] = Object.assign({}, defaultMetaModel, {
                model: current,
                metas: __assign(__assign({}, defaultMetaModel.metas), { loaded: true, valid: true }),
            });
            return prev;
        }, collectionMap);
    }
    /**
     * decorates ("templatize") a string using params
     * @param str {string}
     * @returns {string}
     */
    function t(str) {
        return (0, utils_1.interpolate)(str, extendedConfig);
    }
    function keyGen(params) {
        if (params === void 0) { params = {}; }
        return (0, utils_1.interpolate)(null, params);
    }
    return function reducer(state, action) {
        var _a;
        if (state === void 0) { state = defaultState; }
        function previousItem(key) {
            var collection = __assign({}, state.collection);
            return collection[key];
        }
        function update(item, key) {
            var _a;
            return __assign(__assign({}, state.collection), (_a = {}, _a[key] = item, _a));
        }
        switch (action.type) {
            /*** FETCHING COLLECTION ***/
            case t(ACTIONS_MAPPER.COLLECTION_RESET): {
                return __assign(__assign({}, defaultState), { collection: __assign({}, defaultState.collection), temp: {
                        metas: __assign(__assign({}, defaultMetaModel.metas), { loaded: false }),
                        model: __assign({}, defaultMetaModel.model),
                    } });
            }
            case t(ACTIONS_MAPPER.COLLECTION_FETCH): {
                return __assign(__assign({}, state), { fetching: true, error: null, start: time() });
            }
            case t(ACTIONS_MAPPER.COLLECTION_FETCH_FULFILLED): {
                return __assign(__assign({}, state), { fetching: false, loaded: true, end: time(), collection: mapModels(action.payload.data) });
            }
            case t(ACTIONS_MAPPER.COLLECTION_FETCH_CANCELLED): {
                return __assign(__assign({}, state), { fetching: false, end: time() });
            }
            case t(ACTIONS_MAPPER.COLLECTION_FETCH_REJECTED): {
                return __assign(__assign({}, state), { fetching: false, loaded: false, end: time(), error: action.payload.error });
            }
            /*** END FETCHING COLLECTION ***/
            /*** FETCHING MODEL ***/
            // NEVER USED
            case t(ACTIONS_MAPPER.INIT): {
                var collection = __assign({}, state.collection);
                var key = keyGen(action.payload.params);
                var previous = previousItem(key);
                collection[key] = Object.assign({}, {
                    metas: __assign(__assign({}, defaultMetaModel.metas), { loaded: false }),
                    model: __assign({}, defaultMetaModel.model),
                }, previous);
                return __assign(__assign({}, state), { collection: collection });
            }
            case t(ACTIONS_MAPPER.FETCH): {
                var collection = __assign({}, state.collection);
                var key = keyGen(action.payload.params);
                var previous = previousItem(key);
                var tryNumber = typeof action.payload.tries === "number" ? action.payload.tries : 1;
                if (!previous) {
                    collection[key] = __assign(__assign({}, defaultMetaModel), { metas: __assign(__assign({}, defaultMetaModel.metas), { error: null, fetching: true, start: time(), tries: tryNumber }) });
                }
                else {
                    collection[key] = Object.assign({}, previous, {
                        metas: __assign(__assign({}, collection[key].metas), { error: null, fetching: true, saved: false, start: time(), tries: tryNumber }),
                    });
                }
                return __assign(__assign({}, state), { collection: collection });
            }
            case t(ACTIONS_MAPPER.FETCH_REJECTED): {
                var collection = __assign({}, state.collection);
                var key = keyGen(action.payload.params);
                collection[key] = {
                    metas: __assign(__assign({}, collection[key].metas), { loaded: false, fetching: false, valid: false, end: time(), error: (_a = action.payload) === null || _a === void 0 ? void 0 : _a.error }),
                    model: __assign({}, defaultMetaModel.model),
                };
                return __assign(__assign({}, state), { collection: collection });
            }
            case t(ACTIONS_MAPPER.FETCH_CANCELLED): {
                var collection_1 = __assign({}, state.collection);
                var key_1 = keyGen(action.payload.params);
                //HAS A PREVIOUS VALID STATE
                if (collection_1[key_1].metas.loaded) {
                    // KEEP IT
                    collection_1[key_1] = __assign(__assign({}, collection_1[key_1]), { metas: __assign(__assign({}, collection_1[key_1].metas), { fetching: false, end: time() }) });
                    return __assign(__assign({}, state), { collection: collection_1 });
                }
                //REMOVING IT FROM THE STORE
                return __assign(__assign({}, state), { collection: Object.keys(collection_1).reduce(function (s, i) {
                        var _a;
                        if (i === key_1)
                            return s;
                        return __assign(__assign({}, s), (_a = {}, _a[i] = collection_1[i], _a));
                    }, {}) });
            }
            case t(ACTIONS_MAPPER.FETCH_FULFILLED): {
                var collection = __assign({}, state.collection);
                var key = keyGen(action.payload.params);
                collection[key] = {
                    metas: __assign(__assign({}, collection[key].metas), { loaded: true, fetching: false, end: time(), valid: true }),
                    model: action.payload.data,
                };
                return __assign(__assign({}, state), { collection: collection });
            }
            /*** END FETCHING MODEL ***/
            case t(ACTIONS_MAPPER.RESET): {
                return __assign(__assign({}, state), { temp: {
                        metas: __assign(__assign({}, defaultMetaModel.metas), { loaded: true }),
                        model: __assign({}, defaultMetaModel.model),
                    } });
            }
            case t(ACTIONS_MAPPER.EDIT): {
                var key = keyGen(action.payload.params);
                if (!key) {
                    //model is new
                    return __assign(__assign({}, state), { temp: __assign(__assign({}, state.temp), { model: Object.assign({}, state.temp.model, action.payload.data) }) });
                }
                else {
                    var collection = __assign({}, state.collection);
                    collection[key] = {
                        metas: __assign({}, collection[key].metas),
                        model: Object.assign({}, collection[key].model, action.payload.data),
                    };
                    return __assign(__assign({}, state), { collection: collection });
                }
            }
            case t(ACTIONS_MAPPER.SAVE): {
                var key = keyGen(action.payload.params);
                var prev = action.payload.create ? state.temp : previousItem(key);
                var updated = __assign(__assign({}, prev), { metas: __assign(__assign({}, prev.metas), { error: null, saving: true, start: time(), saved: false }) });
                if (action.payload.create) {
                    //model is new
                    return __assign(__assign({}, state), { temp: updated });
                }
                else {
                    var collection = update(updated, key);
                    return __assign(__assign({}, state), { collection: collection });
                }
            }
            case t(ACTIONS_MAPPER.SAVE_REJECTED): {
                var key = keyGen(action.payload.params);
                var prev = action.payload.create ? state.temp : previousItem(key);
                var updated = __assign(__assign({}, prev), { metas: __assign(__assign({}, prev.metas), { error: action.payload.error, end: time(), saving: false, saved: false }) });
                if (action.payload.create) {
                    //model is new
                    return __assign(__assign({}, state), { temp: updated });
                }
                else {
                    var collection = update(updated, key);
                    return __assign(__assign({}, state), { collection: collection });
                }
            }
            case t(ACTIONS_MAPPER.SAVE_FULFILLED): {
                var key = keyGen(action.payload.params);
                var prev = action.payload.create ? state.temp : previousItem(key);
                var updated = __assign(__assign({}, prev), { metas: __assign(__assign({}, prev.metas), { saving: false, end: time(), saved: true }), model: action.payload.data });
                if (action.payload.create) {
                    //model is new
                    return __assign(__assign({}, state), { temp: updated });
                }
                else {
                    var collection = update(updated, key);
                    return __assign(__assign({}, state), { collection: collection });
                }
            }
            case t(ACTIONS_MAPPER.DELETE): {
                var key = keyGen(action.payload.params);
                var prev = previousItem(key);
                var updated = __assign(__assign({}, prev), { metas: __assign(__assign({}, prev.metas), { deleting: true, start: time(), fetching: true }) });
                var collection = update(updated, key);
                return __assign(__assign({}, state), { collection: collection });
            }
            case t(ACTIONS_MAPPER.DELETE_REJECTED): {
                var key = keyGen(action.payload.params);
                var prev = previousItem(key);
                var updated = __assign(__assign({}, prev), { metas: __assign(__assign({}, prev.metas), { error: action.payload.error, end: time(), deleting: false, fetching: false }) });
                var collection = update(updated, key);
                return __assign(__assign({}, state), { collection: collection });
            }
            case t(ACTIONS_MAPPER.DELETE_FULFILLED): {
                var key = keyGen(action.payload.params);
                var collection = __assign({}, state.collection);
                delete collection[key];
                return __assign(__assign({}, state), { collection: collection });
            }
            default:
                return state;
        }
    };
}
exports.mixerStore = mixerStore;
exports.default = mixerStore;
