import {createSelector} from "@reduxjs/toolkit";
import {ARCRootState} from "../types/connectors.types";
import {ARCConfig} from "../types/config.types";

export const metaModelSelector = createSelector([
    (state: ARCRootState, ARCConfig: ARCConfig<any>) => state[ARCConfig.name] || null,
    (_, arcConfig: ARCConfig<any>) => arcConfig,
    (_, __, key: string | number | null) => key,
  ], (store, arcConfig, key) => {
    if (!store) {
      console.error(`ARC ERROR: Store not found for the given ARCConfig: ${arcConfig.name}`)
      return null
    }
    if (!key) {
      //console.error(`ARC ERROR: Key not found in the store for ARCConfig: ${arcConfig.name}`)
      return null
    }
    return store.collection[key] || null
  }
)

export const fetchingCountSelector = createSelector([
  (state: ARCRootState, ARCConfig: ARCConfig<any>) => state[ARCConfig.name] || null,
  (_, arcConfig: ARCConfig<any>) => arcConfig,
], (store, arcConfig) => {
  if (!store) {
    console.error(`ARC ERROR: Store not found for the given ARCConfig: ${arcConfig.name}`)
    return 0
  }
  return Object.values(store.collection).filter((metaModel) => metaModel.metas.fetching).length
})