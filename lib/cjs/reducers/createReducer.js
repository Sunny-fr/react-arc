"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createReducer = createReducer;
const utils_1 = require("../utils");
const action_1 = require("./action");
const time = () => {
    return new Date().getTime();
};
// in order to avoid data mutation
// when we update the store
// if the data retrieved is an object
// we'll clone it
function sanitizeData(data) {
    if (data && typeof data === "object") {
        return JSON.parse(JSON.stringify(data));
    }
    return data;
}
function createReducer(options) {
    const config = options?.config || {};
    const extendedConfig = (0, utils_1.initializeConfig)(config);
    const defaultModelObject = JSON.parse(JSON.stringify(extendedConfig.defaultModel));
    /* REDUCER STRUCTURE */
    /** @type {ARCMetaModel} **/
    const defaultMetaModel = {
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
        model: { ...defaultModelObject },
    };
    const defaultState = {
        collection: {},
    };
    /**
     * decorates ("templatize") a string using params
     * @param str {string}
     * @returns {string}
     */
    function t(str) {
        return (0, utils_1.interpolate)(str, extendedConfig);
    }
    function keyGen(params = {}) {
        return (0, utils_1.interpolate)(null, params);
    }
    return function reducer(state = defaultState, action) {
        function previousItem(key) {
            const collection = { ...state.collection };
            return collection[key];
        }
        // function update(item: ARCMetaModel<Model>, key: ARCModelKey): ARCMetaCollectionMap<Model> {
        //   return { ...state.collection, [key]: item }
        // }
        switch (action.type) {
            /*** FETCHING MODEL ***/
            // NEVER USED
            case t(action_1.ACTIONS.INIT): {
                const collection = { ...state.collection };
                const key = keyGen(action.payload.params);
                const previous = previousItem(key);
                collection[key] = Object.assign({}, {
                    metas: { ...defaultMetaModel.metas, loaded: false },
                    model: { ...defaultMetaModel.model },
                }, previous);
                return {
                    ...state,
                    collection,
                };
            }
            case t(action_1.ACTIONS.FETCH): {
                const collection = { ...state.collection };
                const key = keyGen(action.payload.params);
                const previous = previousItem(key);
                const tryNumber = typeof action.payload.tries === "number" ? action.payload.tries : 1;
                if (!previous) {
                    collection[key] = {
                        ...defaultMetaModel,
                        metas: {
                            ...defaultMetaModel.metas,
                            error: null,
                            fetching: true,
                            start: time(),
                            tries: tryNumber,
                        },
                    };
                }
                else {
                    collection[key] = Object.assign({}, previous, {
                        metas: {
                            ...collection[key].metas,
                            error: null,
                            fetching: true,
                            saved: false,
                            start: time(),
                            tries: tryNumber,
                        },
                    });
                }
                return {
                    ...state,
                    collection,
                };
            }
            case t(action_1.ACTIONS.FETCH_REJECTED): {
                const collection = { ...state.collection };
                const key = keyGen(action.payload.params);
                collection[key] = {
                    metas: {
                        ...collection[key].metas,
                        loaded: false,
                        fetching: false,
                        valid: false,
                        end: time(),
                        error: action.payload?.error,
                    },
                    model: { ...defaultMetaModel.model },
                };
                return {
                    ...state,
                    collection,
                };
            }
            case t(action_1.ACTIONS.FETCH_CANCELLED): {
                const collection = { ...state.collection };
                const key = keyGen(action.payload.params);
                //HAS A PREVIOUS VALID STATE
                if (collection[key].metas.loaded) {
                    // KEEP IT
                    collection[key] = {
                        ...collection[key],
                        metas: {
                            ...collection[key].metas,
                            fetching: false,
                            end: time(),
                        },
                    };
                    return {
                        ...state,
                        collection,
                    };
                }
                //REMOVING IT FROM THE STORE
                return {
                    ...state,
                    collection: Object.keys(collection).reduce((s, i) => {
                        if (i === key)
                            return s;
                        return {
                            ...s,
                            [i]: collection[i],
                        };
                    }, {}),
                };
            }
            case t(action_1.ACTIONS.FETCH_FULFILLED): {
                const collection = { ...state.collection };
                const key = keyGen(action.payload.params);
                collection[key] = {
                    metas: {
                        ...collection[key].metas,
                        loaded: true,
                        fetching: false,
                        end: time(),
                        valid: true,
                    },
                    model: sanitizeData(action.payload.data),
                };
                return {
                    ...state,
                    collection,
                };
            }
            /*** END FETCHING MODEL ***/
            default:
                return state;
        }
    };
}
exports.default = createReducer;
