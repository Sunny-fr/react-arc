export function mixerConnector (connect, config) {
    return connect((store) => {
        return {
            tempModel: store[config.name].temp,
            collectionLoaded: store[config.name].loaded,
            collection: store[config.name].collection
        }
    })
}

export default mixerConnector