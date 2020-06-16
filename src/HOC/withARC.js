import React from 'react'
import defaultConfig from '../defaultConfig'
import {connect} from 'react-redux'
export function withARC(ARCConfig) {
    const extendedConfig = {...defaultConfig, ...ARCConfig}
    const namespace = extendedConfig.name
    const connectFn = store => {
        return {
            ARCConfig: extendedConfig,
            tempModel: store[namespace].temp,
            loaded: store[namespace].loaded,
            fetching: store[namespace].fetching,
            error: store[namespace].error,
            collection: store[namespace].collection,
        }
    }
    return function ARCHoc(Wrapped) {
        return connect(connectFn)(Wrapped)
    }
}

