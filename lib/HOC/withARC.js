'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

exports.withARC = withARC;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _defaultConfig = require('../defaultConfig');

var _defaultConfig2 = _interopRequireDefault(_defaultConfig);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

var connector = function connector(connect, config) {
    var extendedConfig = _extends({}, _defaultConfig2.default, config);
    var namespace = extendedConfig.name;
    return connect(function (store) {
        // Required Props
        var mapStateToProps = function mapStateToProps(store) {
            return {
                tempModel: store[namespace].temp,
                loaded: store[namespace].loaded,
                fetching: store[namespace].fetching,
                error: store[namespace].error,
                collection: store[namespace].collection
            };
        };
        return Object.assign({}, mapStateToProps(store));
    }, null, null, {
        forwardRef: true
    });
};

var ARCLoader = function ARCLoader(_ref) {
    var ARCWrappedComponent = _ref.ARCWrappedComponent,
        ARCConnect = _ref.ARCConnect,
        props = _objectWithoutProperties(_ref, ['ARCWrappedComponent', 'ARCConnect']);

    var Component = connector(ARCConnect, props.ARCConfig)(ARCWrappedComponent);
    return _react2.default.createElement(Component, props);
};

function withARC(ARCConfig) {
    return function HOC(Wrapped) {
        var _class, _temp;

        return _temp = _class = function (_React$PureComponent) {
            _inherits(ConnectLoader, _React$PureComponent);

            function ConnectLoader() {
                _classCallCheck(this, ConnectLoader);

                return _possibleConstructorReturn(this, (ConnectLoader.__proto__ || Object.getPrototypeOf(ConnectLoader)).apply(this, arguments));
            }

            _createClass(ConnectLoader, [{
                key: 'render',
                value: function render() {
                    return _react2.default.createElement(ARCLoader, _extends({
                        ARCConfig: ARCConfig,
                        ARCConnect: this.context.connect,
                        ARCWrappedComponent: Wrapped
                    }, this.props));
                }
            }]);

            return ConnectLoader;
        }(_react2.default.PureComponent), _class.contextTypes = {
            connect: _propTypes2.default.func.isRequired
        }, _temp;
    };
}