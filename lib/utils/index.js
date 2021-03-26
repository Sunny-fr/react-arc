"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.interpolate = exports.cleanParams = exports.changedProps = exports.getParams = exports.extractParams = exports.removeMissingProps = exports.getDefaultFromMissingProps = exports.flatten = undefined;

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

exports.getDefaultConfig = getDefaultConfig;

var _deepEqual = require("deep-equal");

var _deepEqual2 = _interopRequireDefault(_deepEqual);

var _lodash = require("lodash.clonedeep");

var _lodash2 = _interopRequireDefault(_lodash);

var _defaultConfig = require("../defaultConfig");

var _defaultConfig2 = _interopRequireDefault(_defaultConfig);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var flatten = exports.flatten = function flatten(node) {
  var withMetas = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

  return Object.keys(node).map(function (nodeName) {
    return withMetas ? node[nodeName] : node[nodeName].model;
  });
};

var getDefaultFromMissingProps = exports.getDefaultFromMissingProps = function getDefaultFromMissingProps(ARCConfig, ownProps) {
  var defaultProps = ARCConfig.defaultProps || {};
  return Object.keys(defaultProps).reduce(function (state, prop) {
    if (typeof ownProps[prop] === "undefined") {
      state[prop] = defaultProps[prop];
    }
    return state;
  }, {});
};

var removeMissingProps = exports.removeMissingProps = function removeMissingProps(ARCConfig, ownProps) {
  var defaultProps = ARCConfig.defaultProps || {};

  return Object.keys(defaultProps).reduce(function (state, prop) {
    if (typeof ownProps[prop] === "undefined") {
      //ugly shit
      delete state[prop];
      return state;
    }
    return state;
  }, _extends({}, ownProps));
};

var extractParams = exports.extractParams = function extractParams() {
  var props = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
  var source = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

  return props.reduce(function (params, prop) {
    return _extends({}, params, _defineProperty({}, prop, source[prop]));
  }, {});
};

var getParams = exports.getParams = function getParams(ARCConfig) {
  var source = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

  var props = ARCConfig.modelProps;
  var defaultProps = ARCConfig.defaultProps || {};
  var merged = _extends({}, defaultProps, source);
  return props.reduce(function (params, prop) {
    return _extends({}, params, _defineProperty({}, prop, merged[prop]));
  }, {});
};

var changedProps = exports.changedProps = function changedProps(prevProps, nextProps) {
  if (!prevProps) return [];
  if ((typeof prevProps === "undefined" ? "undefined" : _typeof(prevProps)) !== (typeof prevProps === "undefined" ? "undefined" : _typeof(prevProps))) return Object.keys(prevProps);
  return Object.keys(nextProps).reduce(function (state, item) {
    if ((0, _deepEqual2.default)(prevProps[item], nextProps[item])) return state.concat();
    return state.concat(item);
  }, []);
};

var cleanParams = exports.cleanParams = function cleanParams(str) {
  return str.replace(/({[A-z0-9_\-]+})/g, "");
};

var interpolate = exports.interpolate = function interpolate(str, params) {
  var keys = Object.keys(params);
  // if no string is given we generate one ( params = {foo:'bar', baz:'wth'} will generate {foo}:{baz})
  // it will provide a unique id for models
  var stringToDecorate = str || keys.sort().map(function (v) {
    return "{" + v + "}";
  }).join(":");
  // it will turn path/to/{id} to path/to/123
  var result = keys.reduce(function (prev, current) {
    var elm_val = params[current];
    // skip functions
    if (typeof elm_val === "function") return prev;

    if (Array.isArray(elm_val)) {
      return prev.replace(new RegExp("{" + current + "}", "g"), "[" + elm_val.map(function (item) {
        return (typeof item === "undefined" ? "undefined" : _typeof(item)) === "object" ? interpolate(null, item) : item;
      }).join("|") + "]");
    }
    if (typeof elm_val === "undefined") return prev;
    return prev.replace(new RegExp("{" + current + "}", "g"), elm_val);
  }, stringToDecorate);
  // if params are missing we remove them
  // path/to/123/{anotherId} => path/to/123/
  return cleanParams(result);
};

function getDefaultConfig() {
  return (0, _lodash2.default)(_defaultConfig2.default);
}