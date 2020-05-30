'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.ReduxActionsList = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _axios = require('axios');

var _axios2 = _interopRequireDefault(_axios);

var _index = require('../utils/index');

var _defaultConfig = require('../defaultConfig');

var _defaultConfig2 = _interopRequireDefault(_defaultConfig);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var ReduxActionsList = exports.ReduxActionsList = function () {
    function ReduxActionsList(options) {
        _classCallCheck(this, ReduxActionsList);

        _initialiseProps.call(this);

        this.config = _extends({}, _defaultConfig2.default, options.config || {});
        this.setHeaders();
        this.setupMethods();
        this.axios = _axios2.default.create();
    }

    _createClass(ReduxActionsList, [{
        key: 'applyHeaders',
        value: function applyHeaders(headers) {
            var props = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

            // TODO REALLY HANDLE PROPS
            // MUST BE PROPS !!!
            // OR PARAMS MUST TAKE THE CHARGE OF HAVING SPECIALS PROPS SUCH AS TOKEN
            if (Object.keys(headers || {}).length < 1) {
                return undefined;
            }
            return Object.keys(headers).reduce(function (state, header) {
                return _extends({}, state, _defineProperty({}, header, (0, _index.interpolate)(headers[header], props)));
            }, {});
        }
    }, {
        key: 'setHeaders',
        value: function setHeaders() {
            var headers = Object.keys(this.config.headers).length > 0 ? _extends({}, this.config.headers) : undefined;
            this.headers = this.applyHeaders(headers);
        }
    }, {
        key: 'updateConfig',
        value: function updateConfig(config) {
            this.config = _extends({}, this.config, config);
            this.setHeaders();
            this.setupMethods();
        }
    }, {
        key: 'setupMethods',
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
        key: 'edit',


        /** EDITING **/
        value: function edit(data, params) {
            var _this = this;

            return function (dispatch) {
                dispatch({ type: _this.decorate('EDIT_{uppercaseName}'), payload: { data: data, params: params } });
            };
        }

        /** SINGLE ITEM **/

    }, {
        key: 'standAloneFetchOne',
        value: function standAloneFetchOne(params) {
            return this.axios({
                method: this.methods.read,
                url: this.decorate(this.config.paths.item, params),
                headers: this.applyHeaders(this.headers, params)
            });
        }
    }, {
        key: 'init',
        value: function init(params) {
            var _this2 = this;

            return function (dispatch) {
                dispatch({ type: _this2.decorate('INIT_{uppercaseName}'), payload: { params: params } });
            };
        }
    }, {
        key: 'requestFetchOne',
        value: function requestFetchOne(params) {
            var _this3 = this;

            return function (dispatch) {
                dispatch({ type: _this3.decorate('FETCH_REQUESTED_{uppercaseName}'), payload: { params: params } });
            };
        }
    }, {
        key: 'fetchOne',
        value: function fetchOne(params) {
            var _this4 = this;

            return function (dispatch) {
                //console.log(this.decorate('FETCH_{uppercaseName}'))
                dispatch({ type: _this4.decorate('FETCH_{uppercaseName}'), payload: { params: params } });
                _this4.standAloneFetchOne(params).then(function (response) {
                    dispatch({
                        type: _this4.decorate('FETCH_{uppercaseName}_FULFILLED'),
                        payload: { data: response.data, params: params }
                    });
                }).catch(function (error) {
                    dispatch({ type: _this4.decorate('FETCH_{uppercaseName}_REJECTED'), payload: { error: error, params: params } });
                });
            };
        }

        /**  SAVE **/

    }, {
        key: 'standAloneSave',
        value: function standAloneSave(data, params, create) {
            var method = create ? this.methods.create : this.methods.update;
            //TODO remove magic ?
            var url = this.decorate(this.config.paths.item, method === 'post' ? {} : params);
            return this.axios({
                method: method,
                url: url,
                headers: this.applyHeaders(this.headers, params),
                data: data
            });
        }
    }, {
        key: 'save',
        value: function save(data, params) {
            var _this5 = this;

            var create = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;

            return function (dispatch) {
                dispatch({ type: _this5.decorate('SAVE_{uppercaseName}'), payload: { data: data, params: params, create: create } });
                _this5.standAloneSave(data, params, create).then(function (response) {
                    dispatch({
                        type: _this5.decorate('SAVE_{uppercaseName}_FULFILLED'),
                        payload: { params: params, data: response.data, create: create }
                    });
                }).catch(function (error) {
                    dispatch({ type: _this5.decorate('SAVE_{uppercaseName}_REJECTED'), payload: { error: error, data: data, params: params, create: create } });
                });
            };
        }

        /** REMOVE **/

    }, {
        key: 'standAloneRemove',
        value: function standAloneRemove(params) {
            var url = this.decorate(this.config.paths.item, params);
            return this.axios({
                method: this.methods.delete,
                url: url,
                headers: this.applyHeaders(this.headers, params)
            });
        }
    }, {
        key: 'remove',
        value: function remove(params) {
            var _this6 = this;

            return function (dispatch) {
                dispatch({ type: _this6.decorate('DELETE_{uppercaseName}'), payload: { params: params } });
                _this6.standAloneRemove(params).then(function (response) {
                    dispatch({
                        type: _this6.decorate('DELETE_{uppercaseName}_FULFILLED'),
                        payload: { params: params, data: response.data }
                    });
                }).catch(function (error) {
                    dispatch({ type: _this6.decorate('DELETE_{uppercaseName}_REJECTED'), payload: { error: error, params: params } });
                });
            };
        }

        /** LISTS **/

    }, {
        key: 'standAloneFetchAll',
        value: function standAloneFetchAll(params) {
            var url = this.decorate(this.config.paths.collection, params);
            return this.axios({
                method: this.methods.read,
                url: url,
                headers: this.applyHeaders(this.headers, params)
            });
        }
    }, {
        key: 'fetchAll',
        value: function fetchAll() {
            var _this7 = this;

            var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

            return function (dispatch) {
                dispatch({ type: _this7.decorate('FETCH_{uppercaseName}S'), payload: { params: params } });
                _this7.standAloneFetchAll(params).then(function (response) {
                    dispatch({
                        type: _this7.decorate('FETCH_{uppercaseName}S_FULFILLED'),
                        payload: { data: response.data }
                    });
                }).catch(function (error) {
                    dispatch({ type: _this7.decorate('FETCH_{uppercaseName}S_REJECTED'), payload: { error: error } });
                });
            };
        }
    }, {
        key: 'reset',
        value: function reset() {
            var _this8 = this;

            return function (dispatch) {
                dispatch({ type: _this8.decorate('RESET_{uppercaseName}S') });
            };
        }
    }, {
        key: 'resetTemp',
        value: function resetTemp() {
            var _this9 = this;

            return function (dispatch) {
                dispatch({ type: _this9.decorate('RESET_{uppercaseName}_TEMP') });
            };
        }
    }]);

    return ReduxActionsList;
}();

var _initialiseProps = function _initialiseProps() {
    var _this10 = this;

    this.decorate = function (str, options) {
        return (0, _index.interpolate)(str, options || _this10.config);
    };
};

exports.default = ReduxActionsList;