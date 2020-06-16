'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

exports.withARC = withARC;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _defaultConfig = require('../defaultConfig');

var _defaultConfig2 = _interopRequireDefault(_defaultConfig);

var _reactRedux = require('react-redux');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function withARC(ARCConfig) {
    var extendedConfig = _extends({}, _defaultConfig2.default, ARCConfig);
    var namespace = extendedConfig.name;
    var connectFn = function connectFn(store) {
        return {
            ARCConfig: extendedConfig,
            tempModel: store[namespace].temp,
            loaded: store[namespace].loaded,
            fetching: store[namespace].fetching,
            error: store[namespace].error,
            collection: store[namespace].collection
        };
    };
    return function ARCHoc(Wrapped) {
        return (0, _reactRedux.connect)(connectFn)(Wrapped);
    };
}