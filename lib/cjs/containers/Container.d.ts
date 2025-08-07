import React from "react";
import { ReduxActions } from "../actions/ReduxActions";
import { CoreMethods } from "../actions/core";
import { ARCConfig } from "../types/config.types";
import { ARCConnectedComponent, AnyProps, ComponentWithStoreProps } from "../types/components.types";
export declare class Container<P, S, Model> extends React.Component<P & ARCConnectedComponent<Model>, S> {
    static contextType: React.Context<import("react-redux").ReactReduxContextValue<any, import("redux").UnknownAction> | null>;
    ARCConfig: ARCConfig<Model>;
    actions: ReduxActions<Model>;
    core: CoreMethods;
    abortController: null | AbortController;
    props: P & ARCConnectedComponent<Model>;
    delayedTimeout: number | undefined;
    constructor(props: (Readonly<P> | P) & ARCConnectedComponent<Model>);
    getTrueStoreState(): {
        collection: import("..").ARCMetaCollectionMap<Model>;
    };
    getPropsFromTrueStoreState: (props?: AnyProps) => ComponentWithStoreProps;
    updateARC(config: ARCConfig<Model>): void;
}
export default Container;
