import {interpolate} from '../actions/ReduxActionsList'
import {config as baseConfig} from '../components/AbstractComponent'


// MIXER
// returns a reducer

export function mixerStore(options) {
    const config = options && options.config ? options.config : baseConfig

    /* GENERATED WITH CASTER */
    /* REDUCER STRUCTURE */

    const defaultModel = config.defaultModel || {
            metas: {loaded: false, fetching: false, valid: false, saving: false, deleting: false, forward: false},
            model: {}
        }

    const defaultState = config.defaultState || {
            collection: {},
            temp: {metas: {...defaultModel.metas, loaded: false}, model: {...defaultModel.model}},
            fetching: false,
            loaded: false,
            error: null,
        }


    function mapModels(list) {
        return list.reduce((prev, current) => {
            prev[current.id] = Object.assign({}, defaultModel, {
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
            const collection = {...state.collection}
            collection[key] = item
            return collection
        }

        function decorate(str) {
            return interpolate(str, config)
        }


        switch (action.type) {

            case decorate('RESET_{uppercaseName}S') : {
                return {...defaultState}
            }

            case decorate('FETCH_{uppercaseName}S') : {
                return {...state, loaded:false, fetching: true}
            }

            case decorate('FETCH_{uppercaseName}S_FULFILLED') : {
                return {...state, fetching: false, loaded: true, collection: mapModels(action.payload.data)}
            }

            case decorate('FETCH_{uppercaseName}S_REJECTED') : {
                return {...state, fetching: false, loaded: false, error: action.payload.error}
            }

            case decorate('FETCH_{uppercaseName}') : {
                const newState = {...state}
                const key = keyGen(action.payload.params)
                if (!state.collection[key]) {
                    newState.collection[key] = {...defaultModel, metas: {...defaultModel.metas, fetching: true}}
                } else {
                    newState.collection[key] = Object.assign({}, newState.collection[key], {
                        metas: {
                            ...defaultModel.metas,
                            fetching: true
                        }
                    })
                }
                return newState
            }

            case decorate('FETCH_{uppercaseName}_REJECTED') : {
                const collection = {...state.collection}
                const key = keyGen(action.payload.params)
                collection[key] = {
                    metas: {loaded: false, fetching: false, valid: false, error: action.payload.error},
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
                collection[key] = {metas: {loaded: true, fetching: false, valid: true}, model: action.payload.data}
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
                const prev = !key ? state.temp : previousItem(key)
                const updated = {...prev, metas: {...prev.metas, saving: true}}
                if (!key) {
                    //model is new
                    return {...state, temp: updated}
                } else {
                    const collection = update(updated, key)
                    return {...state, collection}
                }
            }

            case decorate('SAVE_{uppercaseName}_REJECTED') : {
                const key = keyGen(action.payload.params)
                const prev = !key ? state.temp : previousItem(key)
                const updated = {...prev, metas: {...prev.metas, error: action.payload.error, saving: false}}
                if (!key) {
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
                const prev = !key ? state.temp : previousItem(key)
                const updated = {
                    ...prev,
                    metas: {...prev.metas, saving: false, forward: !key},
                    model: action.payload.data
                }
                if (!key) {
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
                const updated = {...prev, metas: {...prev.metas, deleting: true}}
                const collection = update(updated, key)
                return {...state, collection}
            }

            case decorate('DELETE_{uppercaseName}_REJECTED') : {
                const key = keyGen(action.payload.params)
                const prev = previousItem(key)
                const updated = {...prev, metas: {...prev.metas, error: action.payload.error, deleting: false}}
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
