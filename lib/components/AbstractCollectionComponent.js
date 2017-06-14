'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.AbstractCollectionComponent = undefined;

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

var AbstractCollectionComponent = exports.AbstractCollectionComponent = function (_AbstractComponent) {
    _inherits(AbstractCollectionComponent, _AbstractComponent);

    function AbstractCollectionComponent() {
        var _ref;

        var _temp, _this, _ret;

        _classCallCheck(this, AbstractCollectionComponent);

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = AbstractCollectionComponent.__proto__ || Object.getPrototypeOf(AbstractCollectionComponent)).call.apply(_ref, [this].concat(args))), _this), _this.fetch = function (newProps) {
            var props = newProps || _this.props;
            _this.props.dispatch(_this.actions.fetchAll((0, _utils.extractParams)(_this.ARCConfig.collectionProps, props)));
        }, _this.removeModel = function (model) {
            var params = (0, _utils.extractParams)(_this.ARCConfig.modelProps, model);
            _this.props.dispatch(_this.actions.remove(params));
        }, _this.editModel = function (model) {
            var params = (0, _utils.extractParams)(_this.ARCConfig.modelProps, model);
            _this.props.dispatch(_this.actions.edit(model, params));
        }, _this._allowRefetch = function (_props) {
            var props = _props || _this.props;
            return !(_this.ARCConfig.fetchOnce && _this.isLoaded(props));
        }, _temp), _possibleConstructorReturn(_this, _ret);
    }

    /** PUBLIC ACTIONS METHODS **/

    /* Collection related actions */

    /* public
     * Fetch a collection */


    /* Models related actions */

    _createClass(AbstractCollectionComponent, [{
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
        value: function getError(_props) {
            var props = _props || this.props;
            return props.error;
        }

        /* public
         * is the collection loaded at least one time ? */

    }, {
        key: 'isLoaded',
        value: function isLoaded() {
            return this.props.loaded;
        }

        /* public
         * is there any activity ? loading
         * or syncing (~means that the collection has been loaded once and we're refetching it) */

    }, {
        key: 'isSyncing',
        value: function isSyncing() {
            return this.props.fetching;
        }

        /* private
         * performs a fetch if the flag fetchOnce is set to false
         */

        //TODO ADD isFetching check

    }, {
        key: 'componentWillMount',
        value: function componentWillMount() {
            if (this._allowRefetch()) this.fetch();
        }
    }]);

    return AbstractCollectionComponent;
}(_AbstractComponent3.default);

exports.default = AbstractCollectionComponent;