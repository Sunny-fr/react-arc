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
exports.connectFn = connectFn;
exports.withARC = withARC;
var react_redux_1 = require("react-redux");
var utils_1 = require("../utils");
var core_1 = require("../actions/core");
/**
 * Store Connector
 * @param {ARCConfig} config

 */
function connectFn(config) {
    return function (store, ownProps) {
        var namespace = config.name;
        if (!store[namespace]) {
            throw new Error("Namespace \"".concat(namespace, "\" not found in store. Please ensure the ARCConfig is correctly set up."));
        }
        var reducerState = store[namespace];
        // const collection = reducerState.collection
        var mergedProps = __assign({}, (0, utils_1.extendWithDefaultProps)(config, ownProps));
        var metaModel = core_1.core._getModel(config, mergedProps, reducerState);
        var loaded = core_1.core.isLoaded(config, mergedProps, reducerState);
        var model = core_1.core.getModel(config, mergedProps, reducerState);
        var error = core_1.core.getError(config, mergedProps, reducerState);
        var syncing = core_1.core.isSyncing(config, mergedProps, reducerState);
        var metas = core_1.core.getMetas(config, undefined, mergedProps, reducerState);
        var isNew = core_1.core.isNew(config, mergedProps);
        return __assign(__assign({}, (0, utils_1.extendWithDefaultProps)(config, ownProps)), { ARCConfig: config, ARCReducerState: reducerState, loaded: loaded, metaModel: metaModel, model: model, error: error, syncing: syncing, metas: metas, isNew: isNew });
    };
}
/**
 *
 * @param {ARCConfig} config
 * @return {function(Component)<ARCWrappedComponent>}
 */
function withARC(config) {
    var extendedConfig = __assign(__assign({}, (0, utils_1.getDefaultConfig)()), config);
    /**
     * @param {Component} Wrapped
     * @return {function(ARCMappedProps)<ARCWrappedComponent>}
     */
    function ARCHoc(Wrapped) {
        //@ts-ignore
        return (0, react_redux_1.connect)(connectFn(extendedConfig))(Wrapped);
    }
    return ARCHoc;
}
