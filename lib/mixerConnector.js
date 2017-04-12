'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

exports.mixerConnector = mixerConnector;

var _defaultConfig = require('./defaultConfig');

var _defaultConfig2 = _interopRequireDefault(_defaultConfig);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function mixerConnector(connect, config) {
    var customMapStateToProps = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;

    var extendedConfig = _extends({}, _defaultConfig2.default, config);
    var namespace = extendedConfig.name;
    return connect(function (store) {
        // Required Props
        var mapStateToProps = function mapStateToProps(store) {
            return {
                tempModel: store[namespace].temp,
                loaded: store[namespace].loaded,
                fetching: store[namespace].fetching,
                error: store[namespace].error,
                collection: store[namespace].collection
            };
        };
        var optionalStateToProps = customMapStateToProps ? customMapStateToProps(store) : {};
        return Object.assign({}, mapStateToProps(store), optionalStateToProps);
    }, null, null, { withRef: true });
}

exports.default = mixerConnector;