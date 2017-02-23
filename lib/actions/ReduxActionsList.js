'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.ReduxActionsList = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

exports.flatten = flatten;
exports.interpolate = interpolate;

var _axios = require('axios');

var _axios2 = _interopRequireDefault(_axios);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function flatten(node) {
    return Object.keys(node).map(function (nodeName) {
        return node[nodeName].model;
    });
}

function interpolate(str, params) {
    var keys = Object.keys(params);
    return keys.reduce(function (prev, current) {
        return prev.replace(new RegExp('{' + current + '}', 'g'), params[current]);
    }, str || keys.map(function (v) {
        return '{' + v + '}';
    }).join(':'));
}

var ReduxActionsList = exports.ReduxActionsList = function () {
    function ReduxActionsList(options) {
        var _this = this;

        _classCallCheck(this, ReduxActionsList);

        this.decorate = function (str) {
            return interpolate(str, _this.config);
        };

        this.config = options.config || config;
    }

    _createClass(ReduxActionsList, [{
        key: 'edit',


        /** EDITING **/
        value: function edit(data, params) {
            var _this2 = this;

            return function (dispatch) {
                dispatch({ type: _this2.decorate('EDIT_{uppercaseName}'), payload: { data: data, params: params } });
            };
        }

        /** SINGLE ITEM **/

    }, {
        key: 'fetchOne',
        value: function fetchOne(params) {
            var _this3 = this;

            return function (dispatch) {
                dispatch({ type: _this3.decorate('FETCH_{uppercaseName}'), payload: { params: params } });
                var url = _this3.decorate(_this3.config.paths.item, params);
                _axios2.default.get(url).then(function (response) {
                    dispatch({
                        type: _this3.decorate('FETCH_{uppercaseName}_FULFILLED'),
                        payload: { data: response.data, params: params }
                    });
                }).catch(function (error) {
                    dispatch({ type: _this3.decorate('FETCH_{uppercaseName}_REJECTED'), payload: { error: error, params: params } });
                });
            };
        }

        /**  SAVE **/

    }, {
        key: 'save',
        value: function save(data, params) {
            var _this4 = this;

            return function (dispatch) {
                dispatch({ type: _this4.decorate('SAVE_{uppercaseName}'), payload: { data: data } });
                var method = 'put';
                var url = _this4.decorate(_this4.config.paths.item, params);
                _axios2.default[method](url, data).then(function (response) {
                    dispatch({
                        type: _this4.decorate('SAVE_{uppercaseName}_FULFILLED'),
                        payload: { params: data, data: response.data }
                    });
                }).catch(function (error) {
                    dispatch({ type: _this4.decorate('SAVE_{uppercaseName}_REJECTED'), payload: { error: error, data: data } });
                });
            };
        }

        /** REMOVE **/

    }, {
        key: 'remove',
        value: function remove(data, params) {
            var _this5 = this;

            return function (dispatch) {
                dispatch({ type: _this5.decorate('DELETE_{uppercaseName}'), payload: { data: data } });
                var url = _this5.decorate(_this5.config.paths.item, params);
                _axios2.default.delete(url).then(function (response) {
                    dispatch({
                        type: _this5.decorate('DELETE_{uppercaseName}_FULFILLED'),
                        payload: { params: data, data: response.data }
                    });
                }).catch(function (error) {
                    dispatch({ type: _this5.decorate('DELETE_{uppercaseName}_REJECTED'), payload: { error: error, data: data } });
                });
            };
        }

        /** LISTS **/

    }, {
        key: 'fetchAll',
        value: function fetchAll() {
            var _this6 = this;

            return function (dispatch) {
                var url = _this6.config.paths.list;
                dispatch({ type: _this6.decorate('FETCH_{uppercaseName}S'), payload: {} });
                _axios2.default.get(url).then(function (response) {
                    dispatch({
                        type: _this6.decorate('FETCH_{uppercaseName}S_FULFILLED'),
                        payload: { data: response.data }
                    });
                }).catch(function (error) {
                    dispatch({ type: _this6.decorate('FETCH_{uppercaseName}S_REJECTED'), payload: { error: error } });
                });
            };
        }
    }, {
        key: 'reset',
        value: function reset() {
            var _this7 = this;

            return function (dispatch) {
                dispatch({ type: _this7.decorate('RESET_{uppercaseName}S') });
            };
        }
    }, {
        key: 'resetTemp',
        value: function resetTemp() {
            var _this8 = this;

            return function (dispatch) {
                dispatch({ type: _this8.decorate('RESET_{uppercaseName}_TEMP') });
            };
        }
    }]);

    return ReduxActionsList;
}();

exports.default = ReduxActionsList;