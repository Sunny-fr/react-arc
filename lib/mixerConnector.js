"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.mixerConnector = mixerConnector;
function mixerConnector(connect, config) {
    return connect(function (store) {
        return {
            tempModel: store[config.name].temp,
            loaded: store[config.name].loaded,
            error: store[config.name].error,
            collection: store[config.name].collection
        };
    });
}

exports.default = mixerConnector;