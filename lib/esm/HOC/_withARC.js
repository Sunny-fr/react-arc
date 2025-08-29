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
import { metaModelSelector } from "../hooks/selectors";
/**
 * Store Connector
 * @param {ARCConfig} config

 */
export function connectFn(config) {
    return function (store, ownProps) {
        var _a, _b, _c;
        var namespace = config.name;
        if (!store[namespace]) {
            throw new Error("Namespace \"".concat(namespace, "\" not found in store. Please ensure the ARCConfig is correctly set up."));
        }
        var mergedProps = __assign({}, extendWithDefaultProps(config, ownProps));
        var modelKey = core.getKey(config, mergedProps);
        // const fetchingCount = fetchingCountSelector(store, config)
        var metaModel = metaModelSelector(store, config, modelKey);
        //console.log(fetchingCount);
        //console.log(metaModel_);
        var reducerState = store[namespace];
        //const collection = reducerState.collection
        //const metaModel = core._getModel(config, mergedProps, reducerState)
        var loaded = ((_a = metaModel === null || metaModel === void 0 ? void 0 : metaModel.metas) === null || _a === void 0 ? void 0 : _a.loaded) || false;
        var model = (metaModel === null || metaModel === void 0 ? void 0 : metaModel.model) || config.defaultModel || null;
        var error = ((_b = metaModel === null || metaModel === void 0 ? void 0 : metaModel.metas) === null || _b === void 0 ? void 0 : _b.error) || null;
        var syncing = ((_c = metaModel === null || metaModel === void 0 ? void 0 : metaModel.metas) === null || _c === void 0 ? void 0 : _c.fetching) || false;
        var metas = (metaModel === null || metaModel === void 0 ? void 0 : metaModel.metas) || {};
        var isNew = !modelKey;
        return __assign(__assign({}, mergedProps), { ARCConfig: config, ARCReducerState: reducerState, loaded: loaded, metaModel: metaModel, model: model, error: error, syncing: syncing, metas: metas, isNew: isNew });
    };
}
/**
 *
 * @param {ARCConfig} config
 * @return {function(Component)<ARCWrappedComponent>}
 */
export function withARC(config) {
    var extendedConfig = __assign(__assign({}, getDefaultConfig()), config);
    function createHOC(Wrapped) {
        return connect(connectFn(extendedConfig))(Wrapped);
    }
    return createHOC;
}
