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
exports.withUseARC = void 0;
var react_1 = __importDefault(require("react"));
var useARC_1 = require("../hooks/useARC");
function withUseARC(config) {
    return function HOC(Wrapped) {
        var displayName = Wrapped.displayName || Wrapped.name || "Component";
        var ComponentWithArc = function (props) {
            var arc = (0, useARC_1.useARC)({ ARCConfig: config, props: props });
            return react_1.default.createElement(Wrapped, __assign({}, arc, props));
        };
        ComponentWithArc.displayName = "withTheme(".concat(displayName, ")");
        return ComponentWithArc;
    };
}
exports.withUseARC = withUseARC;
