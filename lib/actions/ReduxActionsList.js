'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.ReduxActionsList = undefined;

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
        this.methods = this.setupMethods();
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
        key: 'fetchOne',
        value: function fetchOne(params) {
            var _this2 = this;

            return function (dispatch) {
                dispatch({ type: _this2.decorate('FETCH_{uppercaseName}'), payload: { params: params } });
                var url = _this2.decorate(_this2.config.paths.item, params);
                _axios2.default[_this2.methods.read](url).then(function (response) {
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
        key: 'save',
        value: function save(data, params) {
            var _this3 = this;

            var create = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;

            return function (dispatch) {
                dispatch({ type: _this3.decorate('SAVE_{uppercaseName}'), payload: { data: data, params: params, create: create } });
                var method = create ? _this3.methods.create : _this3.methods.update;
                //TODO remove magic ?
                var url = _this3.decorate(_this3.config.paths.item, method === 'post' ? {} : params);
                _axios2.default[method](url, data).then(function (response) {
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
        key: 'remove',
        value: function remove(data, params) {
            var _this4 = this;

            return function (dispatch) {
                dispatch({ type: _this4.decorate('DELETE_{uppercaseName}'), payload: { data: data } });
                var url = _this4.decorate(_this4.config.paths.item, params);
                _axios2.default[_this4.methods.delete](url).then(function (response) {
                    dispatch({
                        type: _this4.decorate('DELETE_{uppercaseName}_FULFILLED'),
                        payload: { params: params, data: response.data }
                    });
                }).catch(function (error) {
                    dispatch({ type: _this4.decorate('DELETE_{uppercaseName}_REJECTED'), payload: { error: error, data: data, params: params } });
                });
            };
        }

        /** LISTS **/

    }, {
        key: 'fetchAll',
        value: function fetchAll() {
            var _this5 = this;

            var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

            return function (dispatch) {
                var url = _this5.decorate(_this5.config.paths.collection, params);
                dispatch({ type: _this5.decorate('FETCH_{uppercaseName}S'), payload: {} });
                _axios2.default[_this5.methods.read](url).then(function (response) {
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