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
import { getParams, initializeConfig, interpolate } from "../utils";
var ARC = /** @class */ (function () {
    function ARC(_a) {
        var ARCConfig = _a.ARCConfig;
        this.config = ARC.createConfig(ARCConfig);
    }
    ARC.createConfig = function (ARCConfig) {
        var config = ARC.extendConfig(ARCConfig);
        config.headers = ARC.extendHeaders(config);
        config.methods = ARC.extendMethods(config);
        return config;
    };
    ARC.extendConfig = function (ARCConfig) {
        return initializeConfig(ARCConfig);
    };
    ARC.extendHeaders = function (ARCConfig) {
        var headers = ARCConfig.headers || {};
        return __assign({}, headers);
    };
    ARC.extendMethods = function (extendedConfig) {
        var methods = extendedConfig.methods;
        return {
            // @ts-ignore Default methods are already extended
            create: methods.create.toLowerCase(),
            // @ts-ignore Default methods are already extended
            read: methods.read.toLowerCase(),
            // @ts-ignore Default methods are already extended
            update: methods.update.toLowerCase(),
            // @ts-ignore Default methods are already extended
            delete: methods.delete.toLowerCase(),
        };
    };
    ARC.prototype.hasRequiredParams = function (props) {
        return this.config.modelProps.every(function (prop) {
            return typeof props[prop] !== "undefined";
        });
    };
    ARC.prototype.extractParams = function (props) {
        return getParams(this.config, props);
    };
    ARC.prototype.applyHeaders = function (headers, props) {
        if (headers === void 0) { headers = {}; }
        // MUST BE PROPS !!!
        // OR PARAMS MUST TAKE THE CHARGE OF HAVING SPECIALS PROPS SUCH AS TOKEN/BEARERS
        return Object.keys(headers).reduce(function (state, header) {
            var _a;
            return __assign(__assign({}, state), (_a = {}, _a[header] = interpolate(headers[header], props), _a));
        }, {});
    };
    ARC.prototype.get = function (_a) {
        var props = _a.props, params = _a.params, options = _a.options;
        var p = params || this.extractParams(props);
        return fetch(interpolate(this.config.paths.read || this.config.paths.item, p), {
            // @ts-ignore
            method: this.config.methods.read,
            headers: this.applyHeaders(this.config.headers, props),
            signal: options === null || options === void 0 ? void 0 : options.signal
        }).then(ARC.json);
    };
    ARC.prototype.remove = function (_a) {
        var props = _a.props, params = _a.params;
        var p = params || this.extractParams(props);
        return fetch(interpolate(this.config.paths.delete || this.config.paths.item, p), {
            // @ts-ignore
            method: this.config.methods.delete,
            headers: this.applyHeaders(this.config.headers, props),
        }).then(ARC.json);
    };
    ARC.prototype.create = function (_a) {
        var props = _a.props, body = _a.body, params = _a.params;
        var p = params || this.extractParams(props);
        // WARNING !!
        return fetch(interpolate(this.config.paths.create || this.config.paths.item, p), {
            // @ts-ignore
            method: this.config.methods.create,
            headers: this.applyHeaders(this.config.headers, props),
            body: JSON.stringify(body),
        }).then(ARC.json);
    };
    ARC.prototype.update = function (_a) {
        var props = _a.props, body = _a.body, params = _a.params;
        var p = params || this.extractParams(props);
        return fetch(interpolate(this.config.paths.update || this.config.paths.item, p), {
            // @ts-ignore
            method: this.config.methods.update,
            headers: this.applyHeaders(this.config.headers, props),
            body: JSON.stringify(body),
        }).then(ARC.json);
    };
    ARC.jsonOrText = function (content) {
        try {
            return JSON.parse(content);
        }
        catch (e) {
            return content;
        }
    };
    ARC.json = function (response) {
        if (response.ok) {
            return response.text().then(function (rawResponseBody) {
                return Promise.resolve(ARC.jsonOrText(rawResponseBody));
            });
        }
        return response.text().then(function (rawResponseBody) {
            return Promise.reject({
                content: ARC.jsonOrText(rawResponseBody),
                response: response,
            });
        });
    };
    return ARC;
}());
export { ARC };
