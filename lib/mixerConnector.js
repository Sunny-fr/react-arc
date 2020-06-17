'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.mixerConnector = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _utils = require('./utils');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var mixerConnector = exports.mixerConnector = function mixerConnector(connect, config) {
    var customMapStateToProps = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;

    var extendedConfig = _extends({}, (0, _utils.getDefaultConfig)(), config);
    var namespace = extendedConfig.name;
    return connect(function (store) {
        // Required Props
        var mapStateToProps = function mapStateToProps(store) {
            return {
                ARCConfig: extendedConfig,
                tempModel: store[namespace].temp,
                loaded: store[namespace].loaded,
                fetching: store[namespace].fetching,
                error: store[namespace].error,
                collection: store[namespace].collection
            };
        };
        var optionalStateToProps = customMapStateToProps ? customMapStateToProps(store) : {};
        return Object.assign({}, mapStateToProps(store), optionalStateToProps);
    }, null, null, {
        forwardRef: true
    });
};

exports.default = mixerConnector;