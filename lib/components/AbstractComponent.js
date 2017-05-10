'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.AbstractComponent = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _ReduxActionsList = require('../actions/ReduxActionsList');

var _defaultConfig = require('../defaultConfig');

var _defaultConfig2 = _interopRequireDefault(_defaultConfig);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var AbstractComponent = exports.AbstractComponent = function (_React$Component) {
    _inherits(AbstractComponent, _React$Component);

    function AbstractComponent(props) {
        _classCallCheck(this, AbstractComponent);

        var _this = _possibleConstructorReturn(this, (AbstractComponent.__proto__ || Object.getPrototypeOf(AbstractComponent)).call(this, props));

        _this.updateARC(props.ARCConfig);
        _this.actions = new _ReduxActionsList.ReduxActionsList({ config: _this.ARCConfig });
        return _this;
    }

    _createClass(AbstractComponent, [{
        key: 'updateARC',
        value: function updateARC(config) {
            this.ARCConfig = _extends({}, this.ARCConfig || _defaultConfig2.default, config);
            if (this.actions) this.actions.updateConfig(this.ARCConfig);
        }
    }, {
        key: 'render',
        value: function render() {
            if (this.gotError()) return null;
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

    return AbstractComponent;
}(_react2.default.Component);

exports.default = AbstractComponent;