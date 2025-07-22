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
import { getDefaultConfig } from "./utils";
export function mixerConnector(connect, config, customMapStateToProps) {
    var extendedConfig = __assign(__assign({}, getDefaultConfig()), config);
    var namespace = extendedConfig.name;
    return connect(function (store) {
        // Required Props
        var mapStateToProps = function (store) {
            return {
                ARCConfig: extendedConfig,
                tempModel: store[namespace].temp,
                loaded: store[namespace].loaded,
                fetching: store[namespace].fetching,
                error: store[namespace].error,
                collection: store[namespace].collection,
            };
        };
        var optionalStateToProps = customMapStateToProps
            ? customMapStateToProps(store)
            : {};
        return Object.assign({}, mapStateToProps(store), optionalStateToProps);
    }, null, null, {
        forwardRef: true,
    });
}
export default mixerConnector;
