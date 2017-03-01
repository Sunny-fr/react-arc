import defaultConfig from './defaultConfig'
export function mixerConnector(connect, config, customMapStateToProps = null) {
    const extendedConfig = {...defaultConfig, ...config}
    return connect((store) => {
        // Required Props
        const mapStateToProps = (store) => {
            return {
                tempModel: store[extendedConfig.name].temp,
                loaded: store[extendedConfig.name].loaded,
                error: store[extendedConfig.name].error,
                collection: store[extendedConfig.name].collection
            }
        }
        const optionalStateToProps = customMapStateToProps ? customMapStateToProps(store) : {}
        return Object.assign({}, mapStateToProps(store), optionalStateToProps)
    })
}

export default mixerConnector