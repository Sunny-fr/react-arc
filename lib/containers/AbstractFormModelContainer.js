'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.AbstractFormModelContainer = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _AbstractModelContainer = require('./AbstractModelContainer');

var _AbstractModelContainer2 = _interopRequireDefault(_AbstractModelContainer);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var AbstractFormModelContainer = exports.AbstractFormModelContainer = function (_AbstractModelContain) {
    _inherits(AbstractFormModelContainer, _AbstractModelContain);

    function AbstractFormModelContainer(props) {
        _classCallCheck(this, AbstractFormModelContainer);

        var _this = _possibleConstructorReturn(this, (AbstractFormModelContainer.__proto__ || Object.getPrototypeOf(AbstractFormModelContainer)).call(this, props));

        _this.changeProp = function (prop, value) {
            _this._setPristine(prop);
            _this.edit(_defineProperty({}, prop, value));
        };

        _this.getEditedStatus = function (prop) {
            return prop ? _this.silentState.edited[prop] : _this.silentState.edited;
        };

        _this._setSilentState = function (data) {
            _this.silentState = Object.assign({}, _this.silentState, data);
        };

        _this.silentState = {
            edited: {} // Not pristines :-)
        };
        return _this;
    }

    /** PUBLIC ACTIONS METHODS **/
    /* private
     * changes props value */


    /* private
     * if a prop has been edited */


    _createClass(AbstractFormModelContainer, [{
        key: 'onSave',


        /** PUBLIC/MEANT TO BE OVERRIDDEN **/

        value: function onSave() {}
    }, {
        key: 'componentDidUpdate',
        value: function componentDidUpdate() {
            if (this.getMetas('saved')) {
                var created = this.getModel();
                this.resetTempModel();
                this.onSave(created);
            }

            _get(AbstractFormModelContainer.prototype.__proto__ || Object.getPrototypeOf(AbstractFormModelContainer.prototype), 'componentDidUpdate', this).call(this);
        }

        /* private
         * state data but not triggering rerender */

    }, {
        key: '_setPristine',


        /* private
         * if a prop has been modified, it will be flagged */
        value: function _setPristine(prop) {
            var edited = _extends({}, this.silentState.edited, _defineProperty({}, prop, true));
            this._setSilentState({ edited: edited });
        }
    }]);

    return AbstractFormModelContainer;
}(_AbstractModelContainer2.default);

exports.default = AbstractFormModelContainer;