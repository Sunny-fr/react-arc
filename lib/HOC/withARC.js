"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.connectFn = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

exports.withARC = withARC;

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _reactRedux = require("react-redux");

var _utils = require("../utils");

var _core = require("../actions/core");

var _core2 = _interopRequireDefault(_core);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var connectFn = exports.connectFn = function connectFn(ARCConfig) {
  return function (store, ownProps) {
    var namespace = ARCConfig.name;
    var collection = store[namespace].collection;
    var arcProps = {
      collection: collection,
      tempModel: store[namespace].temp
    };
    var mergedProps = _extends({}, (0, _utils.extendWithDefaultProps)(ARCConfig, ownProps), arcProps);
    var metaModel = _core2.default._getModel(ARCConfig, mergedProps);
    var loaded = _core2.default.isLoaded(ARCConfig, mergedProps);
    var model = _core2.default.getModel(ARCConfig, mergedProps);
    var error = _core2.default.getError(ARCConfig, mergedProps);
    var syncing = _core2.default.isSyncing(ARCConfig, mergedProps);
    var metas = _core2.default.getMetas(ARCConfig, undefined, mergedProps);
    var isNew = _core2.default.isNew(ARCConfig, mergedProps);
    return _extends({}, (0, _utils.extendWithDefaultProps)(ARCConfig, ownProps), {
      ARCConfig: ARCConfig,
      loaded: loaded,
      metaModel: metaModel,
      model: model,
      error: error,
      syncing: syncing,
      metas: metas,
      isNew: isNew
    });
  };
};

function withARC(ARCConfig) {
  var extendedConfig = _extends({}, (0, _utils.getDefaultConfig)(), ARCConfig);
  return function ARCHoc(Wrapped) {
    return (0, _reactRedux.connect)(connectFn(extendedConfig))(Wrapped);
  };
}