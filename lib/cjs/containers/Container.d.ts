import React from "react";
import { ReduxActionsList } from "../actions/ReduxActionsList";
import { CoreMethods } from "../actions/core";
import { ARCConfig } from "../types/config.types";
import { ARCWrappedComponentProps, ComponentProps, ComponentWithStoreProps } from "../types/components.types";
export declare class Container<P, S, Model> extends React.Component<P & ARCWrappedComponentProps<Model>, S> {
    static contextType: React.Context<import("react-redux").ReactReduxContextValue<any, import("redux").UnknownAction> | null>;
    ARCConfig: ARCConfig<Model>;
    actions: ReduxActionsList<Model>;
    core: CoreMethods;
    abortController: null | AbortController;
    props: P & ARCWrappedComponentProps<Model>;
    delayedTimeout: number | undefined;
    constructor(props: (Readonly<P> | P) & ARCWrappedComponentProps<Model>);
    getTrueStoreState(): {
        collection: import("..").ARCMetaCollectionMap<Model>;
    };
    getPropsFromTrueStoreState: (props?: ComponentProps) => ComponentWithStoreProps<Model>;
    updateARC(config: ARCConfig<Model>): void;
}
export default Container;
