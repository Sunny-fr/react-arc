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
Object.defineProperty(exports, "__esModule", { value: true });
exports.mixerConnector = mixerConnector;
var utils_1 = require("./utils");
function mixerConnector(connect, config, customMapStateToProps) {
    var extendedConfig = __assign(__assign({}, (0, utils_1.getDefaultConfig)()), config);
    var reducerName = extendedConfig.name;
    return connect(function (store) {
        var mapStateToProps = function (rootState) {
            var state = rootState[reducerName];
            return {
                ARCConfig: extendedConfig,
                collection: state.collection,
            };
        };
        var optionalStateToProps = customMapStateToProps
            ? customMapStateToProps(store)
            : {};
        return Object.assign({}, mapStateToProps(store), optionalStateToProps);
    }, null, null, {
    //forwardRef: true,
    });
}
exports.default = mixerConnector;
