'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ARCProvider = function (_Component) {
    _inherits(ARCProvider, _Component);

    function ARCProvider() {
        _classCallCheck(this, ARCProvider);

        return _possibleConstructorReturn(this, (ARCProvider.__proto__ || Object.getPrototypeOf(ARCProvider)).apply(this, arguments));
    }

    _createClass(ARCProvider, [{
        key: 'getChildContext',
        value: function getChildContext() {
            var _props = this.props,
                store = _props.store,
                connect = _props.connect;

            return {
                store: store,
                connect: connect
            };
        }
    }, {
        key: 'render',
        value: function render() {
            return _react.Children.only(this.props.children);
        }
    }]);

    return ARCProvider;
}(_react.Component);

ARCProvider.propTypes = {
    store: _propTypes2.default.object.isRequired,
    connect: _propTypes2.default.func.isRequired
};
ARCProvider.childContextTypes = {
    store: _propTypes2.default.object.isRequired,
    connect: _propTypes2.default.func.isRequired
};
exports.default = ARCProvider;