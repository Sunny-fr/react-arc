"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ARCConnector = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _utils = require("../utils");

var _core = require("../actions/core");

var _core2 = _interopRequireDefault(_core);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ARCConnector = exports.ARCConnector = function ARCConnector(connect, config) {
  var customMapStateToProps = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;

  var ARCConfig = _extends({}, (0, _utils.getDefaultConfig)(), config);
  var namespace = ARCConfig.name;
  return connect(function (store, ownProps) {
    // Required Props
    var collection = store[namespace].collection;
    var arcProps = {
      collection: collection,
      tempModel: store[namespace].temp
    };

    var loaded = _core2.default.isLoaded(ARCConfig, _extends({}, ownProps, arcProps));
    var metaModel = _core2.default._getModel(ARCConfig, _extends({}, ownProps, arcProps));
    var model = _core2.default.getModel(ARCConfig, _extends({}, ownProps, arcProps));
    var error = _core2.default.getError(ARCConfig, _extends({}, ownProps, arcProps));
    var syncing = _core2.default.isSyncing(ARCConfig, _extends({}, ownProps, arcProps));
    var metas = _core2.default.getMetas(ARCConfig, _extends({}, ownProps, arcProps));

    var mapStateToProps = function mapStateToProps(store) {
      return {
        ARCConfig: ARCConfig,
        metas: metas,
        metaModel: metaModel,
        model: model,
        loaded: loaded,
        error: error,
        syncing: syncing
      };
    };
    var optionalStateToProps = customMapStateToProps ? customMapStateToProps(store) : {};
    return Object.assign({}, mapStateToProps(store), optionalStateToProps);
  }, null, null, {
    forwardRef: true
  });
};

exports.default = ARCConnector;