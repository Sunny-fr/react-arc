'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.AbstractModelContainer = undefined;

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _utils = require('../utils');

var _AbstractContainer2 = require('./AbstractContainer');

var _AbstractContainer3 = _interopRequireDefault(_AbstractContainer2);

var _index = require('../utils/index');

var _deepEqual = require('deep-equal');

var _deepEqual2 = _interopRequireDefault(_deepEqual);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var AbstractModelContainer = exports.AbstractModelContainer = function (_AbstractContainer) {
    _inherits(AbstractModelContainer, _AbstractContainer);

    function AbstractModelContainer() {
        var _ref;

        var _temp, _this, _ret;

        _classCallCheck(this, AbstractModelContainer);

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = AbstractModelContainer.__proto__ || Object.getPrototypeOf(AbstractModelContainer)).call.apply(_ref, [this].concat(args))), _this), _this.fetch = function (params) {
            _this.props.dispatch(_this.actions.fetchOne(params));
        }, _this.edit = function (model) {
            _this.props.dispatch(_this.actions.edit(model, _this.getParams()));
        }, _this.save = function () {
            var isNew = AbstractModelContainer.isNew(_this.props);
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
        }, _this._allowReFetch = function (props) {
            return AbstractModelContainer._allowReFetch(_this.ARCConfig, props || _this.props);
        }, _temp), _possibleConstructorReturn(_this, _ret);
    }

    _createClass(AbstractModelContainer, [{
        key: 'isNew',
        value: function isNew(props) {
            return AbstractModelContainer.isNew(this.ARCConfig, props || this.props);
        }

        /* public
         * returns null or string
         * acts as unique identifier (based on required props) */

    }, {
        key: 'getKey',
        value: function getKey(props) {
            return AbstractModelContainer.getKey(this.ARCConfig, props || this.props);
        }

        /* public
         * retrieve params from props or model */

        /* CUSTOMIZE HERE FOR ADVANCED USAGE */

    }, {
        key: 'getParams',
        value: function getParams(props) {
            return AbstractModelContainer.getParams(this.ARCConfig, props || this.props);
        }

        /* private
         * checks if the component has the required params based on modelProps in config
         */

    }, {
        key: '_hasRequiredParams',
        value: function _hasRequiredParams(ARCConfig, props) {
            return AbstractModelContainer._hasRequiredParams(this.ARCConfig, props || this.props);
        }

        /* private
         * get a model an its metas data
         */

    }, {
        key: '_getModel',
        value: function _getModel(props) {
            return AbstractModelContainer._getModel(this.ARCConfig, props || this.props);
        }

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

    }, {
        key: 'getModel',
        value: function getModel(props) {
            return AbstractModelContainer.getModel(this.ARCConfig, props || this.props);
        }

        /* public
         * returns metas (loaded, error, etc.) */

    }, {
        key: 'getMetas',
        value: function getMetas(prop, props) {
            return AbstractModelContainer.getMetas(this.ARCConfig, prop, props || this.props);
        }

        /* public
         * returns  error */

    }, {
        key: 'getError',
        value: function getError(props) {
            return AbstractModelContainer.getError(this.ARCConfig, props || this.props);
        }

        /* public
         * returns bool if there's any activity */

    }, {
        key: 'isSyncing',
        value: function isSyncing(props) {
            return AbstractModelContainer.isSyncing(this.ARCConfig, props || this.props);
        }

        /* public
         * returns bool if the model has been loaded at least one time */

    }, {
        key: 'isLoaded',
        value: function isLoaded(props) {
            return AbstractModelContainer.isLoaded(this.ARCConfig, props || this.props);
        }

        /* private
         * performs a fetch if the flag fetchOnce is set to false
         */

    }, {
        key: '_errorReFetch',
        value: function _errorReFetch(props) {
            //can re fetch on error
            return AbstractModelContainer._errorReFetch(this.ARCConfig, props || this.props);
        }
    }, {
        key: 'componentDidUpdate',
        value: function componentDidUpdate() {
            var props = this._getPropsFromTrueStoreState(this.props);
            if (this._fetchAuthorization(props, { skipReFetchStep: true })) {
                this.fetch(this.getParams());
            }
        }
    }, {
        key: '_fetchAuthorization',
        value: function _fetchAuthorization(props, _ref2) {
            var _ref2$skipReFetchStep = _ref2.skipReFetchStep,
                skipReFetchStep = _ref2$skipReFetchStep === undefined ? false : _ref2$skipReFetchStep;

            if (this.isNew(props)) {
                //console.log('//model is new no data to be retrieved')
                return false;
            }

            if (typeof this._getModel(props) === 'undefined') {
                //console.log('//model has never been fetch, its ok to fetch')
                return true;
            }

            if (this.isSyncing(props)) {
                //console.log('//model seems to be loading we dont allow to fetch it again')
                return false;
            }

            if (!skipReFetchStep && this._allowReFetch(props)) {
                //console.log('//model seems to be loaded but its ok to re-fetch it')
                return true;
            }

            if (!skipReFetchStep && this._errorReFetch(props)) {
                //console.log('//model had an error previously, but its ok to refetch it')
                return true;
            }
        }
    }, {
        key: 'componentDidMount',
        value: function componentDidMount() {
            var props = this._getPropsFromTrueStoreState(this.props);
            if (this._fetchAuthorization(props, {})) {
                this.fetch(this.getParams());
            }
        }
    }, {
        key: 'shouldComponentUpdate',
        value: function shouldComponentUpdate(nextProps, nextState) {

            if ((typeof nextProps === 'undefined' ? 'undefined' : _typeof(nextProps)) !== _typeof(this.props) || (typeof nextState === 'undefined' ? 'undefined' : _typeof(nextState)) !== _typeof(this.state)) return true;

            var propsThatChanged = (0, _index.changedProps)(this.props, nextProps);
            var statesThatChanged = (0, _index.changedProps)(this.state, nextState);

            if (statesThatChanged.length === 0 && propsThatChanged.length === 0) return false;

            //if (!this.isLoaded(this.props) || !this._getModel(nextProps)) return true

            if (propsThatChanged.length === 1 && propsThatChanged.includes('collection')) {
                var prevModel = this._getModel(this.props);
                var nextModel = this._getModel(nextProps);
                return !(0, _deepEqual2.default)(prevModel, nextModel);
            }

            return statesThatChanged.length > 0 || propsThatChanged.length > 0;
        }
    }], [{
        key: 'isNew',


        /** PUBLIC ACTIONS METHODS **/

        /* public
         * if the component has not the required params it will be set as new */
        value: function isNew(ARCConfig, props) {
            return !AbstractModelContainer.getKey(ARCConfig, props);
        }
    }, {
        key: 'getKey',
        value: function getKey(ARCConfig, props) {
            var params = AbstractModelContainer.getParams(ARCConfig, props);
            return !params ? null : (0, _utils.interpolate)(null, params);
        }
    }, {
        key: 'getParams',
        value: function getParams(ARCConfig, props) {
            if (!AbstractModelContainer._hasRequiredParams(ARCConfig, props)) return null;
            return (0, _utils.extractParams)(ARCConfig.modelProps, props);
        }
    }, {
        key: '_hasRequiredParams',
        value: function _hasRequiredParams(ARCConfig, props) {
            var result = ARCConfig.modelProps.reduce(function (valid, prop) {
                return valid === true && typeof props[prop] !== 'undefined' ? valid : false;
            }, true);
            //if (!result) console.log('missing required params', ARCConfig.modelProps, props)
            return result;
        }
    }, {
        key: '_getModel',
        value: function _getModel(ARCConfig, props) {
            return AbstractModelContainer.isNew(ARCConfig, props) ? props.tempModel : props.collection[AbstractModelContainer.getKey(ARCConfig, props)];
        }
    }, {
        key: 'getModel',


        /** PUBLIC METHODS **/

        /* public
         * returns model (data retrieved from the server) */
        value: function getModel(ARCConfig, props) {
            return AbstractModelContainer._getModel(ARCConfig, props).model;
        }
    }, {
        key: 'getMetas',
        value: function getMetas(ARCConfig, prop, props) {
            if (!AbstractModelContainer._getModel(ARCConfig, props)) return null;
            return prop ? AbstractModelContainer._getModel(ARCConfig, props).metas[prop] : AbstractModelContainer._getModel(ARCConfig, props).metas;
        }
    }, {
        key: 'getError',
        value: function getError(ARCConfig, props) {
            return AbstractModelContainer.getMetas(ARCConfig, 'error', props);
        }
    }, {
        key: 'isSyncing',
        value: function isSyncing(ARCConfig, props) {
            return AbstractModelContainer.getMetas(ARCConfig, 'fetching', props);
        }
    }, {
        key: 'isLoaded',
        value: function isLoaded(ARCConfig, props) {
            if (AbstractModelContainer.isNew(ARCConfig, props)) return true;
            return !(!AbstractModelContainer._getModel(ARCConfig, props) || !AbstractModelContainer.getMetas(ARCConfig, 'loaded', props));
        }
    }, {
        key: '_allowReFetch',
        value: function _allowReFetch(ARCConfig, props) {
            return !(ARCConfig.fetchOnce && AbstractModelContainer.isLoaded(ARCConfig, props));
        }
    }, {
        key: '_errorReFetch',
        value: function _errorReFetch(ARCConfig, props) {
            //canReFetchOnerror
            if (ARCConfig.refetchOnError === true && !AbstractModelContainer.isSyncing(ARCConfig, props) && !AbstractModelContainer.isLoaded(ARCConfig, props) && !!AbstractModelContainer.getError(ARCConfig, props)) return true;
            return !AbstractModelContainer.getError(ARCConfig, props);
        }
    }]);

    return AbstractModelContainer;
}(_AbstractContainer3.default);

exports.default = AbstractModelContainer;