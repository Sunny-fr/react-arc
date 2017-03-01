import axios from 'axios'
import {interpolate} from '../utils/index'


export class ReduxActionsList {
    constructor(options) {
        this.config = options.config || config
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
            const url = this.decorate(this.config.paths.item, params)
            axios[this.methods.read](url).then(response => {
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
            axios[method](url, data).then(response => {
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
    remove(data, params) {
        return (dispatch) => {
            dispatch({type: this.decorate('DELETE_{uppercaseName}'), payload: {data}})
            const url = this.decorate(this.config.paths.item, params)
            axios[this.methods.delete](url).then(response => {
                dispatch({
                    type: this.decorate('DELETE_{uppercaseName}_FULFILLED'),
                    payload: {params, data: response.data}
                })
            }).catch((error) => {
                dispatch({type: this.decorate('DELETE_{uppercaseName}_REJECTED'), payload: {error, data, params}})
            })
        }
    }

    /** LISTS **/
    fetchAll(params = {}) {
        return (dispatch) => {
            const url = this.decorate(this.config.paths.collection, params)
            dispatch({type: this.decorate('FETCH_{uppercaseName}S'), payload: {params}})
            axios[this.methods.read](url)
                .then((response) => {
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