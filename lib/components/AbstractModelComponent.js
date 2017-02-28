'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.AbstractModelComponent = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _ReduxActionsList = require('../actions/ReduxActionsList');

var _AbstractComponent2 = require('./AbstractComponent');

var _AbstractComponent3 = _interopRequireDefault(_AbstractComponent2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var AbstractModelComponent = exports.AbstractModelComponent = function (_AbstractComponent) {
    _inherits(AbstractModelComponent, _AbstractComponent);

    function AbstractModelComponent() {
        var _ref;

        var _temp, _this, _ret;

        _classCallCheck(this, AbstractModelComponent);

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = AbstractModelComponent.__proto__ || Object.getPrototypeOf(AbstractModelComponent)).call.apply(_ref, [this].concat(args))), _this), _this._hasRequiredParams = function (props) {
            var requiredProps = _this.ARCConfig.modelProps;
            return requiredProps.reduce(function (valid, prop) {
                return valid === true && props[prop] ? valid : false;
            }, true);
        }, _this.getParams = function (props) {
            var source = props || _this.props;
            if (!_this._hasRequiredParams(source)) return null;
            return (0, _ReduxActionsList.extractParams)(_this.ARCConfig.modelProps, source);
        }, _this.fetch = function (params) {
            _this.props.dispatch(_this.actions.fetchOne(params));
        }, _temp), _possibleConstructorReturn(_this, _ret);
    }

    /** CUSTOMIZE HERE FOR ADVANCED USAGE **/


    /* ACTIONS */

    _createClass(AbstractModelComponent, [{
        key: '_getModel',


        /* ACTIONS */

        value: function _getModel(newProps) {
            var props = newProps || this.props;
            return this.isNew(props) ? props.tempModel : props.collection[this.getKey(props)];
        }
    }, {
        key: 'isNew',
        value: function isNew(props) {
            return !this.getKey(props);
        }
    }, {
        key: 'getKey',
        value: function getKey(props) {
            var params = this.getParams(props || this.props);
            return !params ? null : (0, _ReduxActionsList.interpolate)(null, params);
        }
    }, {
        key: 'getModel',
        value: function getModel(props) {
            return this._getModel(props).model;
        }
    }, {
        key: 'getMetas',
        value: function getMetas(prop, newProps) {
            if (!this._getModel(newProps)) return null;
            return prop ? this._getModel(newProps).metas[prop] : this._getModel(newProps).metas;
        }
    }, {
        key: 'gotError',
        value: function gotError(props) {
            return !!this.getMetas('error', props || this.props);
        }
    }, {
        key: 'isFetching',
        value: function isFetching(props) {
            return this.getMetas('fetching', props);
        }
    }, {
        key: 'isLoaded',
        value: function isLoaded(props) {
            return !(!this._getModel(props) || !this.getMetas('loaded', props));
        }
    }, {
        key: 'canUpdate',
        value: function canUpdate(_props) {
            var props = _props || this.props;
            //console.log(this.getKey(props),'is new',this.isNew(props), 'is loaded',this.isLoaded(props), 'is fetching', this.isFetching(props), 'issued',  this.gotError(props))
            return !this.isNew(props) && !this.isLoaded(props) && !this.isFetching(props) && !this.gotError(props);
        }
    }, {
        key: 'componentWillReceiveProps',
        value: function componentWillReceiveProps(props) {
            if (this.canUpdate(props)) this.fetch(this.getParams(props));
        }
    }, {
        key: 'componentWillMount',
        value: function componentWillMount() {
            //fetch once :
            //if (this.canUpdate()) this.fetch(this.getParams())
            //always refetch
            this.fetch(this.getParams());
        }
    }]);

    return AbstractModelComponent;
}(_AbstractComponent3.default);

exports.default = AbstractModelComponent;