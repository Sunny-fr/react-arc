import {createSelector} from "@reduxjs/toolkit";
import {ARCRootState} from "../types/connectors.types";

const createAppSelector = createSelector.withTypes<ARCRootState>()

export const metaModelSelector = createAppSelector([
    (state, ARCReducerName: string) => state[ARCReducerName as keyof ARCRootState],
  (_, ARCReducerName: string) => ARCReducerName,
    (_, __, key: string | number | null) => key,
  ], (store, reducerName, key) => {
    if (!store) {
      console.error(`ARC ERROR: Store not found for the given ARCConfig: ${reducerName}`)
      return null
    }
    if (!key) {
      //console.error(`ARC ERROR: Key not found in the store for ARCConfig: ${arcConfig.name}`)
      return null
    }
    return store.collection[key] || null
  }
)



export const fetchingCountSelector = createAppSelector([
  (state, ARCReducerName: string) => state[ARCReducerName],
], (store) => {
  if(!store || !store.collection) {
    return  0
  }
  return Object.values(store.collection).filter((metaModel) => metaModel.metas.fetching).length
})