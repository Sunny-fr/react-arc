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
import { extendWithDefaultProps, getDefaultConfig } from "../utils";
import { core } from "../actions/core";
/**
 * Store Connector
 * @param {ARCConfig} config

 */
export function connectFn(config) {
    return function (store, ownProps) {
        var namespace = config.name;
        if (!store[namespace]) {
            throw new Error("Namespace \"".concat(namespace, "\" not found in store. Please ensure the ARCConfig is correctly set up."));
        }
        var reducerState = store[namespace];
        // const collection = reducerState.collection
        var mergedProps = __assign({}, extendWithDefaultProps(config, ownProps));
        var metaModel = core._getModel(config, mergedProps, reducerState);
        var loaded = core.isLoaded(config, mergedProps, reducerState);
        var model = core.getModel(config, mergedProps, reducerState);
        var error = core.getError(config, mergedProps, reducerState);
        var syncing = core.isSyncing(config, mergedProps, reducerState);
        var metas = core.getMetas(config, undefined, mergedProps, reducerState);
        var isNew = core.isNew(config, mergedProps);
        return __assign(__assign({}, extendWithDefaultProps(config, ownProps)), { ARCConfig: config, ARCReducerState: reducerState, loaded: loaded, metaModel: metaModel, model: model, error: error, syncing: syncing, metas: metas, isNew: isNew });
    };
}
/**
 *
 * @param {ARCConfig} config
 * @return {function(Component)<ARCWrappedComponent>}
 */
export function withARC(config) {
    var extendedConfig = __assign(__assign({}, getDefaultConfig()), config);
    /**
     * @param {Component} Wrapped
     * @return {function(ARCMappedProps)<ARCWrappedComponent>}
     */
    function ARCHoc(Wrapped) {
        //@ts-ignore
        return connect(connectFn(extendedConfig))(Wrapped);
    }
    return ARCHoc;
}
