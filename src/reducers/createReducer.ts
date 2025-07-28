import {getDefaultConfig, interpolate} from "../utils"
import {ARCConfig} from "../types/config.types"
import {ARCMetaModel, ARCModel, ARCModelKey,} from "../types/model.types"
import {ARCStoreState} from "../types/connectors.types"
import {ACTIONS} from "./action";


const time = (): number => {
  return new Date().getTime()
}

// MIXER
// returns a reducer

interface MixerStoreParams<Model> {
  config: ARCConfig<Model>
}

interface ReduxActionPayload {
  data?: any
  error?: object
  params?: object
  tries?: number
  create?: boolean
}

interface ReduxAction {
  type: string
  payload: ReduxActionPayload
}


export function createReducer<Model>(options: MixerStoreParams<Model>) {
  const config = options?.config || {}
  const extendedConfig = { ...getDefaultConfig(), ...config }
  const defaultModelObject = JSON.parse(
    JSON.stringify(extendedConfig.defaultModel)
  ) as ARCModel<Model>
  /* REDUCER STRUCTURE */

  /** @type {ARCMetaModel} **/
  const defaultMetaModel: ARCMetaModel<Model> = {
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
  }

  const defaultState:ARCStoreState<Model> = {
    collection: {},
    temp: {
      metas: { ...defaultMetaModel.metas },
      model: { ...defaultMetaModel.model },
    },
    fetching: false,
    loaded: false,
    error: null,
  }

  // function mapModels(list: ARCModel<Model>[]): ARCMetaCollectionMap<Model> {
  //   const collectionMap: ARCMetaCollectionMap<Model> = {}
  //   return list.reduce((prev: ARCMetaCollectionMap<Model>, current) => {
  //     const tempKey = interpolate(null, getParams(extendedConfig, current as ComponentProps))
  //     const key = tempKey || JSON.stringify(current)
  //     prev[key] = Object.assign({}, defaultMetaModel, {
  //       model: current,
  //       metas: { ...defaultMetaModel.metas, loaded: true, valid: true },
  //     })
  //     return prev
  //   }, collectionMap)
  // }

  /**
   * decorates ("templatize") a string using params
   * @param str {string}
   * @returns {string}
   */
  function t(str: string): string {
    return interpolate(str, extendedConfig)
  }

  function keyGen(params: object = {}): string {
    return interpolate(null, params)
  }

  return function reducer(
    state: ARCStoreState<Model> = defaultState,
    action: ReduxAction
  ) {
    function previousItem(key: ARCModelKey) {
      const collection = { ...state.collection }
      return collection[key]
    }

    function update(item: ARCMetaModel<Model>, key: ARCModelKey) {
      return { ...state.collection, [key]: item }
    }


    switch (action.type) {


      /*** FETCHING MODEL ***/

      // NEVER USED
      case t(ACTIONS.INIT): {
        const collection = { ...state.collection }
        const key = keyGen(action.payload.params)

        const previous = previousItem(key)
        collection[key] = Object.assign(
          {},
          {
            metas: { ...defaultMetaModel.metas, loaded: false },
            model: { ...defaultMetaModel.model },
          },
          previous
        )

        return {
          ...state,
          collection,
        }
      }

      case t(ACTIONS.FETCH): {
        const collection = { ...state.collection }
        const key = keyGen(action.payload.params)

        const previous = previousItem(key)
        const tryNumber =
          typeof action.payload.tries === "number" ? action.payload.tries : 1

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
          }
        } else {
          collection[key] = Object.assign({}, previous, {
            metas: {
              ...collection[key].metas,
              error: null,
              fetching: true,
              saved: false,
              start: time(),
              tries: tryNumber,
            },
          })
        }
        return {
          ...state,
          collection,
        }
      }

      case t(ACTIONS.FETCH_REJECTED): {
        const collection = { ...state.collection }
        const key = keyGen(action.payload.params)
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
        }
        return {
          ...state,
          collection,
        }
      }

      case t(ACTIONS.FETCH_CANCELLED): {
        const collection = { ...state.collection }
        const key = keyGen(action.payload.params)

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
          }
          return {
            ...state,
            collection,
          }
        }

        //REMOVING IT FROM THE STORE
        return {
          ...state,
          collection: Object.keys(collection).reduce((s, i) => {
            if (i === key) return s
            return {
              ...s,
              [i]: collection[i],
            }
          }, {}),
        }
      }

      case t(ACTIONS.FETCH_FULFILLED): {
        const collection = { ...state.collection }
        const key = keyGen(action.payload.params)
        collection[key] = {
          metas: {
            ...collection[key].metas,
            loaded: true,
            fetching: false,
            end: time(),
            valid: true,
          },
          model: action.payload.data,
        }
        return {
          ...state,
          collection,
        }
      }

      /*** END FETCHING MODEL ***/

      case t(ACTIONS.RESET): {
        return {
          ...state,
          temp: {
            metas: { ...defaultMetaModel.metas, loaded: true },
            model: { ...defaultMetaModel.model },
          },
        }
      }

      case t(ACTIONS.EDIT): {
        const key = keyGen(action.payload.params)
        if (!key) {
          //model is new
          return {
            ...state,
            temp: {
              ...state.temp,
              model: Object.assign({}, state.temp.model, action.payload.data),
            },
          }
        } else {
          const collection = { ...state.collection }
          collection[key] = {
            metas: { ...collection[key].metas },
            model: Object.assign(
              {},
              collection[key].model,
              action.payload.data
            ),
          }
          return {
            ...state,
            collection,
          }
        }
      }

      case t(ACTIONS.SAVE): {
        const key = keyGen(action.payload.params)
        const prev = action.payload.create ? state.temp : previousItem(key)
        const updated:ARCMetaModel<Model> = {
          ...prev,
          metas: {
            ...prev.metas,
            error: null,
            saving: true,
            start: time(),
            saved: false,
          },
        }
        if (action.payload.create) {
          //model is new
          return { ...state, temp: updated }
        } else {
          const collection = update(updated, key)
          return { ...state, collection }
        }
      }

      case t(ACTIONS.SAVE_REJECTED): {
        const key = keyGen(action.payload.params)
        const prev = action.payload.create ? state.temp : previousItem(key)
        const updated = {
          ...prev,
          metas: {
            ...prev.metas,
            error: action.payload.error,
            end: time(),
            saving: false,
            saved: false,
          },
        }
        if (action.payload.create) {
          //model is new
          return { ...state, temp: updated }
        } else {
          const collection = update(updated, key)
          return {
            ...state,
            collection,
          }
        }
      }

      case t(ACTIONS.SAVE_FULFILLED): {
        const key = keyGen(action.payload.params)
        const prev = action.payload.create ? state.temp : previousItem(key)
        const updated = {
          ...prev,
          metas: { ...prev.metas, saving: false, end: time(), saved: true },
          model: action.payload.data,
        }
        if (action.payload.create) {
          //model is new
          return { ...state, temp: updated }
        } else {
          const collection = update(updated, key)
          return {
            ...state,
            collection,
          }
        }
      }

      case t(ACTIONS.DELETE): {
        const key = keyGen(action.payload.params)
        const prev = previousItem(key)
        const updated = {
          ...prev,
          metas: {
            ...prev.metas,
            deleting: true,
            start: time(),
            fetching: true,
          },
        }
        const collection = update(updated, key)
        return { ...state, collection }
      }

      case t(ACTIONS.DELETE_REJECTED): {
        const key = keyGen(action.payload.params)
        const prev = previousItem(key)
        const updated = {
          ...prev,
          metas: {
            ...prev.metas,
            error: action.payload.error,
            end: time(),
            deleting: false,
            fetching: false,
          },
        }
        const collection = update(updated, key)
        return {
          ...state,
          collection,
        }
      }

      case t(ACTIONS.DELETE_FULFILLED): {
        const key = keyGen(action.payload.params)
        const collection = { ...state.collection }
        delete collection[key]
        return {
          ...state,
          collection,
        }
      }

      default:
        return state
    }
  }
}

export default createReducer
