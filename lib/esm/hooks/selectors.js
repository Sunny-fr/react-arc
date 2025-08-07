import { createSelector } from "@reduxjs/toolkit";
export const metaModelSelector = createSelector([
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
export const fetchingCountSelector = createSelector([
    (state, ARCConfig) => state[ARCConfig.name] || null,
    (_, arcConfig) => arcConfig,
], (store, arcConfig) => {
    if (!store) {
        console.error(`ARC ERROR: Store not found for the given ARCConfig: ${arcConfig.name}`);
        return 0;
    }
    return Object.values(store.collection).filter((metaModel) => metaModel.metas.fetching).length;
});
