import React from "react";
import { ReduxActions } from "../actions/ReduxActions";
import { CoreMethods } from "../actions/core";
import { ARCConfig } from "../types/config.types";
import { ARCContainerProps } from "../types/components.types";
export interface ContainerHookConfig<Model, RequiredProps> {
    ARCConfig: ARCConfig<Model, RequiredProps>;
}
export interface ContainerHookReturn<Model> {
    ARCConfig: ARCConfig<Model>;
    actions: ReduxActions<Model>;
    core: CoreMethods;
    abortController: React.MutableRefObject<AbortController | null>;
    updateARC: (config: ARCConfig<Model>) => void;
}
export declare function useContainer<Model, RequiredProps extends object = {}>({ ARCConfig: initialConfig }: ContainerHookConfig<Model, RequiredProps>): ContainerHookReturn<Model>;
export declare function Container<P, Model, RequiredProps extends object = {}>(props: P & ARCContainerProps<Model, RequiredProps>): {
    props: P & ARCContainerProps<Model, RequiredProps, {}>;
    ARCConfig: ARCConfig<Model, {}>;
    actions: ReduxActions<Model, {}>;
    core: CoreMethods;
    abortController: React.MutableRefObject<AbortController | null>;
    updateARC: (config: ARCConfig<Model, {}>) => void;
};
export default Container;
