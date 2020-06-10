'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

exports.withUseARC = withUseARC;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _useARC = require('../hooks/useARC');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function withUseARC(ARCConfig) {
    return function Hoc(Wrapped) {
        return function Loader(props) {
            var arc = (0, _useARC.useARC)({ ARCConfig: ARCConfig, props: props });
            return _react2.default.createElement(Wrapped, _extends({}, props, arc));
        };
    };
}