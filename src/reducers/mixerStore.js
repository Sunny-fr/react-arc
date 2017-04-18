import {interpolate, extractParams} from '../utils'
import {config as baseConfig} from '../components/AbstractComponent'
import defaultConfig from '../defaultConfig'


// MIXER
// returns a reducer

export function mixerStore(options) {
    const config = options && options.config ? options.config : baseConfig
    const extendedConfig = {...defaultConfig, ...config}
    const defaultModelObject = JSON.parse(JSON.stringify(extendedConfig.defaultModel))



    /* GENERATED WITH CASTER */
    /* REDUCER STRUCTURE */

    const defaultModel =  {
            metas: {loaded: false, fetching: false, valid: false, saving: false, deleting: false, saved: false},
            model: {...defaultModelObject}
        }

    const defaultState = {
            collection: {},
            temp: {metas: {...defaultModel.metas, loaded: false}, model: {...defaultModel.model}},
            fetching: false,
            loaded: false,
            error: null
        }



    function mapModels(list) {
        return list.reduce((prev, current) => {
            const key = interpolate(null, extractParams(extendedConfig.modelProps, current))
            prev[key] = Object.assign({}, defaultModel, {
                model: current,
                metas: {...defaultModel.metas, loaded: true, valid: true}
            })
            return prev
        }, {})
    }

    function keyGen(params) {
        return params ? interpolate(null, params) : null
    }

    return function reducer(state = defaultState, action) {

        function previousItem(key) {
            const collection = {...state.collection}
            return collection[key]
        }

        function update(item, key) {
            return {...state.collection, [key]: item}
        }

        function decorate(str) {
            return interpolate(str, extendedConfig)
        }


        switch (action.type) {

            case decorate('RESET_{uppercaseName}S') : {
                return {
                    ...defaultState,
                    collection: {...defaultState.collection},
                    temp: {metas: {...defaultModel.metas, loaded: false}, model: {...defaultModel.model}}
                }
            }

            case decorate('FETCH_{uppercaseName}S') : {
                return {...state , fetching: true, error: null}
            }

            case decorate('FETCH_{uppercaseName}S_FULFILLED') : {
                return {...state, fetching: false, loaded: true, collection: mapModels(action.payload.data)}
            }

            case decorate('FETCH_{uppercaseName}S_REJECTED') : {
                return {...state, fetching: false, loaded: false, error: action.payload.error}
            }

            case decorate('FETCH_{uppercaseName}') : {
                const collection = {...state.collection}
                const key = keyGen(action.payload.params)
                if (!collection[key]) {
                    collection[key] = {...defaultModel, metas: {...defaultModel.metas, fetching: true}}
                } else {
                    collection[key] = Object.assign({}, collection[key], {
                        metas: {
                            ...collection[key].metas,
                            fetching: true,
                            saved: false
                        }
                    })
                }
                return {
                    ...state,
                    collection
                }
            }

            case decorate('FETCH_{uppercaseName}_REJECTED') : {
                const collection = {...state.collection}
                const key = keyGen(action.payload.params)
                collection[key] = {
                    metas: {...collection[key].metas, loaded: false, fetching: false, valid: false, error: action.payload.error},
                    model: {...defaultModel.model}
                }
                return {
                    ...state,
                    collection
                }
            }

            case decorate('FETCH_{uppercaseName}_FULFILLED') : {
                const collection = {...state.collection}
                const key = keyGen(action.payload.params)
                collection[key] = {metas: {...collection[key].metas, loaded: true, fetching: false, valid: true}, model: action.payload.data}
                return {
                    ...state,
                    collection
                }
            }

            case decorate('RESET_TEMP') : {
                return {
                    ...state,
                    temp: {metas: {...defaultModel.metas, loaded: true}, model: {...defaultModel.model}}
                }
            }

            case decorate('EDIT_{uppercaseName}') : {
                const key = keyGen(action.payload.params)
                if (!key) {
                    //model is new
                    return {
                        ...state,
                        temp: {...state.temp, model: Object.assign({}, state.temp.model, action.payload.data)}
                    }
                } else {
                    const collection = {...state.collection}
                    collection[key].model = Object.assign({}, collection[key].model, action.payload.data)
                    return {
                        ...state,
                        collection
                    }
                }
            }

            case decorate('SAVE_{uppercaseName}') : {
                const key = keyGen(action.payload.params)
                const prev = action.payload.create ? state.temp : previousItem(key)
                const updated = {...prev, metas: {...prev.metas, error: null, saving: true, saved: false}}
                if (action.payload.create) {
                    //model is new
                    return {...state, temp: updated}
                } else {
                    const collection = update(updated, key)
                    return {...state, collection}
                }
            }

            case decorate('SAVE_{uppercaseName}_REJECTED') : {
                const key = keyGen(action.payload.params)
                const prev = action.payload.create ? state.temp : previousItem(key)
                const updated = {...prev, metas: {...prev.metas, error: action.payload.error, saving: false, saved: false}}
                if (action.payload.create) {
                    //model is new
                    return {...state, temp: updated}
                } else {
                    const collection = update(updated, key)
                    return {
                        ...state,
                        collection
                    }
                }
            }

            case decorate('SAVE_{uppercaseName}_FULFILLED') : {
                const key = keyGen(action.payload.params)
                const prev = action.payload.create ? state.temp : previousItem(key)
                const updated = {
                    ...prev,
                    metas: {...prev.metas, saving: false, saved: true},
                    model: action.payload.data
                }
                if (action.payload.create) {
                    //model is new
                    return {...state, temp: updated}
                } else {
                    const collection = update(updated, key)
                    return {
                        ...state,
                        collection
                    }
                }
            }

            case decorate('DELETE_{uppercaseName}') : {
                const key = keyGen(action.payload.params)
                const prev = previousItem(key)
                const updated = {...prev, metas: {...prev.metas, deleting: true, fetching: true}}
                const collection = update(updated, key)
                return {...state, collection}
            }

            case decorate('DELETE_{uppercaseName}_REJECTED') : {
                const key = keyGen(action.payload.params)
                const prev = previousItem(key)
                const updated = {...prev, metas: {...prev.metas, error: action.payload.error, deleting: false, fetching: false}}
                const collection = update(updated, key)
                return {
                    ...state,
                    collection
                }
            }

            case decorate('DELETE_{uppercaseName}_FULFILLED') : {
                const key = keyGen(action.payload.params)
                const collection = {...state.collection}
                delete collection[key]
                return {
                    ...state,
                    collection
                }
            }

            default:
                return state

        }

    }
}

export default mixerStore
