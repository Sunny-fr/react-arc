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
        var collection = store[namespace].collection;
        var arcProps = {
            collection: collection,
            tempModel: store[namespace].temp,
            // To be dropped
            temp: store[namespace].temp,
            // To be dropped
            fetching: store[namespace].fetching,
            // To be dropped
            loaded: store[namespace].loaded,
            // To be dropped
            error: store[namespace].error,
        };
        var mergedProps = __assign(__assign({}, extendWithDefaultProps(config, ownProps)), arcProps);
        var metaModel = core._getModel(config, mergedProps);
        var loaded = core.isLoaded(config, mergedProps);
        var model = core.getModel(config, mergedProps);
        var error = core.getError(config, mergedProps);
        var syncing = core.isSyncing(config, mergedProps);
        var metas = core.getMetas(config, undefined, mergedProps);
        var isNew = core.isNew(config, mergedProps);
        return __assign(__assign({}, extendWithDefaultProps(config, ownProps)), { ARCConfig: config, loaded: loaded, metaModel: metaModel, model: model, error: error, syncing: syncing, metas: metas, isNew: isNew });
    };
}
/**
 *
 * @param {ARCConfig} config
 * @return {function(Component)<ARCWrappedComponent>}
 */
export function withARC(config) {
    /** @type {ARCConfig} **/
    var extendedConfig = __assign(__assign({}, getDefaultConfig()), config);
    /**
     * @param {Component} Wrapped
     * @return {function(ARCMappedProps)<ARCWrappedComponent>}
     */
    function ARCHoc(Wrapped) {
        // @ts-ignore
        return connect(connectFn(extendedConfig))(Wrapped);
    }
    return ARCHoc;
}
