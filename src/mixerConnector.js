export function mixerConnector(connect, config, customMapStateToProps = null) {
    return connect((store) => {
        // Required Props
        const mapStateToProps = (store) => {
            return {
                tempModel: store[config.name].temp,
                loaded: store[config.name].loaded,
                error: store[config.name].error,
                collection: store[config.name].collection
            }
        }
        const optionalStateToProps = customMapStateToProps ? customMapStateToProps(store) : {}
        return Object.assign({}, mapStateToProps(store), optionalStateToProps)
    })
}

export default mixerConnector