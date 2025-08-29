import React from "react";
import { ReduxActions } from "../actions/ReduxActions";
import { core } from "../actions/core";
import { initializeConfig } from "../utils";
import { ReactReduxContext } from "react-redux";
/**
 * DEPRECATED: Base Container class for ARC
 * @deprecated Use ModelContainer from containers-next instead
 */
export class Container extends React.Component {
    static contextType = ReactReduxContext;
    ARCConfig;
    actions;
    core;
    abortController;
    // props: ARCContainerProps<OwnProps, Model, RequiredProps>
    delayedTimeout;
    constructor(props) {
        super(props);
        this.updateARC(props.ARCConfig);
        this.actions = new ReduxActions({
            config: this.ARCConfig,
        });
        this.core = core;
        this.abortController = null;
    }
    getTrueStoreState() {
        // @ts-ignore this.context.store.getState() is not typed yet
        const rootState = this.context.store.getState();
        const namespace = this.ARCConfig.name;
        const store = rootState[namespace];
        return {
            collection: store.collection,
        };
    }
    getPropsFromTrueStoreState = (props) => {
        const ARCProps = this.getTrueStoreState();
        const baseProps = props || this.props;
        return {
            ...baseProps,
            ...ARCProps,
        };
    };
    updateARC(config) {
        this.ARCConfig = { ...(this.ARCConfig || initializeConfig(this.ARCConfig)), ...config };
        if (this.actions) {
            this.actions.updateConfig(this.ARCConfig);
        }
    }
}
export default Container;
