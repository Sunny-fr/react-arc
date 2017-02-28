"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.mixerConnector = mixerConnector;
function mixerConnector(connect, config) {
    var customMapStateToProps = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;

    return connect(function (store) {
        // Required Props
        var mapStateToProps = function mapStateToProps(store) {
            return {
                tempModel: store[config.name].temp,
                loaded: store[config.name].loaded,
                error: store[config.name].error,
                collection: store[config.name].collection
            };
        };
        var optionalStateToProps = customMapStateToProps ? customMapStateToProps(store) : {};
        return Object.assign({}, mapStateToProps(store), optionalStateToProps);
    });
}

exports.default = mixerConnector;