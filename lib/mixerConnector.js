"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.mixerConnector = mixerConnector;
function mixerConnector(connect, config) {
    return connect(function (store) {
        return {
            tempModel: store[config.name].temp,
            collectionLoaded: store[config.name].loaded,
            collection: store[config.name].collection
        };
    });
}

exports.default = mixerConnector;