'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.AbstractCollectionContainer = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _utils = require('../utils');

var _AbstractContainer2 = require('./AbstractContainer');

var _AbstractContainer3 = _interopRequireDefault(_AbstractContainer2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var AbstractCollectionContainer = exports.AbstractCollectionContainer = function (_AbstractContainer) {
    _inherits(AbstractCollectionContainer, _AbstractContainer);

    function AbstractCollectionContainer() {
        var _ref;

        var _temp, _this, _ret;

        _classCallCheck(this, AbstractCollectionContainer);

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = AbstractCollectionContainer.__proto__ || Object.getPrototypeOf(AbstractCollectionContainer)).call.apply(_ref, [this].concat(args))), _this), _this.fetch = function (props) {
            var axiosOptions = {};
            _this.props.dispatch(_this.actions.fetchAll((0, _utils.extractParams)(_this.ARCConfig.collectionProps, props || _this.props), props || _this.props, axiosOptions));
            _this.arcCancelPendingRequest = axiosOptions.cancel;
        }, _this.removeModel = function (model) {
            var params = (0, _utils.extractParams)(_this.ARCConfig.modelProps, model);
            _this.props.dispatch(_this.actions.remove(params, _this.props));
        }, _this.editModel = function (model) {
            var params = (0, _utils.extractParams)(_this.ARCConfig.modelProps, model);
            _this.props.dispatch(_this.actions.edit(model, params));
        }, _this._allowReFetch = function (props) {
            return _this.core.allowCollectionReFetch(_this.ARCConfig, props || _this.props);
        }, _temp), _possibleConstructorReturn(_this, _ret);
    }

    /** PUBLIC ACTIONS METHODS **/

    /* Collection related actions */

    /* public
     * Fetch a collection */


    /* Models related actions */

    _createClass(AbstractCollectionContainer, [{
        key: 'getCollection',


        /** PUBLIC METHODS **/

        /* public
         * returns a list of models */
        value: function getCollection() {
            return (0, _utils.flatten)(this.props.collection);
        }

        /* public
         * returns a list of models and their metas */

    }, {
        key: 'getFullCollection',
        value: function getFullCollection() {
            return (0, _utils.flatten)(this.props.collection, true);
        }

        /*  public
         * no errors returns null/false
         * or it will return this axios response */

    }, {
        key: 'getError',
        value: function getError(props) {
            return this.core.getCollectionError(this.ARCConfig, props || this.props);
        }

        /* public
         * is the collection loaded at least one time ? */

    }, {
        key: 'isLoaded',
        value: function isLoaded(props) {
            return this.core.isCollectionLoaded(this.ARCConfig, props || this.props);
        }

        /* public
         * is there any activity ? loading
         * or syncing (~means that the collection has been loaded once and we're refetching it) */

    }, {
        key: 'isSyncing',
        value: function isSyncing(props) {
            return this.core.isCollectionSyncing(this.ARCConfig, props || this.props);
        }

        /* private
         * performs a fetch if the flag fetchOnce is set to false
         */

    }, {
        key: '_fetchAuthorization',
        value: function _fetchAuthorization(props, _ref2) {
            var _ref2$skipReFetchStep = _ref2.skipReFetchStep,
                skipReFetchStep = _ref2$skipReFetchStep === undefined ? false : _ref2$skipReFetchStep;


            if (this.isSyncing(props)) {
                //console.log('//collection seems to be loading we dont allow to fetch it again')
                return false;
            }

            if (!this.isLoaded(props)) {
                //console.log('//collection has never been fetch, its ok to fetch')
                return true;
            }

            if (!skipReFetchStep && this._allowReFetch(props)) {
                //console.log('//collection seems to be loaded but its ok to re-fetch it')
                return true;
            }

            if (!skipReFetchStep && this._errorReFetch(props)) {
                //console.log('//collection had an error previously, but its ok to re-fetch it')
                return true;
            }
        }
    }, {
        key: 'componentDidUpdate',
        value: function componentDidUpdate() {
            var props = this.getPropsFromTrueStoreState();
            if (this._fetchAuthorization(props, { skipReFetchStep: true })) this.fetch();
        }
    }, {
        key: 'componentDidMount',
        value: function componentDidMount() {
            var props = this.getPropsFromTrueStoreState();
            if (this._fetchAuthorization(props, {})) this.fetch();
        }
    }, {
        key: 'componentWillUnmount',
        value: function componentWillUnmount() {
            if (this.arcCancelPendingRequest) {
                this.arcCancelPendingRequest('cancel due to unmount');
            }
        }
    }]);

    return AbstractCollectionContainer;
}(_AbstractContainer3.default);

exports.default = AbstractCollectionContainer;