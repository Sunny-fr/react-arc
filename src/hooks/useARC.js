import React, {useEffect, useRef, useState} from 'react'
import {extractParams, getDefaultConfig, interpolate} from '../utils'


class ARC {

    constructor({ARCConfig}) {
        this.config = ARC.createConfig(ARCConfig)
    }

    static createConfig(ARCConfig) {
        const config = ARC.extendConfig(ARCConfig)
        config.headers = ARC.extendHeaders(config)
        config.methods = ARC.extendMethods(config)
        return config
    }

    static extendConfig(ARCConfig) {
        return {...getDefaultConfig(), ...(ARCConfig || {})}
    }

    static extendHeaders(ARCConfig) {
        return Object.keys(ARCConfig.headers).length > 0 ? {...ARCConfig.headers} : undefined
    }

    static extendMethods(extendedConfig) {
        const {methods} = extendedConfig
        return {
            create: methods.create.toLowerCase(),
            read: methods.read.toLowerCase(),
            update: methods.update.toLowerCase(),
            delete: methods.delete.toLowerCase()
        }
    }

    hasRequiredParams(props) {
        return this.config.modelProps.reduce((valid, prop) => (valid === true && typeof props[prop] !== 'undefined' ? valid : false)
            , true)
    }

    extractParams(props) {
        return extractParams(this.config.modelProps, props)
    }

    applyHeaders(headers, props) {
        // MUST BE PROPS !!!
        // OR PARAMS MUST TAKE THE CHARGE OF HAVING SPECIALS PROPS SUCH AS TOKEN
        if (Object.keys(headers || {}).length < 1) {
            return undefined
        }
        return Object.keys(headers).reduce((state, header) => {
            return {
                ...state,
                [header]: interpolate(headers[header], props)
            }
        }, {})
    }

    get({props, params}) {
        const p = params || this.extractParams(props)
        return fetch(interpolate(this.config.paths.read || this.config.paths.item, p), {
            method: this.config.methods['read'],
            headers: this.applyHeaders(this.config.headers, props)
        }).then(ARC.json)
    }

    remove({props, params}) {
        const p = params || this.extractParams(props)
        return fetch(interpolate(this.config.paths.delete || this.config.paths.item, p), {
            method: this.config.methods['delete'],
            headers: this.applyHeaders(this.config.headers, props)
        }).then(ARC.json)
    }

    create({props, body, params}) {
        const p = params || this.extractParams(props)
        // WARNING !!
        return fetch(interpolate(this.config.paths.create || this.config.paths.item, p), {
            method: this.config.methods['create'],
            headers: this.applyHeaders(this.config.headers, props),
            body: JSON.stringify(body)
        }).then(ARC.json)
    }

    update({props, body, params}) {
        const p = params || this.extractParams(props)
        return fetch(interpolate(this.config.paths.update || this.config.paths.item, p), {
            method: this.config.methods['update'],
            headers: this.applyHeaders(this.config.headers, props),
            body: JSON.stringify(body)
        }).then(ARC.json)
    }

    static json(response) {
        if (response.status === 200 || response.status === 201) {
            return response.json()
        }
        return response.json().then(r => Promise.reject(r))
    }
}


export function useARC({ARCConfig, props}) {
    const arc = new ARC({ARCConfig})
    const defaultProps = props
    const [state, setState] = useState({error: null, loading: false, loaded: false, response: null})

    const handle = (fetcher) => {
        if (state.pending) return
        setState({...state, error: null, loading: true})
        return fetcher().then(response => {
            setState({...state, loaded: true, error: null, loading: false, response})
            return response
        }).catch(error => {
            setState({...state, error, loading: false})
            return Promise.reject(error)
        })
    }

    const params = useRef(arc.extractParams(props))

    useEffect(() => {
        if (arc.hasRequiredParams(params.current)) {
            handle(() => arc.get({props, params: params.current}))
        }
    }, [params])

    return {
        error: state.error,
        loading: state.loading,
        loaded: state.loaded,
        response: state.response,
        arc: {
            arc,
            get: (args = {}) => {
                const {props, params} = args
                return handle(() => arc.get({props: props || defaultProps, params}))
            },
            remove: (args = {}) => {
                const {props, params} = args
                return handle(() => arc.remove({props: props || defaultProps, params}))
            },
            create: (args = {}) => {
                const {props, params, body} = args
                return handle(() => arc.create({props: props || defaultProps, params, body}))
            },
            update: (args = {}) => {
                const {props, params, body} = args
                return handle(() => arc.update({props: props || defaultProps, params, body}))
            },
            extract: (props) => arc.extractParams(props || defaultProps),
            extractParams: (props) => arc.extractParams(props || defaultProps),
            custom: (fetcher) => {
                return handle(fetcher)
            },
        }
    }
}


