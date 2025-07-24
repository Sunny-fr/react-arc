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
import React from 'react';
import { ModelContainer } from "../containers/ModelContainer";
import { withARC } from "./withARC";
export function createHOC(_a) {
    var _b = _a.Container, Container = _b === void 0 ? ModelContainer : _b, ARCConfig = _a.ARCConfig;
    // const ARCContainer = Container || ModelContainer as React.ComponentType<P & HOCBootstrapped<M>>
    return function (Wrapped) {
        return function (props) {
            var ARCContainer = withARC(ARCConfig)(Container);
            return React.createElement(ARCContainer, __assign({}, props, { component: Wrapped }));
        };
    };
}
