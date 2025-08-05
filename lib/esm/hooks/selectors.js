import { createSelector } from "@reduxjs/toolkit";
export var metaModelSelector = createSelector([
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
export var fetchingCountSelector = createSelector([
    function (state, ARCConfig) { return state[ARCConfig.name] || null; },
    function (_, arcConfig) { return arcConfig; },
], function (store, arcConfig) {
    if (!store) {
        console.error("ARC ERROR: Store not found for the given ARCConfig: ".concat(arcConfig.name));
        return 0;
    }
    return Object.values(store.collection).filter(function (metaModel) { return metaModel.metas.fetching; }).length;
});
