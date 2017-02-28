export function mixerConnector (connect, config) {
    return connect((store) => {
        return {
            tempModel: store[config.name].temp,
            loaded: store[config.name].loaded,
            error: store[config.name].error,
            collection: store[config.name].collection
        }
    })
}

export default mixerConnector