'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

exports.useARC = useARC;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _utils = require('../utils');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var ARC = function () {
    function ARC(_ref) {
        var ARCConfig = _ref.ARCConfig;

        _classCallCheck(this, ARC);

        this.config = ARC.createConfig(ARCConfig);
    }

    _createClass(ARC, [{
        key: 'hasRequiredParams',
        value: function hasRequiredParams(props) {
            return this.config.modelProps.reduce(function (valid, prop) {
                return valid === true && typeof props[prop] !== 'undefined' ? valid : false;
            }, true);
        }
    }, {
        key: 'extractParams',
        value: function extractParams(props) {
            return (0, _utils.extractParams)(this.config.modelProps, props);
        }
    }, {
        key: 'applyHeaders',
        value: function applyHeaders(headers, props) {
            // MUST BE PROPS !!!
            // OR PARAMS MUST TAKE THE CHARGE OF HAVING SPECIALS PROPS SUCH AS TOKEN
            if (Object.keys(headers || {}).length < 1) {
                return undefined;
            }
            return Object.keys(headers).reduce(function (state, header) {
                return _extends({}, state, _defineProperty({}, header, (0, _utils.interpolate)(headers[header], props)));
            }, {});
        }
    }, {
        key: 'get',
        value: function get(_ref2) {
            var props = _ref2.props,
                params = _ref2.params;

            var p = params || this.extractParams(props);
            return fetch((0, _utils.interpolate)(this.config.paths.read || this.config.paths.item, p), {
                method: this.config.methods['read'],
                headers: this.applyHeaders(this.config.headers, props)
            }).then(ARC.json);
        }
    }, {
        key: 'remove',
        value: function remove(_ref3) {
            var props = _ref3.props,
                params = _ref3.params;

            var p = params || this.extractParams(props);
            return fetch((0, _utils.interpolate)(this.config.paths.delete || this.config.paths.item, p), {
                method: this.config.methods['delete'],
                headers: this.applyHeaders(this.config.headers, props)
            }).then(ARC.json);
        }
    }, {
        key: 'create',
        value: function create(_ref4) {
            var props = _ref4.props,
                body = _ref4.body,
                params = _ref4.params;

            var p = params || this.extractParams(props);
            // WARNING !!
            return fetch((0, _utils.interpolate)(this.config.paths.create || this.config.paths.item, p), {
                method: this.config.methods['create'],
                headers: this.applyHeaders(this.config.headers, props),
                body: JSON.stringify(body)
            }).then(ARC.json);
        }
    }, {
        key: 'update',
        value: function update(_ref5) {
            var props = _ref5.props,
                body = _ref5.body,
                params = _ref5.params;

            var p = params || this.extractParams(props);
            return fetch((0, _utils.interpolate)(this.config.paths.update || this.config.paths.item, p), {
                method: this.config.methods['update'],
                headers: this.applyHeaders(this.config.headers, props),
                body: JSON.stringify(body)
            }).then(ARC.json);
        }
    }], [{
        key: 'createConfig',
        value: function createConfig(ARCConfig) {
            var config = ARC.extendConfig(ARCConfig);
            config.headers = ARC.extendHeaders(config);
            config.methods = ARC.extendMethods(config);
            return config;
        }
    }, {
        key: 'extendConfig',
        value: function extendConfig(ARCConfig) {
            return _extends({}, (0, _utils.getDefaultConfig)(), ARCConfig || {});
        }
    }, {
        key: 'extendHeaders',
        value: function extendHeaders(ARCConfig) {
            return Object.keys(ARCConfig.headers).length > 0 ? _extends({}, ARCConfig.headers) : undefined;
        }
    }, {
        key: 'extendMethods',
        value: function extendMethods(extendedConfig) {
            var methods = extendedConfig.methods;

            return {
                create: methods.create.toLowerCase(),
                read: methods.read.toLowerCase(),
                update: methods.update.toLowerCase(),
                delete: methods.delete.toLowerCase()
            };
        }
    }, {
        key: 'jsonOrText',
        value: function jsonOrText(str) {
            try {
                return JSON.parse(str);
            } catch (e) {
                return str;
            }
        }
    }, {
        key: 'json',
        value: function json(response) {
            if (response.ok) {
                return response.text().then(function (rawResponseBody) {
                    return Promise.resolve(ARC.jsonOrText(rawResponseBody));
                });
            }
            return response.text().then(function (rawResponseBody) {
                return Promise.reject({
                    content: ARC.jsonOrText(rawResponseBody),
                    response: response
                });
            });
        }
    }]);

    return ARC;
}();

function useARC(_ref6) {
    var ARCConfig = _ref6.ARCConfig,
        props = _ref6.props;

    var arc = new ARC({ ARCConfig: ARCConfig });
    var defaultProps = props;

    var _useState = (0, _react.useState)({ error: null, loading: false, loaded: false, response: null }),
        _useState2 = _slicedToArray(_useState, 2),
        state = _useState2[0],
        setState = _useState2[1];

    var handle = function handle(fetcher) {
        if (state.pending) return;
        setState(_extends({}, state, { error: null, loading: true }));
        return fetcher().then(function (response) {
            setState(_extends({}, state, { loaded: true, error: null, loading: false, response: response }));
            return response;
        }).catch(function (error) {
            setState(_extends({}, state, { error: error, loading: false }));
        });
    };

    var params = (0, _react.useRef)(arc.extractParams(props));

    (0, _react.useEffect)(function () {
        if (arc.hasRequiredParams(params.current)) {
            handle(function () {
                return arc.get({ props: props, params: params.current });
            });
        }
    }, [params]);

    return {
        error: state.error,
        loading: state.loading,
        loaded: state.loaded,
        response: state.response,
        arc: {
            arc: arc,
            get: function get() {
                var args = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
                var props = args.props,
                    params = args.params;

                return handle(function () {
                    return arc.get({ props: props || defaultProps, params: params });
                });
            },
            remove: function remove() {
                var args = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
                var props = args.props,
                    params = args.params;

                return handle(function () {
                    return arc.remove({ props: props || defaultProps, params: params });
                });
            },
            create: function create() {
                var args = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
                var props = args.props,
                    params = args.params,
                    body = args.body;

                return handle(function () {
                    return arc.create({ props: props || defaultProps, params: params, body: body });
                });
            },
            update: function update() {
                var args = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
                var props = args.props,
                    params = args.params,
                    body = args.body;

                return handle(function () {
                    return arc.update({ props: props || defaultProps, params: params, body: body });
                });
            },
            extract: function extract(props) {
                return arc.extractParams(props || defaultProps);
            },
            extractParams: function extractParams(props) {
                return arc.extractParams(props || defaultProps);
            },
            custom: function custom(fetcher) {
                return handle(fetcher);
            }
        }
    };
}