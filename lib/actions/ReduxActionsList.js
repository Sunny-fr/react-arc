"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ReduxActionsList = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _axios = require("axios");

var _axios2 = _interopRequireDefault(_axios);

var _index = require("../utils/index");

var _commons = require("../commons");

var _commons2 = _interopRequireDefault(_commons);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var ReduxActionsList = exports.ReduxActionsList = function () {
  function ReduxActionsList(options) {
    _classCallCheck(this, ReduxActionsList);

    _initialiseProps.call(this);

    this.config = _extends({}, (0, _index.getDefaultConfig)(), options.config || {});
    this.initialConfig = this.config;
    this.retryConditionFn = options.retryConditionFn;
    this.setHeaders();
    this.setupMethods();
    this.axios = _axios2.default.create();
  }

  _createClass(ReduxActionsList, [{
    key: "getInitialConfig",
    value: function getInitialConfig() {
      return this.initialConfig;
    }
  }, {
    key: "generateCancelToken",
    value: function generateCancelToken(axiosOptions) {
      return new _axios2.default.CancelToken(function executor(c) {
        if (axiosOptions) {
          axiosOptions.cancel = c;
        }
      });
    }
  }, {
    key: "decorateHeaders",
    value: function decorateHeaders() {
      var props = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      var headers = this.headers;

      if (Object.keys(headers || {}).length < 1) {
        return {};
      }
      return Object.keys(headers).reduce(function (state, header) {
        if (!headers[header]) return state;
        return _extends({}, state, _defineProperty({}, header, (0, _index.interpolate)(headers[header], props)));
      }, {});
    }
  }, {
    key: "setHeaders",
    value: function setHeaders() {
      this.headers = Object.keys(this.config.headers).length > 0 ? _extends({}, this.config.headers) : {};
    }
  }, {
    key: "updateConfig",
    value: function updateConfig(config) {
      this.config = _extends({}, this.config, config);
      this.setHeaders();
      this.setupMethods();
    }
  }, {
    key: "setupMethods",
    value: function setupMethods() {
      var methods = this.config.methods;

      this.methods = {
        create: methods.create.toLowerCase(),
        read: methods.read.toLowerCase(),
        update: methods.update.toLowerCase(),
        delete: methods.delete.toLowerCase()
      };
    }
  }, {
    key: "edit",


    /** EDITING **/
    value: function edit(data, params) {
      var _this = this;

      return function (dispatch) {
        dispatch({
          type: _this.decorate("EDIT_{uppercaseName}"),
          payload: { data: data, params: params }
        });
      };
    }

    /** SINGLE ITEM **/

  }, {
    key: "standAloneFetchOne",
    value: function standAloneFetchOne(params, config, props, axiosOptions) {
      return this.axios({
        method: config.methods.read,
        url: config.paths.item,
        headers: config.headers,
        cancelToken: this.generateCancelToken(axiosOptions)
      });
    }

    // NEVER USED !
    // init(params) {
    //   return (dispatch) => {
    //     dispatch({
    //       type: this.decorate("INIT_{uppercaseName}"),
    //       payload: { params },
    //     })
    //   }
    // }

    // NEVER USED !
    // requestFetchOne(params) {
    //   return (dispatch) => {
    //     dispatch({
    //       type: this.decorate("FETCH_REQUESTED_{uppercaseName}"),
    //       payload: { params },
    //     })
    //   }
    // }

  }, {
    key: "fetchOne",
    value: function fetchOne() {
      var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

      var _this2 = this;

      var props = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      var axiosOptions = arguments[2];

      return function (dispatch) {
        var generateRequest = function generateRequest() {
          var tryNumber = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 1;

          var config = _this2.beforeFetch({ config: _this2.config, params: params, props: props });
          var retryConditionFn = _this2.retryConditionFn || (!!axiosOptions ? axiosOptions.retryConditionFn : undefined);
          dispatch({
            type: _this2.decorate("FETCH_{uppercaseName}"),
            payload: {
              params: params,
              tries: tryNumber
            }
          });
          return _this2.standAloneFetchOne(params, config, props, axiosOptions).then(function (response) {
            dispatch({
              type: _this2.decorate("FETCH_{uppercaseName}_FULFILLED"),
              payload: { data: response.data, params: params }
            });
            return Promise.resolve(response);
          }).catch(function (error) {
            if (error && error.message === _commons2.default.cancelRequestMessage) {
              dispatch({
                type: _this2.decorate("FETCH_{uppercaseName}_CANCELLED"),
                payload: { error: error, params: params }
              });
              return Promise.reject(error);
            }

            if (typeof retryConditionFn === "function" && retryConditionFn(error, {
              params: params,
              config: config,
              props: props,
              axiosOptions: axiosOptions,
              tryNumber: tryNumber
            })) {
              console.log("retry #" + tryNumber);
              return generateRequest(tryNumber + 1);
            }
            if (typeof retryConditionFn !== "function" && tryNumber < _this2.config.maxTries) {
              console.log("retry #" + tryNumber);
              return generateRequest(tryNumber + 1);
            }
            dispatch({
              type: _this2.decorate("FETCH_{uppercaseName}_REJECTED"),
              payload: { error: error, params: params }
            });
            return Promise.reject(error);
          });
        };

        return generateRequest();
      };
    }

    /**  SAVE **/

  }, {
    key: "standAloneSave",
    value: function standAloneSave(data, params, create, config, props) {
      var method = create ? config.methods.create : config.methods.update;
      //TODO remove magic ?
      var url = this.decorate(this.config.paths.item, method === "post" ? {} : params);
      return this.axios({
        method: method,
        url: url,
        headers: config.headers,
        data: data
      });
    }
  }, {
    key: "save",
    value: function save(data, params) {
      var _this3 = this;

      var create = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
      var props = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};

      return function (dispatch) {
        var config = _this3.beforeFetch({ config: _this3.config, params: params, props: props });
        dispatch({
          type: _this3.decorate("SAVE_{uppercaseName}"),
          payload: { data: data, params: params, create: create }
        });
        _this3.standAloneSave(data, params, create, config, props).then(function (response) {
          dispatch({
            type: _this3.decorate("SAVE_{uppercaseName}_FULFILLED"),
            payload: { params: params, data: response.data, create: create }
          });
        }).catch(function (error) {
          dispatch({
            type: _this3.decorate("SAVE_{uppercaseName}_REJECTED"),
            payload: { error: error, data: data, params: params, create: create }
          });
        });
      };
    }

    /** REMOVE **/

  }, {
    key: "standAloneRemove",
    value: function standAloneRemove(params, config, props) {
      var url = config.paths.item;
      return this.axios({
        method: config.methods.delete,
        url: url,
        headers: config.headers
      });
    }
  }, {
    key: "remove",
    value: function remove(params) {
      var _this4 = this;

      var props = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

      return function (dispatch) {
        var config = _this4.beforeFetch({ config: _this4.config, params: params, props: props });
        dispatch({
          type: _this4.decorate("DELETE_{uppercaseName}"),
          payload: { params: params }
        });
        _this4.standAloneRemove(params, config, props).then(function (response) {
          dispatch({
            type: _this4.decorate("DELETE_{uppercaseName}_FULFILLED"),
            payload: { params: params, data: response.data }
          });
        }).catch(function (error) {
          dispatch({
            type: _this4.decorate("DELETE_{uppercaseName}_REJECTED"),
            payload: { error: error, params: params }
          });
        });
      };
    }

    /** LISTS **/

  }, {
    key: "standAloneFetchAll",
    value: function standAloneFetchAll(params, config, props, axiosOptions) {
      var url = config.paths.collection;
      return this.axios({
        method: config.methods.read,
        url: url,
        headers: config.headers,
        cancelToken: this.generateCancelToken(axiosOptions)
      });
    }
  }, {
    key: "fetchAll",
    value: function fetchAll() {
      var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

      var _this5 = this;

      var props = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      var axiosOptions = arguments[2];

      return function (dispatch) {
        dispatch({
          type: _this5.decorate("FETCH_{uppercaseName}S"),
          payload: { params: params }
        });
        var config = _this5.beforeFetch({ config: _this5.config, params: params, props: props });
        return _this5.standAloneFetchAll(params, config, props, axiosOptions).then(function (response) {
          dispatch({
            type: _this5.decorate("FETCH_{uppercaseName}S_FULFILLED"),
            payload: { data: response.data }
          });
          return Promise.resolve(response);
        }).catch(function (error) {
          if (error && error.message === _commons2.default.cancelRequestMessage) {
            dispatch({
              type: _this5.decorate("FETCH_{uppercaseName}S_CANCELLED"),
              payload: { error: error, params: params }
            });
            return Promise.reject(error);
          }
          dispatch({
            type: _this5.decorate("FETCH_{uppercaseName}S_REJECTED"),
            payload: { error: error, params: params }
          });
          return Promise.reject(error);
        });
      };
    }
  }, {
    key: "reset",
    value: function reset() {
      var _this6 = this;

      return function (dispatch) {
        dispatch({ type: _this6.decorate("RESET_{uppercaseName}S") });
      };
    }
  }, {
    key: "resetTemp",
    value: function resetTemp() {
      var _this7 = this;

      return function (dispatch) {
        dispatch({ type: _this7.decorate("RESET_{uppercaseName}_TEMP") });
      };
    }
  }], [{
    key: "GenerateCancelToken",
    value: function GenerateCancelToken(axiosOptions) {
      return new _axios2.default.CancelToken(function executor(c) {
        if (axiosOptions) {
          axiosOptions.cancel = c;
        }
      });
    }
  }]);

  return ReduxActionsList;
}();

var _initialiseProps = function _initialiseProps() {
  var _this8 = this;

  this.decorate = function (str, options) {
    return (0, _index.interpolate)(str, options || _this8.config);
  };

  this.beforeFetch = function (_ref) {
    var config = _ref.config,
        _ref$props = _ref.props,
        props = _ref$props === undefined ? {} : _ref$props,
        _ref$params = _ref.params,
        params = _ref$params === undefined ? {} : _ref$params;

    //DECORATE URLS
    return _extends({}, config, {
      headers: _this8.decorateHeaders(_extends({}, props, params)),
      paths: Object.keys(config.paths).reduce(function (s, path) {
        var value = _this8.decorate(config.paths[path], params);
        return _extends({}, s, _defineProperty({}, path, value));
      }, {})
    });
  };
};

exports.default = ReduxActionsList;