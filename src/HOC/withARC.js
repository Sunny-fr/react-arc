import React from 'react'
import {connect} from 'react-redux'
import {getDefaultConfig} from '../utils'
export function withARC(ARCConfig) {
    const extendedConfig = {...getDefaultConfig(), ...ARCConfig}
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

