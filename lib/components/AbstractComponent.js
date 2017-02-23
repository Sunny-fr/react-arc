'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.AbstractFormModelComponent = exports.AbstractModelComponent = exports.AbstractCollectionComponent = exports.AbstractComponent = exports.config = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _ReduxActionsList = require('../actions/ReduxActionsList');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

//EXAMPLE CONFIG
var config = exports.config = {
    name: 'something',
    uppercaseName: 'SOMETHING',
    paths: {
        item: '/some/url',
        list: '/some/other/url'
    }
};

var AbstractComponent = exports.AbstractComponent = function (_React$Component) {
    _inherits(AbstractComponent, _React$Component);

    function AbstractComponent(props) {
        _classCallCheck(this, AbstractComponent);

        var _this = _possibleConstructorReturn(this, (AbstractComponent.__proto__ || Object.getPrototypeOf(AbstractComponent)).call(this, props));

        _this.ARCConfig = _extends({}, props.ARCConfig);
        _this.actions = new _ReduxActionsList.ReduxActionsList({ config: _this.ARCConfig });
        return _this;
    }

    _createClass(AbstractComponent, [{
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

var AbstractCollectionComponent = exports.AbstractCollectionComponent = function (_AbstractComponent) {
    _inherits(AbstractCollectionComponent, _AbstractComponent);

    function AbstractCollectionComponent() {
        var _ref;

        var _temp, _this2, _ret;

        _classCallCheck(this, AbstractCollectionComponent);

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        return _ret = (_temp = (_this2 = _possibleConstructorReturn(this, (_ref = AbstractCollectionComponent.__proto__ || Object.getPrototypeOf(AbstractCollectionComponent)).call.apply(_ref, [this].concat(args))), _this2), _this2.remove = function (data) {
            _this2.props.dispatch(_this2.actions.remove(data));
        }, _this2.fetch = function () {
            _this2.props.dispatch(_this2.actions.fetchAll());
        }, _temp), _possibleConstructorReturn(_this2, _ret);
    }

    _createClass(AbstractCollectionComponent, [{
        key: 'getCollection',
        value: function getCollection() {
            return (0, _ReduxActionsList.flatten)(this.props.collection);
        }
    }, {
        key: 'gotError',
        value: function gotError(_props) {
            var props = _props || this.props;
            return props.error;
        }
    }, {
        key: 'isLoaded',
        value: function isLoaded() {
            return this.props.collectionLoaded;
        }
    }, {
        key: 'componentWillMount',
        value: function componentWillMount() {
            if (!this.isLoaded()) this.fetch();
        }
    }, {
        key: 'componentWillUnmount',
        value: function componentWillUnmount() {
            this.props.dispatch(this.actions.reset());
        }
    }]);

    return AbstractCollectionComponent;
}(AbstractComponent);

var AbstractModelComponent = exports.AbstractModelComponent = function (_AbstractComponent2) {
    _inherits(AbstractModelComponent, _AbstractComponent2);

    function AbstractModelComponent() {
        var _ref2;

        var _temp2, _this3, _ret2;

        _classCallCheck(this, AbstractModelComponent);

        for (var _len2 = arguments.length, args = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
            args[_key2] = arguments[_key2];
        }

        return _ret2 = (_temp2 = (_this3 = _possibleConstructorReturn(this, (_ref2 = AbstractModelComponent.__proto__ || Object.getPrototypeOf(AbstractModelComponent)).call.apply(_ref2, [this].concat(args))), _this3), _this3.getParams = function (props) {
            var source = props || _this3.props;
            //if (!source.id) return null
            var id = source.id;

            return !id ? null : { id: id };
        }, _this3.fetch = function (params) {
            _this3.props.dispatch(_this3.actions.fetchOne(params));
        }, _temp2), _possibleConstructorReturn(_this3, _ret2);
    }

    /** CUSTOMIZE HERE **/


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
            if (this.canUpdate()) this.fetch(this.getParams());
        }
    }]);

    return AbstractModelComponent;
}(AbstractComponent);

var AbstractFormModelComponent = exports.AbstractFormModelComponent = function (_AbstractModelCompone) {
    _inherits(AbstractFormModelComponent, _AbstractModelCompone);

    _createClass(AbstractFormModelComponent, [{
        key: 'componentDidUpdate',
        value: function componentDidUpdate() {
            /** CUSTOMIZE HERE **/
            if (this.props.forward) {
                this.resetTempModel();

                var _getModel2 = this.getModel(),
                    id = _getModel2.id;
            }
        }
    }]);

    function AbstractFormModelComponent(props) {
        _classCallCheck(this, AbstractFormModelComponent);

        var _this4 = _possibleConstructorReturn(this, (AbstractFormModelComponent.__proto__ || Object.getPrototypeOf(AbstractFormModelComponent)).call(this, props));

        _this4.edit = function (model) {
            _this4.props.dispatch(_this4.actions.update(model, _this4.getParams()));
        };

        _this4.submit = function () {
            var model = _this4.getModel();
            var params = _this4.isNew() ? _this4.getParams(model.id) : _this4.getParams();
            _this4.props.dispatch(_this4.actions.save(model, params));
        };

        _this4.resetTempModel = function () {
            _this4.props.dispatch(_this4.actions.resetTemp());
        };

        _this4.setSilentState = function (data) {
            _this4.silentState = Object.assign({}, _this4.silentState, data);
        };

        _this4.changeProp = function (prop, value) {
            _this4.setPristine(prop);
            _this4.edit(_defineProperty({}, prop, value));
        };

        _this4.getEditedStatus = function (prop) {
            return prop ? _this4.silentState.edited[prop] : _this4.silentState.edited;
        };

        _this4.silentState = {
            edited: {} // Not pristines :-)
        };
        return _this4;
    }

    /* ACTIONS */

    /* ACTIONS */

    _createClass(AbstractFormModelComponent, [{
        key: 'setPristine',
        value: function setPristine(prop) {
            var edited = _extends({}, this.silentState.edited, _defineProperty({}, prop, true));
            this.setSilentState({ edited: edited });
        }
    }]);

    return AbstractFormModelComponent;
}(AbstractModelComponent);