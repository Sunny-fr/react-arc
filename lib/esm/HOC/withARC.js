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
        const namespace = config.name;
        if (!store[namespace]) {
            throw new Error(`Namespace "${namespace}" not found in store. Please ensure the ARCConfig is correctly set up.`);
        }
        const mergedProps = {
            ...extendWithDefaultProps(config, ownProps),
        };
        // const mergedProps = ownProps as ComponentPropsWithRequiredModelParams & AnyProps
        const modelKey = core.getKey(config, mergedProps);
        const metaModel = metaModelSelector(store, config, modelKey);
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
export function withARC(config) {
    const extendedConfig = { ...getDefaultConfig(), ...config };
    function createHOC(Wrapped) {
        const Connector = connect(connectFn(extendedConfig))(Wrapped);
        Connector.displayName = `withARC(${Wrapped.displayName || Wrapped.name || 'Component'})`;
        //type PropsFromRedux = ConnectedProps<typeof Connector>
        return Connector; //as ARCContainer<Model, RequiredProps, OwnProps & PropsFromRedux>
    }
    return createHOC;
}
