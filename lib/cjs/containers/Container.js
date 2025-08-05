"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Container = void 0;
var react_1 = __importDefault(require("react"));
var ReduxActions_1 = require("../actions/ReduxActions");
var core_1 = require("../actions/core");
var utils_1 = require("../utils");
var react_redux_1 = require("react-redux");
var Container = /** @class */ (function (_super) {
    __extends(Container, _super);
    function Container(props) {
        //: ARCWrappedComponentProps<Model>
        var _this = _super.call(this, props) || this;
        _this.getPropsFromTrueStoreState = function (props) {
            var ARCProps = _this.getTrueStoreState();
            var baseProps = props || _this.props;
            return __assign(__assign({}, baseProps), ARCProps);
        };
        _this.updateARC(props.ARCConfig);
        _this.actions = new ReduxActions_1.ReduxActions({
            config: _this.ARCConfig,
        });
        _this.core = core_1.core;
        _this.abortController = null;
        return _this;
    }
    Container.prototype.getTrueStoreState = function () {
        //@ts-ignore
        var rootState = this.context.store.getState();
        var namespace = this.ARCConfig.name;
        var store = rootState[namespace];
        return {
            collection: store.collection,
        };
    };
    Container.prototype.updateARC = function (config) {
        this.ARCConfig = __assign(__assign({}, (this.ARCConfig || (0, utils_1.initializeConfig)(this.ARCConfig))), config);
        if (this.actions)
            this.actions.updateConfig(this.ARCConfig);
    };
    Container.contextType = react_redux_1.ReactReduxContext;
    return Container;
}(react_1.default.Component));
exports.Container = Container;
exports.default = Container;
