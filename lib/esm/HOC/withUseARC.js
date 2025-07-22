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
import React from "react";
import { useARC } from "../hooks/useARC";
export function withUseARC(config) {
    return function HOC(Wrapped) {
        var displayName = Wrapped.displayName || Wrapped.name || "Component";
        var ComponentWithArc = function (props) {
            var arc = useARC({ ARCConfig: config, props: props });
            return React.createElement(Wrapped, __assign({}, arc, props));
        };
        ComponentWithArc.displayName = "withTheme(".concat(displayName, ")");
        return ComponentWithArc;
    };
}
