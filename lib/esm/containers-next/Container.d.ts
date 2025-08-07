import React from "react";
import { ReduxActions } from "../actions/ReduxActions";
import { CoreMethods } from "../actions/core";
import { ARCConfig } from "../types/config.types";
import { ARCWrappedComponentProps } from "../types/components.types";
export interface ContainerHookConfig<Model> {
    ARCConfig: ARCConfig<Model>;
}
export interface ContainerHookReturn<Model> {
    ARCConfig: ARCConfig<Model>;
    actions: ReduxActions<Model>;
    core: CoreMethods;
    abortController: React.MutableRefObject<AbortController | null>;
    updateARC: (config: ARCConfig<Model>) => void;
}
export declare function useContainer<Model>({ ARCConfig: initialConfig }: ContainerHookConfig<Model>): ContainerHookReturn<Model>;
export declare function Container<P, Model>(props: P & ARCWrappedComponentProps<Model>): {
    props: P & ARCWrappedComponentProps<Model>;
    ARCConfig: ARCConfig<Model, {}>;
    actions: ReduxActions<Model>;
    core: CoreMethods;
    abortController: React.MutableRefObject<AbortController | null>;
    updateARC: (config: ARCConfig<Model, {}>) => void;
};
export default Container;
