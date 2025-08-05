"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.fetchingCountSelector = exports.metaModelSelector = void 0;
var toolkit_1 = require("@reduxjs/toolkit");
exports.metaModelSelector = (0, toolkit_1.createSelector)([
    function (state, ARCConfig) { return state[ARCConfig.name] || null; },
    function (_, arcConfig) { return arcConfig; },
    function (_, __, key) { return key; },
], function (store, arcConfig, key) {
    if (!store) {
        console.error("ARC ERROR: Store not found for the given ARCConfig: ".concat(arcConfig.name));
        return null;
    }
    if (!key) {
        //console.error(`ARC ERROR: Key not found in the store for ARCConfig: ${arcConfig.name}`)
        return null;
    }
    return store.collection[key] || null;
});
exports.fetchingCountSelector = (0, toolkit_1.createSelector)([
    function (state, ARCConfig) { return state[ARCConfig.name] || null; },
    function (_, arcConfig) { return arcConfig; },
], function (store, arcConfig) {
    if (!store) {
        console.error("ARC ERROR: Store not found for the given ARCConfig: ".concat(arcConfig.name));
        return 0;
    }
    return Object.values(store.collection).filter(function (metaModel) { return metaModel.metas.fetching; }).length;
});
