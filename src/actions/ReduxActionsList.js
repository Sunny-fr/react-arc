import axios from 'axios'

export function flatten(node) {
    return Object.keys(node).map(nodeName => node[nodeName].model)
}

export function interpolate(str, params) {
    const keys = Object.keys(params);
    return keys.reduce((prev, current) => {
        return prev.replace(new RegExp('{' + current + '}', 'g'), params[current])
    }, str || keys.map(v => '{' + v + '}').join(':'))
}

export class ReduxActionsList {
    constructor(options) {
        this.config = options.config || config
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
            axios.get(url).then(response => {
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
    save(data, params) {
        return (dispatch) => {
            dispatch({type: this.decorate('SAVE_{uppercaseName}'), payload: {data}})
            const method = 'put'
            const url = this.decorate(this.config.paths.item, params)
            axios[method](url, data).then(response => {
                dispatch({
                    type: this.decorate('SAVE_{uppercaseName}_FULFILLED'),
                    payload: {params: data, data: response.data}
                })
            }).catch((error) => {
                dispatch({type: this.decorate('SAVE_{uppercaseName}_REJECTED'), payload: {error, data}})
            })
        }
    }

    /** REMOVE **/
    remove(data, params) {
        return (dispatch) => {
            dispatch({type: this.decorate('DELETE_{uppercaseName}'), payload: {data}})
            const url = this.decorate(this.config.paths.item, params)
            axios.delete(url).then(response => {
                dispatch({
                    type: this.decorate('DELETE_{uppercaseName}_FULFILLED'),
                    payload: {params: data, data: response.data}
                })
            }).catch((error) => {
                dispatch({type: this.decorate('DELETE_{uppercaseName}_REJECTED'), payload: {error, data}})
            })
        }
    }

    /** LISTS **/
    fetchAll() {
        return (dispatch) => {
            const url = this.config.paths.list
            dispatch({type: this.decorate('FETCH_{uppercaseName}S'), payload: {}})
            axios.get(url)
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