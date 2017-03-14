import axios from 'axios'
import {interpolate} from '../utils/index'


export class ReduxActionsList {
    constructor(options) {
        this.config = options.config || config
        this.headers = Object.keys(this.config.headers).length > 0 ? {...this.config.headers} : undefined
        this.methods = this.setupMethods()
    }

    setupMethods () {
        const {methods} = this.config
        return {
            create: methods.create.toLowerCase(),
            read: methods.read.toLowerCase(),
            update: methods.update.toLowerCase(),
            delete: methods.delete.toLowerCase()
        }
    }

    decorate = (str, options) => {
        return interpolate(str, options || this.config)
    }

    /** EDITING **/
    edit(data, params) {
        return (dispatch) => {
            dispatch({type: this.decorate('EDIT_{uppercaseName}'), payload: {data, params}})
        }
    }

    /** SINGLE ITEM **/
    fetchOne(params) {
        return (dispatch) => {
            dispatch({type: this.decorate('FETCH_{uppercaseName}'), payload: {params}})
            axios({
                method: this.methods.read,
                url: this.decorate(this.config.paths.item, params),
                headers: this.headers
            }).then(response => {
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
    save(data, params, create = false) {
        return (dispatch) => {
            dispatch({type: this.decorate('SAVE_{uppercaseName}'), payload: {data, params, create}})
            const method = create ? this.methods.create : this.methods.update
            //TODO remove magic ?
            const url = this.decorate(this.config.paths.item, method === 'post' ? {} : params)
            axios({
                method,
                url,
                headers: this.headers,
                data,
            }).then(response => {
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
    remove(params) {
        return (dispatch) => {
            dispatch({type: this.decorate('DELETE_{uppercaseName}'), payload: {params}})
            const url = this.decorate(this.config.paths.item, params)
            axios({
                method: this.methods.delete,
                url,
                headers: this.headers
            }).then(response => {
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
    fetchAll(params = {}) {
        return (dispatch) => {
            const url = this.decorate(this.config.paths.collection, params)
            dispatch({type: this.decorate('FETCH_{uppercaseName}S'), payload: {params}})
            axios({
                method:this.methods.read,
                url,
                headers: this.headers
            }).then((response) => {
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