import React from "react";
import { ReduxActions } from "../actions/ReduxActions";
import { CoreMethods } from "../actions/core";
import { ARCConfig } from "../types/config.types";
import { ARCContainerProps } from "../types/components.types";
export interface UseContainerParams<Model, RequiredProps> {
    ARCConfig: ARCConfig<Model, RequiredProps>;
}
export interface UseContainerReturn<Model, RequiredProps = {}> {
    ARCConfig: ARCConfig<Model, RequiredProps>;
    actions: ReduxActions<Model, RequiredProps>;
    core: CoreMethods;
    abortController: React.RefObject<AbortController | null>;
    updateARC: (config: ARCConfig<Model, RequiredProps>) => void;
}
export declare function useContainer<Model, RequiredProps = {}>({ ARCConfig: initialConfig }: UseContainerParams<Model, RequiredProps>): UseContainerReturn<Model, RequiredProps>;
export declare function Container<Model, RequiredProps = {}, OwnProps = {}>(props: ARCContainerProps<Model, RequiredProps, OwnProps>): {
    props: ARCContainerProps<Model, RequiredProps, OwnProps>;
    ARCConfig: ARCConfig<Model, RequiredProps>;
    actions: ReduxActions<Model, RequiredProps, {}>;
    core: CoreMethods;
    abortController: React.RefObject<AbortController | null>;
    updateARC: (config: ARCConfig<Model, RequiredProps>) => void;
};
export default Container;
