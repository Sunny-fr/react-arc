'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.AbstractContainer = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _ReduxActionsList = require('../actions/ReduxActionsList');

var _core = require('../actions/core');

var _core2 = _interopRequireDefault(_core);

var _utils = require('../utils');

var _reactRedux = require('react-redux');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var AbstractContainer = exports.AbstractContainer = function (_React$Component) {
    _inherits(AbstractContainer, _React$Component);

    function AbstractContainer(props) {
        _classCallCheck(this, AbstractContainer);

        var _this = _possibleConstructorReturn(this, (AbstractContainer.__proto__ || Object.getPrototypeOf(AbstractContainer)).call(this, props));

        _initialiseProps.call(_this);

        _this.updateARC(props.ARCConfig);
        _this.actions = new _ReduxActionsList.ReduxActionsList({ config: _this.ARCConfig });
        _this.core = _extends({}, _core2.default);
        _this.arcCancelPendingRequest = null;
        return _this;
    }

    _createClass(AbstractContainer, [{
        key: 'getTrueStoreState',
        value: function getTrueStoreState() {
            var store = this.context.store.getState();
            return {
                tempModel: store[this.ARCConfig.name].temp,
                loaded: store[this.ARCConfig.name].loaded,
                fetching: store[this.ARCConfig.name].fetching,
                error: store[this.ARCConfig.name].error,
                collection: store[this.ARCConfig.name].collection
            };
        }
    }, {
        key: 'updateARC',
        value: function updateARC(config) {
            this.ARCConfig = _extends({}, this.ARCConfig || (0, _utils.getDefaultConfig)(), config);
            if (this.actions) this.actions.updateConfig(this.ARCConfig);
        }
    }, {
        key: 'render',
        value: function render() {
            if (this.getError()) return null;
            if (!this.isLoaded()) return _react2.default.createElement(
                'p',
                null,
                'loading'
            );
            return _react2.default.createElement(
                'div',
                null,
                'loaded (you should do something with your view :) )'
            );
        }
    }]);

    return AbstractContainer;
}(_react2.default.Component);

AbstractContainer.contextType = _reactRedux.ReactReduxContext;

var _initialiseProps = function _initialiseProps() {
    var _this2 = this;

    this.getPropsFromTrueStoreState = function (props) {
        var ARCProps = _this2.getTrueStoreState();
        var baseProps = props || _this2.props;
        return _extends({}, baseProps, ARCProps);
    };
};

exports.default = AbstractContainer;