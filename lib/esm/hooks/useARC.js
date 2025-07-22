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
import { useEffect, useRef, useState } from "react";
import { ARC } from "./arc";
export function useARC(_a) {
    var ARCConfig = _a.ARCConfig, props = _a.props;
    var arc = new ARC({ ARCConfig: ARCConfig });
    var defaultProps = props;
    var defaultState = {
        error: null,
        loading: false,
        loaded: false,
        response: null,
        pending: false,
    };
    var _b = useState(defaultState), state = _b[0], setState = _b[1];
    var handle = function (fetcher) {
        if (state.pending)
            return;
        setState(__assign(__assign({}, state), { error: null, loading: true }));
        return fetcher()
            .then(function (response) {
            setState(__assign(__assign({}, state), { loaded: true, error: null, loading: false, response: response }));
            return Promise.resolve(response);
        })
            .catch(function (error) {
            setState(__assign(__assign({}, state), { error: error, loading: false, pending: false }));
            return Promise.reject(error);
        });
    };
    var params = useRef(arc.extractParams(props));
    useEffect(function () {
        if (arc.hasRequiredParams(params.current)) {
            handle(function () { return arc.get({ props: props, params: params.current }); });
        }
    }, [params]);
    var arcMethods = {
        arc: arc,
        get: function (args) {
            var _a = args.props, props = _a === void 0 ? {} : _a, _b = args.params, params = _b === void 0 ? {} : _b;
            return handle(function () { return arc.get({ props: props || defaultProps, params: params }); });
        },
        remove: function (args) {
            var props = args.props, params = args.params;
            return handle(function () {
                return arc.remove({ props: props || defaultProps, params: params });
            });
        },
        create: function (args) {
            var props = args.props, params = args.params, body = args.body;
            return handle(function () {
                return arc.create({ props: props || defaultProps, params: params, body: body });
            });
        },
        update: function (args) {
            var props = args.props, params = args.params, body = args.body;
            return handle(function () {
                return arc.update({ props: props || defaultProps, params: params, body: body });
            });
        },
        extract: function (props) {
            return arc.extractParams(props || defaultProps);
        },
        extractParams: function (props) {
            return arc.extractParams(props || defaultProps);
        },
        custom: function (fetcher) {
            return handle(fetcher);
        },
    };
    return {
        error: state.error,
        loading: state.loading,
        loaded: state.loaded,
        response: state.response,
        arc: arcMethods,
    };
}
