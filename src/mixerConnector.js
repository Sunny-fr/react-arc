import React from 'react'
import {getDefaultConfig} from './utils'

export const mixerConnector = function (connect, config, customMapStateToProps = null) {
    const extendedConfig = {...getDefaultConfig(), ...config}
    const namespace = extendedConfig.name
    return connect((store) => {
        // Required Props
        const mapStateToProps = (store) => {
            return {
                ARCConfig: extendedConfig,
                tempModel: store[namespace].temp,
                loaded: store[namespace].loaded,
                fetching: store[namespace].fetching,
                error: store[namespace].error,
                collection: store[namespace].collection,
            }
        }
        const optionalStateToProps = customMapStateToProps ? customMapStateToProps(store) : {}
        return Object.assign({}, mapStateToProps(store), optionalStateToProps)
    }, null, null, {
        forwardRef: true
    })

}

export default mixerConnector