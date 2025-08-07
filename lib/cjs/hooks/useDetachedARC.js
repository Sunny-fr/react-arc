"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useDetachedARC = useDetachedARC;
const react_1 = require("react");
const arc_1 = require("./arc");
function useDetachedARC({ ARCConfig, props, }) {
    const arc = new arc_1.ARC({ ARCConfig });
    const defaultProps = props;
    const defaultState = {
        error: null,
        loading: false,
        loaded: false,
        response: null,
        pending: false,
    };
    const pendingPromise = (0, react_1.useRef)(null);
    const [state, setState] = (0, react_1.useState)(defaultState);
    const handle = (fetcher) => {
        if (state.pending && pendingPromise.current) {
            // If a request is already pending, return the existing promise
            return pendingPromise.current;
        }
        setState({ ...state, error: null, loading: true });
        pendingPromise.current = fetcher();
        pendingPromise.current
            .then((response) => {
            setState({
                ...state,
                loaded: true,
                error: null,
                loading: false,
                response,
            });
            pendingPromise.current = null;
            return Promise.resolve(response);
        })
            .catch((error) => {
            setState({ ...state, error, loading: false, pending: false });
            pendingPromise.current = null;
            return Promise.reject(error);
        });
        return pendingPromise.current;
    };
    const params = (0, react_1.useRef)(arc.extractParams(props));
    (0, react_1.useEffect)(() => {
        if (arc.hasRequiredParams(params.current)) {
            // initial fetch if required params are present
            handle(() => arc.get({ props, params: params.current }));
        }
    }, [params]);
    const arcMethods = {
        arc,
        get: (args) => {
            const { props = {}, params = {} } = args;
            return handle(() => arc.get({ props: props || defaultProps, params }));
        },
        remove: (args) => {
            const { props, params } = args;
            return handle(() => arc.remove({ props: props || defaultProps, params }));
        },
        create: (args) => {
            const { props, params, body } = args;
            return handle(() => arc.create({ props: props || defaultProps, params, body }));
        },
        update: (args) => {
            const { props, params, body } = args;
            return handle(() => arc.update({ props: props || defaultProps, params, body }));
        },
        extract: (props) => arc.extractParams(props || defaultProps),
        extractParams: (props) => arc.extractParams(props || defaultProps),
        custom: (fetcher) => {
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
