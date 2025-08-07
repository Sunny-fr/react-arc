import React from "react";
import { ReduxActions } from "../actions/ReduxActions";
import { CoreMethods } from "../actions/core";
import { ARCConfig } from "../types/config.types";
import { AnyProps, ComponentWithStoreProps, ARCContainer } from "../types/components.types";
export declare class Container<P, Model, RequiredProps extends object = {}> extends React.Component<ARCContainer<P, Model, RequiredProps>, any> {
    static contextType: React.Context<import("react-redux").ReactReduxContextValue<any, import("redux").UnknownAction> | null>;
    ARCConfig: ARCConfig<Model, RequiredProps>;
    actions: ReduxActions<Model, RequiredProps>;
    core: CoreMethods;
    abortController: null | AbortController;
    delayedTimeout: number | undefined;
    constructor(props: ARCContainer<P, Model, RequiredProps>);
    getTrueStoreState(): {
        collection: import("..").ARCMetaCollectionMap<Model>;
    };
    getPropsFromTrueStoreState: (props?: AnyProps) => ComponentWithStoreProps;
    updateARC(config: ARCConfig<Model, RequiredProps>): void;
}
export default Container;
