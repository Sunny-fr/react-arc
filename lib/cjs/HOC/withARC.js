"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.connectFn = connectFn;
exports.withARC = withARC;
const react_redux_1 = require("react-redux");
const utils_1 = require("../utils");
const core_1 = require("../actions/core");
const selectors_1 = require("../hooks/selectors");
/**
 * Store Connector
 * @param {ARCConfig} config

 */
function connectFn(config) {
    return function (store, ownProps) {
        const namespace = config.name;
        if (!store[namespace]) {
            throw new Error(`Namespace "${namespace}" not found in store. Please ensure the ARCConfig is correctly set up.`);
        }
        const mergedProps = {
            ...(0, utils_1.extendWithDefaultProps)(config, ownProps),
        };
        // const mergedProps = ownProps as ComponentPropsWithRequiredModelParams & AnyProps
        const modelKey = core_1.core.getKey(config, mergedProps);
        const metaModel = (0, selectors_1.metaModelSelector)(store, config.name, modelKey);
        const loaded = metaModel?.metas?.loaded || false;
        const model = metaModel?.model || config.defaultModel || null;
        const error = metaModel?.metas?.error || null;
        const loading = metaModel?.metas?.fetching || false;
        const metas = metaModel?.metas || {};
        const isNew = !modelKey;
        return {
            ...mergedProps,
            ARCConfig: config,
            modelKey,
            loaded,
            metaModel,
            model,
            error,
            loading,
            metas,
            isNew,
        };
    };
}
function withARC(config) {
    const extendedConfig = { ...(0, utils_1.getDefaultConfig)(), ...config };
    function createHOC(Wrapped) {
        // connect<any, any, RequiredProps & OwnProps, ARCRootState>
        const Connector = (0, react_redux_1.connect)(connectFn(extendedConfig))(Wrapped);
        Connector.displayName = `withARC(${Wrapped.displayName || Wrapped.name || 'Component'})`;
        //type PropsFromRedux = ConnectedProps<typeof Connector>
        //ConnectedComponent
        return Connector; //as React.ComponentType<PropsFromRedux & RequiredProps & OwnProps>
    }
    return createHOC;
}
