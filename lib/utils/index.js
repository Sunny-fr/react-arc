'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

exports.flatten = flatten;
exports.extractParams = extractParams;
exports.interpolate = interpolate;

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function flatten(node) {
    return Object.keys(node).map(function (nodeName) {
        return node[nodeName].model;
    });
}

function extractParams() {
    var props = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
    var source = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    return props.reduce(function (params, prop) {
        return _extends({}, params, _defineProperty({}, prop, source[prop]));
    }, {});
}

function interpolate(str, params) {
    var keys = Object.keys(params);
    return keys.reduce(function (prev, current) {
        return prev.replace(new RegExp('{' + current + '}', 'g'), params[current]);
    }, str || keys.map(function (v) {
        return '{' + v + '}';
    }).join(':'));
}