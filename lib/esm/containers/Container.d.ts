import React from "react";
import { ReduxActions } from "../actions/ReduxActions";
import { CoreMethods } from "../actions/core";
import { ARCConfig } from "../types/config.types";
import { AnyProps, ARCContainerProps } from "../types/components.types";
export declare class Container<Model, RequiredProps, OwnProps, State = any> extends React.Component<ARCContainerProps<Model, RequiredProps, OwnProps>, State> {
    static contextType: React.Context<import("react-redux").ReactReduxContextValue<any, import("redux").UnknownAction> | null>;
    ARCConfig: ARCConfig<Model, RequiredProps>;
    actions: ReduxActions<Model, RequiredProps>;
    core: CoreMethods;
    abortController: null | AbortController;
    delayedTimeout: number | undefined;
    constructor(props: ARCContainerProps<Model, RequiredProps, OwnProps>);
    getTrueStoreState(): {
        collection: import("..").ARCMetaCollectionMap<Model>;
    };
    getPropsFromTrueStoreState: (props?: AnyProps) => {
        collection: import("..").ARCMetaCollectionMap<Model>;
    };
    updateARC(config: ARCConfig<Model, RequiredProps>): void;
}
export default Container;
