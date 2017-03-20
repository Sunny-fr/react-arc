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

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var ReduxActionsList = exports.ReduxActionsList = function () {
    function ReduxActionsList(options) {
        _classCallCheck(this, ReduxActionsList);

        _initialiseProps.call(this);

        this.config = options.config || config;
        this.headers = Object.keys(this.config.headers).length > 0 ? _extends({}, this.config.headers) : undefined;
        this.methods = this.setupMethods();
        this.axios = _axios2.default.create();
    }

    _createClass(ReduxActionsList, [{
        key: 'setupMethods',
        value: function setupMethods() {
            var methods = this.config.methods;

            return {
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
                headers: this.headers
            });
        }
    }, {
        key: 'fetchOne',
        value: function fetchOne(params) {
            var _this2 = this;

            return function (dispatch) {
                dispatch({ type: _this2.decorate('FETCH_{uppercaseName}'), payload: { params: params } });
                _this2.standAloneFetchOne(params).then(function (response) {
                    dispatch({
                        type: _this2.decorate('FETCH_{uppercaseName}_FULFILLED'),
                        payload: { data: response.data, params: params }
                    });
                }).catch(function (error) {
                    dispatch({ type: _this2.decorate('FETCH_{uppercaseName}_REJECTED'), payload: { error: error, params: params } });
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
                headers: this.headers,
                data: data
            });
        }
    }, {
        key: 'save',
        value: function save(data, params) {
            var _this3 = this;

            var create = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;

            return function (dispatch) {
                dispatch({ type: _this3.decorate('SAVE_{uppercaseName}'), payload: { data: data, params: params, create: create } });
                _this3.standAloneSave(data, params, create).then(function (response) {
                    dispatch({
                        type: _this3.decorate('SAVE_{uppercaseName}_FULFILLED'),
                        payload: { params: params, data: response.data, create: create }
                    });
                }).catch(function (error) {
                    dispatch({ type: _this3.decorate('SAVE_{uppercaseName}_REJECTED'), payload: { error: error, data: data, params: params, create: create } });
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
                headers: this.headers
            });
        }
    }, {
        key: 'remove',
        value: function remove(params) {
            var _this4 = this;

            return function (dispatch) {
                dispatch({ type: _this4.decorate('DELETE_{uppercaseName}'), payload: { params: params } });
                _this4.standAloneRemove(params).then(function (response) {
                    dispatch({
                        type: _this4.decorate('DELETE_{uppercaseName}_FULFILLED'),
                        payload: { params: params, data: response.data }
                    });
                }).catch(function (error) {
                    dispatch({ type: _this4.decorate('DELETE_{uppercaseName}_REJECTED'), payload: { error: error, params: params } });
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
                headers: this.headers
            });
        }
    }, {
        key: 'fetchAll',
        value: function fetchAll() {
            var _this5 = this;

            var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

            return function (dispatch) {
                dispatch({ type: _this5.decorate('FETCH_{uppercaseName}S'), payload: { params: params } });
                _this5.standAloneFetchAll(params).then(function (response) {
                    dispatch({
                        type: _this5.decorate('FETCH_{uppercaseName}S_FULFILLED'),
                        payload: { data: response.data }
                    });
                }).catch(function (error) {
                    dispatch({ type: _this5.decorate('FETCH_{uppercaseName}S_REJECTED'), payload: { error: error } });
                });
            };
        }
    }, {
        key: 'reset',
        value: function reset() {
            var _this6 = this;

            return function (dispatch) {
                dispatch({ type: _this6.decorate('RESET_{uppercaseName}S') });
            };
        }
    }, {
        key: 'resetTemp',
        value: function resetTemp() {
            var _this7 = this;

            return function (dispatch) {
                dispatch({ type: _this7.decorate('RESET_{uppercaseName}_TEMP') });
            };
        }
    }]);

    return ReduxActionsList;
}();

var _initialiseProps = function _initialiseProps() {
    var _this8 = this;

    this.decorate = function (str, options) {
        return (0, _index.interpolate)(str, options || _this8.config);
    };
};

exports.default = ReduxActionsList;