import React from "react";
import { ReduxActionsList } from "../actions/ReduxActionsList";
import { CoreMethods } from "../actions/core";
import { ARCConfig } from "../types/config.types";
import { ARCWrappedComponentProps, ComponentProps, ComponentWithStoreProps } from "../types/components.types";
export interface ContainerHookConfig<Model> {
    ARCConfig: ARCConfig<Model>;
}
export interface ContainerHookReturn<Model> {
    ARCConfig: ARCConfig<Model>;
    actions: ReduxActionsList<Model>;
    core: CoreMethods;
    abortController: React.MutableRefObject<AbortController | null>;
    getTrueStoreState: () => {
        collection: any;
    };
    getPropsFromTrueStoreState: (props?: ComponentProps) => ComponentWithStoreProps<Model>;
    updateARC: (config: ARCConfig<Model>) => void;
}
export declare function useContainer<Model>({ ARCConfig: initialConfig }: ContainerHookConfig<Model>): ContainerHookReturn<Model>;
export declare function Container<P, Model>(props: P & ARCWrappedComponentProps<Model>): {
    props: P & ARCWrappedComponentProps<Model>;
    ARCConfig: ARCConfig<Model>;
    actions: ReduxActionsList<Model>;
    core: CoreMethods;
    abortController: React.MutableRefObject<AbortController | null>;
    getTrueStoreState: () => {
        collection: any;
    };
    getPropsFromTrueStoreState: (props?: ComponentProps) => ComponentWithStoreProps<Model>;
    updateARC: (config: ARCConfig<Model>) => void;
};
export default Container;
