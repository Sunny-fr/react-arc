'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

exports.flatten = flatten;
exports.extractParams = extractParams;
exports.cleanParams = cleanParams;
exports.interpolate = interpolate;

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function flatten(node) {
    var withMetas = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

    return Object.keys(node).map(function (nodeName) {
        return withMetas ? node[nodeName] : node[nodeName].model;
    });
}

function extractParams() {
    var props = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
    var source = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    return props.reduce(function (params, prop) {
        return _extends({}, params, _defineProperty({}, prop, source[prop]));
    }, {});
}

function cleanParams(str) {
    return str.replace(/({[A-z0-9_\-]+})/g, '');
}

function interpolate(str, params) {
    var keys = Object.keys(params);
    // if no string is given we generate one ( params = {foo:'bar', baz:'wth'} will generate {foo}:{baz})
    // it will provide a unique id for models
    var stringToDecorate = str || keys.map(function (v) {
        return '{' + v + '}';
    }).join(':');
    // it will turn path/to/{id} to path/to/123
    var result = keys.reduce(function (prev, current) {
        return prev.replace(new RegExp('{' + current + '}', 'g'), params[current]);
    }, stringToDecorate);
    // if params are missing we remove them
    // path/to/123/{anotherId} => path/to/123/
    return cleanParams(result);
}