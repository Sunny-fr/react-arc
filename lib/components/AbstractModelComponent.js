'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.AbstractModelComponent = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _utils = require('../utils');

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

        return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = AbstractModelComponent.__proto__ || Object.getPrototypeOf(AbstractModelComponent)).call.apply(_ref, [this].concat(args))), _this), _this.fetch = function (params) {
            _this.props.dispatch(_this.actions.fetchOne(params));
        }, _this.edit = function (model) {
            _this.props.dispatch(_this.actions.edit(model, _this.getParams()));
        }, _this.save = function () {
            var isNew = _this.isNew();
            var model = _this.getModel();
            var params = isNew ? _this.getParams(model) : _this.getParams();
            _this.props.dispatch(_this.actions.save(model, params, isNew));
        }, _this.remove = function () {
            if (_this.isNew()) _this.resetTempModel();else {
                var params = _this.getParams();
                _this.props.dispatch(_this.actions.remove(params));
            }
        }, _this.resetTempModel = function () {
            _this.props.dispatch(_this.actions.resetTemp());
        }, _this.getParams = function (props) {
            var source = props || _this.props;
            if (!_this._hasRequiredParams(source)) return null;
            return (0, _utils.extractParams)(_this.ARCConfig.modelProps, source);
        }, _this._allowRefetch = function (_props) {
            var props = _props || _this.props;
            return !(_this.ARCConfig.fetchOnce && _this.isLoaded(props));
        }, _this._hasRequiredParams = function (props) {
            var requiredProps = _this.ARCConfig.modelProps;
            return requiredProps.reduce(function (valid, prop) {
                return valid === true && props[prop] ? valid : false;
            }, true);
        }, _temp), _possibleConstructorReturn(_this, _ret);
    }

    /** PUBLIC ACTIONS METHODS **/

    /* public
     * Fetch a model */


    /* public
     * edit a model without sending it to the server */


    /* public
     * save a model */


    /* public
     * deletes a model */


    /* public
     * resets the temp model (clearing forms etc..) */


    /** PUBLIC METHODS **/

    /* public
     * retrieve params from props or model */
    /* CUSTOMIZE HERE FOR ADVANCED USAGE */


    _createClass(AbstractModelComponent, [{
        key: 'isNew',


        /* public
         * if the component has not the required params it will be set as new */
        value: function isNew(props) {
            return !this.getKey(props);
        }

        /* public
         * returns null or string
         * acts as unique identifier (based on required props) */

    }, {
        key: 'getKey',
        value: function getKey(props) {
            var params = this.getParams(props || this.props);
            return !params ? null : (0, _utils.interpolate)(null, params);
        }

        /* public
         * returns model (data retrieved from the server) */

    }, {
        key: 'getModel',
        value: function getModel(props) {
            return this._getModel(props).model;
        }

        /* public
         * returns metas (loaded, error, etc.) */

    }, {
        key: 'getMetas',
        value: function getMetas(prop, newProps) {
            if (!this._getModel(newProps)) return null;
            return prop ? this._getModel(newProps).metas[prop] : this._getModel(newProps).metas;
        }

        /* public
         * returns  error */

    }, {
        key: 'getError',
        value: function getError(props) {
            return this.getMetas('error', props || this.props);
        }

        /* public
         * returns bool if there's any activity */

    }, {
        key: 'isSyncing',
        value: function isSyncing(props) {
            return this.getMetas('fetching', props || this.props);
        }

        /* public
         * returns bool if the model has been loaded at least one time */

    }, {
        key: 'isLoaded',
        value: function isLoaded(props) {
            if (this.isNew(props)) return true;
            return !(!this._getModel(props) || !this.getMetas('loaded', props));
        }

        /* private
         * get a model an its metas data
         */

    }, {
        key: '_getModel',
        value: function _getModel(newProps) {
            var props = newProps || this.props;
            return this.isNew(props) ? props.tempModel : props.collection[this.getKey(props)];
        }

        /* private
         * performs a fetch if the flag fetchOnce is set to false
         */


        /* private
         * checks if the component has the required params based on modelProps in config
         */

    }, {
        key: '_canUpdate',


        /* private
         * detects if we need to fetch again
         */
        value: function _canUpdate(_props) {
            var props = _props || this.props;
            //console.log(this.getKey(props),'is new',this.isNew(props), 'is loaded',this.isLoaded(props), 'is fetching', this.isSyncing(props), 'issued',  this.getError(props))
            return !this.isNew(props) && !this.isLoaded(props) && !this.isSyncing(props) && !this.getError(props);
        }
    }, {
        key: 'componentWillReceiveProps',
        value: function componentWillReceiveProps(props) {
            if (this._canUpdate(props)) this.fetch(this.getParams(props));
        }
    }, {
        key: '_errorRefetch',
        value: function _errorRefetch() {
            return !(this.ARCConfig.refetchOnError && this.getError());
        }
    }, {
        key: 'componentWillMount',
        value: function componentWillMount() {
            if (!this.isNew(this.props) && this._allowRefetch() && this._errorRefetch()) this.fetch(this.getParams());
        }
    }]);

    return AbstractModelComponent;
}(_AbstractComponent3.default);

exports.default = AbstractModelComponent;