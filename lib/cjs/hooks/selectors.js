"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.fetchingCountSelector = exports.metaModelSelector = void 0;
const toolkit_1 = require("@reduxjs/toolkit");
const createAppSelector = toolkit_1.createSelector.withTypes();
exports.metaModelSelector = createAppSelector([
    (state, ARCReducerName) => state[ARCReducerName],
    (_, ARCReducerName) => ARCReducerName,
    (_, __, key) => key,
], (store, reducerName, key) => {
    if (!store) {
        console.error(`ARC ERROR: Store not found for the given ARCConfig: ${reducerName}`);
        return null;
    }
    if (!key) {
        //console.error(`ARC ERROR: Key not found in the store for ARCConfig: ${arcConfig.name}`)
        return null;
    }
    return store.collection[key] || null;
});
exports.fetchingCountSelector = createAppSelector([
    (state, ARCReducerName) => state[ARCReducerName],
], (store) => {
    if (!store || !store.collection) {
        return 0;
    }
    return Object.values(store.collection).filter((metaModel) => metaModel.metas.fetching).length;
});
