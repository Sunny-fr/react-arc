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
import { getDefaultConfig, extendWithDefaultProps } from "../utils";
import { core } from "../actions/core";
/** LEGACY **/
export function ARCConnector(connect, config, customMapStateToProps) {
    var ARCConfig = __assign(__assign({}, getDefaultConfig()), config);
    var namespace = ARCConfig.name;
    function arcConnector(store, ownProps) {
        // Required Props
        var collection = store[namespace].collection;
        if (!collection) {
            throw new Error("Collection not found in store for namespace \"".concat(namespace, "\". Please ensure the ARCConfig is correctly set up."));
        }
        var arcProps = {
            collection: collection,
        };
        var mergedProps = __assign(__assign({}, extendWithDefaultProps(ARCConfig, ownProps)), arcProps);
        var loaded = core.isLoaded(ARCConfig, mergedProps);
        var metaModel = core._getModel(ARCConfig, mergedProps);
        var model = core.getModel(ARCConfig, mergedProps);
        var error = core.getError(ARCConfig, mergedProps);
        var syncing = core.isSyncing(ARCConfig, mergedProps);
        var metas = core.getMetas(ARCConfig, undefined, mergedProps);
        var mapStateToProps = __assign(__assign({}, extendWithDefaultProps(ARCConfig, ownProps)), { fetching: false, temp: undefined, collection: collection, isNew: false, tempModel: undefined, ARCConfig: ARCConfig, metas: metas, metaModel: metaModel, model: model, loaded: loaded, error: error, syncing: syncing, dispatch: ownProps.dispatch });
        var optionalStateToProps = customMapStateToProps
            ? customMapStateToProps(store)
            : {};
        return __assign(__assign({}, mapStateToProps), { optionalStateToProps: optionalStateToProps });
    }
    return connect(arcConnector, null, null, {
        forwardRef: true,
    });
}
export default ARCConnector;
