"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.fetchingCountSelector = exports.metaModelSelector = void 0;
const toolkit_1 = require("@reduxjs/toolkit");
exports.metaModelSelector = (0, toolkit_1.createSelector)([
    (state, ARCConfig) => state[ARCConfig.name] || null,
    (_, arcConfig) => arcConfig,
    (_, __, key) => key,
], (store, arcConfig, key) => {
    if (!store) {
        console.error(`ARC ERROR: Store not found for the given ARCConfig: ${arcConfig.name}`);
        return null;
    }
    if (!key) {
        //console.error(`ARC ERROR: Key not found in the store for ARCConfig: ${arcConfig.name}`)
        return null;
    }
    return store.collection[key] || null;
});
exports.fetchingCountSelector = (0, toolkit_1.createSelector)([
    (state, ARCConfig) => state[ARCConfig.name] || null,
    (_, arcConfig) => arcConfig,
], (store, arcConfig) => {
    if (!store) {
        console.error(`ARC ERROR: Store not found for the given ARCConfig: ${arcConfig.name}`);
        return 0;
    }
    return Object.values(store.collection).filter((metaModel) => metaModel.metas.fetching).length;
});
