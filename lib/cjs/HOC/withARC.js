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
exports.withARC = exports.connectFn = void 0;
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
        var mergedProps = __assign(__assign({}, (0, utils_1.extendWithDefaultProps)(config, ownProps)), arcProps);
        var metaModel = core_1.core._getModel(config, mergedProps);
        var loaded = core_1.core.isLoaded(config, mergedProps);
        var model = core_1.core.getModel(config, mergedProps);
        var error = core_1.core.getError(config, mergedProps);
        var syncing = core_1.core.isSyncing(config, mergedProps);
        var metas = core_1.core.getMetas(config, undefined, mergedProps);
        var isNew = core_1.core.isNew(config, mergedProps);
        return __assign(__assign({}, (0, utils_1.extendWithDefaultProps)(config, ownProps)), { ARCConfig: config, loaded: loaded, metaModel: metaModel, model: model, error: error, syncing: syncing, metas: metas, isNew: isNew });
    };
}
exports.connectFn = connectFn;
/**
 *
 * @param {ARCConfig} config
 * @return {function(Component)<ARCWrappedComponent>}
 */
function withARC(config) {
    /** @type {ARCConfig} **/
    var extendedConfig = __assign(__assign({}, (0, utils_1.getDefaultConfig)()), config);
    /**
     * @param {Component} Wrapped
     * @return {function(ARCMappedProps)<ARCWrappedComponent>}
     */
    function ARCHoc(Wrapped) {
        // @ts-ignore
        return (0, react_redux_1.connect)(connectFn(extendedConfig))(Wrapped);
    }
    return ARCHoc;
}
exports.withARC = withARC;
