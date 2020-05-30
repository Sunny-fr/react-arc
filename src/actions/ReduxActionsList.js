import axios from 'axios'
import {interpolate} from '../utils/index'
import defaultConfig from '../defaultConfig'

export class ReduxActionsList {
    constructor(options) {
        this.config = {...defaultConfig, ...(options.config || {})}
        this.setHeaders()
        this.setupMethods()
        this.axios = axios.create()
    }

    applyHeaders(headers, props = {}) {
        // TODO REALLY HANDLE PROPS
        // MUST BE PROPS !!!
        // OR PARAMS MUST TAKE THE CHARGE OF HAVING SPECIALS PROPS SUCH AS TOKEN
        if (Object.keys(headers || {}).length < 1) {
            return undefined
        }
        return Object.keys(headers).reduce((state, header) => {
            if(!headers[header]) return state
            return {
                ...state,
                [header]: interpolate(headers[header], props)
            }
        }, {})
    }

    setHeaders() {
        const headers =  Object.keys(this.config.headers).length > 0 ? {...this.config.headers} : undefined
        this.headers = this.applyHeaders(headers)
    }

    updateConfig(config) {
        this.config = {...this.config, ...config}
        this.setHeaders()
        this.setupMethods()
    }

    setupMethods() {
        const {methods} = this.config
        this.methods = {
            create: methods.create.toLowerCase(),
            read: methods.read.toLowerCase(),
            update: methods.update.toLowerCase(),
            delete: methods.delete.toLowerCase()
        }
    }

    decorate = (str, options) => {
        return interpolate(str, options || this.config)
    }

    /** EDITING **/
    edit(data, params) {
        return (dispatch) => {
            dispatch({type: this.decorate('EDIT_{uppercaseName}'), payload: {data, params}})
        }
    }

    /** SINGLE ITEM **/

    standAloneFetchOne(params) {
        return this.axios({
            method: this.methods.read,
            url: this.decorate(this.config.paths.item, params),
            headers: this.applyHeaders(this.headers, params)
        })
    }

    init(params) {
        return (dispatch) => {
            dispatch({type: this.decorate('INIT_{uppercaseName}'), payload: {params}})
        }
    }

    requestFetchOne(params) {
        return (dispatch) => {
            dispatch({type: this.decorate('FETCH_REQUESTED_{uppercaseName}'), payload: {params}})
        }
    }

    fetchOne(params) {
        return (dispatch) => {
            //console.log(this.decorate('FETCH_{uppercaseName}'))
            dispatch({type: this.decorate('FETCH_{uppercaseName}'), payload: {params}})
            this.standAloneFetchOne(params).then(response => {
                dispatch({
                    type: this.decorate('FETCH_{uppercaseName}_FULFILLED'),
                    payload: {data: response.data, params}
                })
            }).catch((error) => {
                dispatch({type: this.decorate('FETCH_{uppercaseName}_REJECTED'), payload: {error, params}})
            })
        }

    }

    /**  SAVE **/


    standAloneSave(data, params, create) {
        const method = create ? this.methods.create : this.methods.update
        //TODO remove magic ?
        const url = this.decorate(this.config.paths.item, method === 'post' ? {} : params)
        return this.axios({
            method,
            url,
            headers: this.applyHeaders(this.headers, params),
            data,
        })
    }

    save(data, params, create = false) {
        return (dispatch) => {
            dispatch({type: this.decorate('SAVE_{uppercaseName}'), payload: {data, params, create}})
            this.standAloneSave(data, params, create).then(response => {
                dispatch({
                    type: this.decorate('SAVE_{uppercaseName}_FULFILLED'),
                    payload: {params, data: response.data, create}
                })
            }).catch((error) => {
                dispatch({type: this.decorate('SAVE_{uppercaseName}_REJECTED'), payload: {error, data, params, create}})
            })
        }
    }

    /** REMOVE **/

    standAloneRemove(params) {
        const url = this.decorate(this.config.paths.item, params)
        return this.axios({
            method: this.methods.delete,
            url,
            headers: this.applyHeaders(this.headers, params),
        })
    }

    remove(params) {
        return (dispatch) => {
            dispatch({type: this.decorate('DELETE_{uppercaseName}'), payload: {params}})
            this.standAloneRemove(params).then(response => {
                dispatch({
                    type: this.decorate('DELETE_{uppercaseName}_FULFILLED'),
                    payload: {params, data: response.data}
                })
            }).catch((error) => {
                dispatch({type: this.decorate('DELETE_{uppercaseName}_REJECTED'), payload: {error, params}})
            })
        }
    }

    /** LISTS **/

    standAloneFetchAll(params) {
        const url = this.decorate(this.config.paths.collection, params)
        return this.axios({
            method: this.methods.read,
            url,
            headers: this.applyHeaders(this.headers, params),
        })
    }

    fetchAll(params = {}) {
        return (dispatch) => {
            dispatch({type: this.decorate('FETCH_{uppercaseName}S'), payload: {params}})
            this.standAloneFetchAll(params).then((response) => {
                dispatch({
                    type: this.decorate('FETCH_{uppercaseName}S_FULFILLED'),
                    payload: {data: response.data}
                })
            })
                .catch((error) => {
                    dispatch({type: this.decorate('FETCH_{uppercaseName}S_REJECTED'), payload: {error}})
                })
        }
    }

    reset() {
        return (dispatch) => {
            dispatch({type: this.decorate('RESET_{uppercaseName}S')})
        }
    }

    resetTemp() {
        return (dispatch) => {
            dispatch({type: this.decorate('RESET_{uppercaseName}_TEMP')})
        }
    }

}

export default ReduxActionsList