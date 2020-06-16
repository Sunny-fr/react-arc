'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.AbstractModelContainer = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _AbstractContainer2 = require('./AbstractContainer');

var _AbstractContainer3 = _interopRequireDefault(_AbstractContainer2);

var _utils = require('../utils');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

// import {changedProps} from '../utils/index'
// import equal from 'deep-equal'


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
            var axiosOptions = {};
            _this.props.dispatch(_this.actions.fetchOne(params, _this.props, axiosOptions));
            _this.arcCancelPendingRequest = axiosOptions.cancel;
        }, _this.edit = function (model) {
            _this.props.dispatch(_this.actions.edit(model, _this.getParams()));
        }, _this.save = function () {
            var isNew = _this.isNew(_this.props);
            var model = _this.getModel();
            var extracted = (0, _utils.extractParams)(_this.ARCConfig.modelProps, _this.props);
            var params = _extends({}, extracted, isNew ? _this.getParams(model) : _this.getParams());
            _this.props.dispatch(_this.actions.save(model, params, isNew, _this.props));
        }, _this.remove = function () {
            if (_this.isNew()) _this.resetTempModel();else {
                var params = _this.getParams();
                _this.props.dispatch(_this.actions.remove(params, _this.props));
            }
        }, _this.resetTempModel = function () {
            _this.props.dispatch(_this.actions.resetTemp());
        }, _this.getFetchingCount = function (props) {
            return _this.core.getFetchingCount(_this.ARCConfig, props || _this.props);
        }, _this.allowReFetch = function (props) {
            return _this.core.allowReFetch(_this.ARCConfig, props || _this.props);
        }, _temp), _possibleConstructorReturn(_this, _ret);
    }

    _createClass(AbstractModelContainer, [{
        key: 'isNew',


        /** PUBLIC ACTIONS METHODS **/

        /* public
         * if the component has not the required params it will be set as new */
        value: function isNew(props) {
            return this.core.isNew(this.ARCConfig, props || this.props);
        }

        /* public
         * returns null or string
         * acts as unique identifier (based on required props) */

    }, {
        key: 'getKey',
        value: function getKey(props) {
            return this.core.getKey(this.ARCConfig, props || this.props);
        }

        /* public
         * retrieve params from props or model */
        /* CUSTOMIZE HERE FOR ADVANCED USAGE */

    }, {
        key: 'getParams',
        value: function getParams(props) {
            return this.core.getParams(this.ARCConfig, props || this.props);
        }

        /* private
         * checks if the component has the required params based on modelProps in config
         */

    }, {
        key: 'hasRequiredParams',
        value: function hasRequiredParams(props) {
            return this.core.hasRequiredParams(this.ARCConfig, props || this.props);
        }

        /* private
         * get a model an its metas data
         */

    }, {
        key: '_getModel',
        value: function _getModel(props) {
            return this.core._getModel(this.ARCConfig, props || this.props);
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


        /** PUBLIC METHODS **/

        /* public
         * returns model (data retrieved from the server) */

    }, {
        key: 'getModel',
        value: function getModel(props) {
            return this.core.getModel(this.ARCConfig, props || this.props);
        }

        /* public
         * returns metas (loaded, error, etc.) */

    }, {
        key: 'getMetas',
        value: function getMetas(prop, props) {
            return this.core.getMetas(this.ARCConfig, prop, props || this.props);
        }

        /* public
         * returns  error */

    }, {
        key: 'getError',
        value: function getError(props) {
            return this.core.getError(this.ARCConfig, props || this.props);
        }

        /* public
         * returns bool if there's any activity */

    }, {
        key: 'isSyncing',
        value: function isSyncing(props) {
            return this.core.isSyncing(this.ARCConfig, props || this.props);
        }

        /* public
         * returns bool if the model has been loaded at least one time */

    }, {
        key: 'isLoaded',
        value: function isLoaded(props) {
            return this.core.isLoaded(this.ARCConfig, props || this.props);
        }

        /* private
         * performs a fetch if the flag fetchOnce is set to false
         */

    }, {
        key: 'errorReFetch',
        value: function errorReFetch(props) {
            //can re fetch on error
            return this.core.errorReFetch(this.ARCConfig, props || this.props);
        }
    }, {
        key: 'componentDidUpdate',
        value: function componentDidUpdate() {
            this.prepareFetch({ skipReFetchStep: true });
        }
    }, {
        key: 'prepareFetch',
        value: function prepareFetch(_ref2) {
            var _ref2$skipReFetchStep = _ref2.skipReFetchStep,
                skipReFetchStep = _ref2$skipReFetchStep === undefined ? false : _ref2$skipReFetchStep;

            var props = this.getPropsFromTrueStoreState(this.props);
            if (this._fetchAuthorization(props, { skipReFetchStep: skipReFetchStep })) {
                var max = this.ARCConfig.maxPendingRequestsPerReducer;
                if (max > -1) {
                    var count = this.getFetchingCount(props);
                    if (count > max) {
                        //console.log('too much pending requests', count, 'pending)
                        return this.delayedFetch({ skipReFetchStep: skipReFetchStep });
                    }
                }
                this.fetch(this.getParams());
            }
        }
    }, {
        key: 'componentWillUnmount',
        value: function componentWillUnmount() {
            clearTimeout(this.delayedTimeout);
            this.delayedTimeout = null;
            if (this.arcCancelPendingRequest) {
                console.log(this.arcCancelPendingRequest);
                this.arcCancelPendingRequest('cancel due to unmount');
            }
        }
    }, {
        key: 'delayedFetch',
        value: function delayedFetch(_ref3) {
            var _this2 = this;

            var _ref3$skipReFetchStep = _ref3.skipReFetchStep,
                skipReFetchStep = _ref3$skipReFetchStep === undefined ? false : _ref3$skipReFetchStep;

            this.delayedTimeout = setTimeout(function () {
                _this2.prepareFetch({ skipReFetchStep: skipReFetchStep });
            }, this.ARCConfig.requestFetchDelay);
        }
    }, {
        key: '_fetchAuthorization',
        value: function _fetchAuthorization(props, _ref4) {
            var _ref4$skipReFetchStep = _ref4.skipReFetchStep,
                skipReFetchStep = _ref4$skipReFetchStep === undefined ? false : _ref4$skipReFetchStep;


            if (this.isNew(props)) {
                //console.log('//model is new no data to be retrieved')
                return false;
            }

            if (!this.hasRequiredParams(props)) {
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

            if (!skipReFetchStep && this.isLoaded(props) && this.allowReFetch(props)) {
                //console.log('//model seems to be loaded but its ok to re-fetch it')
                return true;
            }

            if (!skipReFetchStep && !!this.getError(props) && this.errorReFetch(props)) {
                //console.log('//model had an error previously, but its ok to refetch it')
                return true;
            }

            return false;
        }
    }, {
        key: 'componentDidMount',
        value: function componentDidMount() {
            this.prepareFetch({ skipReFetchStep: false });
        }

        // shouldComponentUpdate(nextProps, nextState) {
        //
        //     if (typeof nextProps !== typeof this.props || typeof nextState !== typeof this.state) return true
        //
        //     const propsThatChanged = changedProps(this.props, nextProps)
        //     const statesThatChanged = changedProps(this.state, nextState)
        //
        //
        //     if (statesThatChanged.length === 0 && propsThatChanged.length === 0) return false
        //
        //     //if (!this.isCollectionLoaded(this.props) || !this._getModel(nextProps)) return true
        //
        //     if (propsThatChanged.length === 1 && propsThatChanged.includes('collection')) {
        //         const prevModel = this._getModel(this.props)
        //         const nextModel = this._getModel(nextProps)
        //         return !equal(prevModel, nextModel)
        //     }
        //
        //
        //     return statesThatChanged.length > 0 || propsThatChanged.length > 0
        // }

    }]);

    return AbstractModelContainer;
}(_AbstractContainer3.default);

exports.default = AbstractModelContainer;