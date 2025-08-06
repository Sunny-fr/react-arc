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
var selectors_1 = require("../hooks/selectors");
/**
 * Store Connector
 * @param {ARCConfig} config

 */
function connectFn(config) {
    return function (store, ownProps) {
        var _a, _b, _c;
        var namespace = config.name;
        if (!store[namespace]) {
            throw new Error("Namespace \"".concat(namespace, "\" not found in store. Please ensure the ARCConfig is correctly set up."));
        }
        var mergedProps = __assign({}, (0, utils_1.extendWithDefaultProps)(config, ownProps));
        var modelKey = core_1.core.getKey(config, mergedProps);
        var metaModel = (0, selectors_1.metaModelSelector)(store, config, modelKey);
        var loaded = ((_a = metaModel === null || metaModel === void 0 ? void 0 : metaModel.metas) === null || _a === void 0 ? void 0 : _a.loaded) || false;
        var model = (metaModel === null || metaModel === void 0 ? void 0 : metaModel.model) || config.defaultModel || null;
        var error = ((_b = metaModel === null || metaModel === void 0 ? void 0 : metaModel.metas) === null || _b === void 0 ? void 0 : _b.error) || null;
        var loading = ((_c = metaModel === null || metaModel === void 0 ? void 0 : metaModel.metas) === null || _c === void 0 ? void 0 : _c.fetching) || false;
        var metas = (metaModel === null || metaModel === void 0 ? void 0 : metaModel.metas) || {};
        var isNew = !modelKey;
        return __assign(__assign({}, mergedProps), { ARCConfig: config, loaded: loaded, metaModel: metaModel, model: model, error: error, loading: loading, metas: metas, isNew: isNew });
    };
}
function withARC(config) {
    var extendedConfig = __assign(__assign({}, (0, utils_1.getDefaultConfig)()), config);
    function createHOC(Wrapped) {
        return (0, react_redux_1.connect)(connectFn(extendedConfig))(Wrapped);
    }
    return createHOC;
}
