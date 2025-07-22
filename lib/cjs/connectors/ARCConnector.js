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
exports.ARCConnector = void 0;
var utils_1 = require("../utils");
var core_1 = require("../actions/core");
/** LEGACY **/
function ARCConnector(connect, config, customMapStateToProps) {
    var ARCConfig = __assign(__assign({}, (0, utils_1.getDefaultConfig)()), config);
    var namespace = ARCConfig.name;
    function arcConnector(store, ownProps) {
        // Required Props
        var collection = store[namespace].collection;
        var arcProps = {
            collection: collection,
            // To be dropped
            temp: store[namespace].temp,
            // To be dropped
            fetching: store[namespace].fetching,
            // To be dropped
            loaded: store[namespace].loaded,
            // To be dropped
            error: store[namespace].error,
        };
        var mergedProps = __assign(__assign({}, (0, utils_1.extendWithDefaultProps)(ARCConfig, ownProps)), arcProps);
        var loaded = core_1.core.isLoaded(ARCConfig, mergedProps);
        var metaModel = core_1.core._getModel(ARCConfig, mergedProps);
        var model = core_1.core.getModel(ARCConfig, mergedProps);
        var error = core_1.core.getError(ARCConfig, mergedProps);
        var syncing = core_1.core.isSyncing(ARCConfig, mergedProps);
        var metas = core_1.core.getMetas(ARCConfig, undefined, mergedProps);
        var mapStateToProps = __assign(__assign({}, (0, utils_1.extendWithDefaultProps)(ARCConfig, ownProps)), { fetching: false, temp: undefined, collection: collection, isNew: false, tempModel: undefined, ARCConfig: ARCConfig, metas: metas, metaModel: metaModel, model: model, loaded: loaded, error: error, syncing: syncing, dispatch: ownProps.dispatch });
        var optionalStateToProps = customMapStateToProps
            ? customMapStateToProps(store)
            : {};
        return __assign(__assign({}, mapStateToProps), { optionalStateToProps: optionalStateToProps });
    }
    return connect(arcConnector, null, null, {
        forwardRef: true,
    });
}
exports.ARCConnector = ARCConnector;
exports.default = ARCConnector;
