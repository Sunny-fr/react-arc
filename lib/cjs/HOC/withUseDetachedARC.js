"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.withUseDetachedARC = withUseDetachedARC;
const react_1 = __importDefault(require("react"));
const useARC_1 = require("../hooks/useARC");
function withUseDetachedARC(config) {
    return function HOC(Wrapped) {
        const displayName = Wrapped.displayName || Wrapped.name || "Component";
        const ComponentWithArc = (props) => {
            const arc = (0, useARC_1.useARC)({ ARCConfig: config, props });
            return react_1.default.createElement(Wrapped, { ...arc, ...props });
        };
        ComponentWithArc.displayName = `withARC(${displayName})`;
        return ComponentWithArc;
    };
}
