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
import { connect } from "react-redux";
import { getDefaultConfig } from "../utils";
import React from "react";
import { ARCConnect } from "../connectors/ARCConnect";
/**
 *
 * @param {ARCConfig} config
 * @return {function(Component)<ARCWrappedComponent>}
 */
export function withARC(config) {
    /** @type {ARCConfig} **/
    var extendedConfig = __assign(__assign({}, getDefaultConfig()), config);
    function ARCHoc(Wrapped) {
        return connect(ARCConnect(extendedConfig))(function (props) {
            return React.createElement(Wrapped, __assign({}, props));
        });
    }
    return ARCHoc;
}
