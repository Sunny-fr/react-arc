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
exports.createHOC = createHOC;
var react_1 = __importDefault(require("react"));
var ModelContainer_1 = require("../containers-next/ModelContainer");
var withARC_1 = require("./withARC");
function createHOC(_a) {
    var _b = _a.Container, Container = _b === void 0 ? ModelContainer_1.ModelContainer : _b, ARCConfig = _a.ARCConfig;
    var ARCContainer = (0, withARC_1.withARC)(ARCConfig)(Container);
    return function (Wrapped) {
        return function (props) {
            return react_1.default.createElement(ARCContainer, __assign({}, props, { component: Wrapped }));
        };
    };
}
