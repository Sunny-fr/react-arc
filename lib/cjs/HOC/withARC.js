"use strict";
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
exports.withARC = void 0;
var react_redux_1 = require("react-redux");
var utils_1 = require("../utils");
var react_1 = __importDefault(require("react"));
var ARCConnect_1 = require("../connectors/ARCConnect");
/**
 *
 * @param {ARCConfig} config
 * @return {function(Component)<ARCWrappedComponent>}
 */
function withARC(config) {
    /** @type {ARCConfig} **/
    var extendedConfig = __assign(__assign({}, (0, utils_1.getDefaultConfig)()), config);
    function ARCHoc(Wrapped) {
        return (0, react_redux_1.connect)((0, ARCConnect_1.ARCConnect)(extendedConfig))(function (props) {
            return react_1.default.createElement(Wrapped, __assign({}, props));
        });
    }
    return ARCHoc;
}
exports.withARC = withARC;
