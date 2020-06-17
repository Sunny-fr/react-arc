import {interpolate, extractParams} from '../utils'
//import {config as baseConfig} from '../containers/AbstractContainer'
import defaultConfig from '../defaultConfig'

const time = () => {
    return new Date().getTime()
}


// MIXER
// returns a reducer

export function mixerStore(options) {
    const config = options && options.config ? options.config : {}
    const extendedConfig = {...defaultConfig, ...config}
    const defaultModelObject = JSON.parse(JSON.stringify(extendedConfig.defaultModel))


    /* GENERATED WITH CASTER */
    /* REDUCER STRUCTURE */

    const defaultModel = {
        metas: {loaded: false, fetching: false, fetchRequested: false, valid: false, saving: false, deleting: false, saved: false},
        model: {...defaultModelObject}
    }

    const defaultState = {
        collection: {},
        temp: {metas: {...defaultModel.metas}, model: {...defaultModel.model}},
        fetching: false,
        loaded: false,
        error: null
    }


    function mapModels(list) {
        return list.reduce((prev, current) => {
            const tempKey = interpolate(null, extractParams(extendedConfig.modelProps, current))
            const key = tempKey || JSON.stringify(current)
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

            /*** FETCHING COLLECTION ***/

            case decorate('RESET_{uppercaseName}S') : {
                return {
                    ...defaultState,
                    collection: {...defaultState.collection},
                    temp: {metas: {...defaultModel.metas, loaded: false}, model: {...defaultModel.model}}
                }
            }

            case decorate('FETCH_{uppercaseName}S') : {
                return {...state, fetching: true, error: null, start: time()}
            }

            case decorate('FETCH_{uppercaseName}S_FULFILLED') : {
                return {
                    ...state,
                    fetching: false,
                    loaded: true,
                    end: time(),
                    collection: mapModels(action.payload.data)
                }
            }

            case decorate('FETCH_{uppercaseName}S_CANCELLED') : {
                return {
                    ...state,
                    fetching: false,
                    end: time()
                }
            }

            case decorate('FETCH_{uppercaseName}S_REJECTED') : {
                return {...state, fetching: false, loaded: false, end: time(), error: action.payload.error}
            }

            /*** END FETCHING COLLECTION ***/

            /*** FETCHING MODEL ***/

            case decorate('INIT_{uppercaseName}') : {
                const collection = {...state.collection}
                const key = keyGen(action.payload.params)

                const previous = previousItem(key)
                collection[key] = Object.assign({}, {metas: {...defaultModel.metas, loaded: false}, model: {...defaultModel.model}}, previous)

                return {
                    ...state,
                    collection
                }
            }

            case decorate('FETCH_{uppercaseName}') : {
                const collection = {...state.collection}
                const key = keyGen(action.payload.params)

                const previous = previousItem(key)

                if (!previous) {
                    collection[key] = {...defaultModel, metas: {...defaultModel.metas, fetching: true, start: time()}}
                } else {
                    collection[key] = Object.assign({}, previous, {
                        metas: {
                            ...collection[key].metas,
                            fetching: true,
                            saved: false,
                            start: time()
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
                    metas: {
                        ...collection[key].metas,
                        loaded: false,
                        fetching: false,
                        valid: false,
                        end: time(),
                        error: action.payload.error
                    },
                    model: {...defaultModel.model}
                }
                return {
                    ...state,
                    collection
                }
            }

            case decorate('FETCH_{uppercaseName}_CANCELLED') : {
                const collection = {...state.collection}
                const key = keyGen(action.payload.params)

                //HAS A PREVIOUS VALID STATE
                if(collection[key].metas.loaded === true) {
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
                        collection
                    }
                }

                //REMOVING IT FROM THE STORE
                return {
                    ...state,
                    collection: Object.keys(collection).reduce((s, i) => {
                        if(i === key) return s;
                        return {
                            ...s,
                            [i]: collection[i]
                        }
                    }, {})
                }
            }

            case decorate('FETCH_{uppercaseName}_FULFILLED') : {
                const collection = {...state.collection}
                const key = keyGen(action.payload.params)
                collection[key] = {
                    metas: {
                        ...collection[key].metas,
                        loaded: true,
                        fetching: false,
                        end: time(),
                        valid: true
                    }, model: action.payload.data
                }
                return {
                    ...state,
                    collection
                }
            }

            /*** END FETCHING MODEL ***/

            case decorate('RESET_{uppercaseName}_TEMP') : {
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
                    collection[key] = {
                        metas: {...collection[key].metas},
                        model: Object.assign({}, collection[key].model, action.payload.data)
                    }
                    return {
                        ...state,
                        collection
                    }
                }
            }

            case decorate('SAVE_{uppercaseName}') : {
                const key = keyGen(action.payload.params)
                const prev = action.payload.create ? state.temp : previousItem(key)
                const updated = {
                    ...prev,
                    metas: {...prev.metas, error: null, saving: true, start: time(), saved: false}
                }
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
                const updated = {
                    ...prev,
                    metas: {...prev.metas, error: action.payload.error, end: time(), saving: false, saved: false}
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

            case decorate('SAVE_{uppercaseName}_FULFILLED') : {
                const key = keyGen(action.payload.params)
                const prev = action.payload.create ? state.temp : previousItem(key)
                const updated = {
                    ...prev,
                    metas: {...prev.metas, saving: false, end: time(), saved: true},
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
                const updated = {...prev, metas: {...prev.metas, deleting: true, start: time(), fetching: true}}
                const collection = update(updated, key)
                return {...state, collection}
            }

            case decorate('DELETE_{uppercaseName}_REJECTED') : {
                const key = keyGen(action.payload.params)
                const prev = previousItem(key)
                const updated = {
                    ...prev,
                    metas: {...prev.metas, error: action.payload.error, end: time(), deleting: false, fetching: false}
                }
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
