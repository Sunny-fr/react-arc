import React from "react";
import { UseContainerParams } from "./Container";
import { ARCContainerProps } from "../types/components.types";
import { ARCMetas } from "../types/model.types";
export interface UseModelContainer<Model, RequiredProps = {}, OwnProps = {}> extends UseContainerParams<Model, RequiredProps> {
    props: ARCContainerProps<Model, RequiredProps, OwnProps>;
}
export declare function useModelContainer<Model, RequiredProps extends object = {}, OwnProps extends object = {}>({ ARCConfig, props }: UseModelContainer<Model, RequiredProps, OwnProps>): {
    isNew: (componentProps?: ARCContainerProps<Model, RequiredProps, OwnProps>) => boolean;
    getKey: (componentProps?: ARCContainerProps<Model, RequiredProps, OwnProps>) => string | null;
    getParams: (componentProps?: ARCContainerProps<Model, RequiredProps, OwnProps>) => RequiredProps | null;
    hasRequiredParams: (componentProps?: ARCContainerProps<Model, RequiredProps, OwnProps>) => boolean;
    _getModel: (componentProps: ARCContainerProps<Model, RequiredProps, OwnProps>) => import("../types/model.types").ARCMetaModel<Model> | null;
    fetch: (params: RequiredProps) => Promise<void> | Promise<import("axios").AxiosResponse<Model, any, {}>>;
    getFetchingCount: () => number;
    getModel: (componentProps?: ARCContainerProps<Model, RequiredProps, OwnProps>) => Model | null;
    getMetas: (prop: keyof ARCMetas, componentProps?: ARCContainerProps<Model, RequiredProps, OwnProps>) => any;
    getError: (componentProps?: ARCContainerProps<Model, RequiredProps, OwnProps>) => any;
    isSyncing: (componentProps?: ARCContainerProps<Model, RequiredProps, OwnProps>) => boolean;
    isLoaded: (componentProps?: ARCContainerProps<Model, RequiredProps, OwnProps>) => boolean;
    allowReFetch: (componentProps?: ARCContainerProps<Model, RequiredProps, OwnProps>) => boolean;
    errorReFetch: (componentProps?: ARCContainerProps<Model, RequiredProps, OwnProps>) => boolean;
    getModelDataTyped: () => Model | null | undefined;
    prepareFetch: ({ skipReFetchStep }: {
        skipReFetchStep?: boolean | undefined;
    }) => void;
    ARCConfig: import("..").ARCConfig<Model, RequiredProps>;
    actions: import("..").ReduxActions<Model, RequiredProps, {}>;
    core: import("../actions/core").CoreMethods;
    abortController: React.RefObject<AbortController | null>;
    updateARC: (config: import("..").ARCConfig<Model, RequiredProps>) => void;
};
export type ModelContainerProps<Model, RequiredProps = {}, OwnProps = {}> = OwnProps & ARCContainerProps<Model, RequiredProps, OwnProps> & {};
export declare function ModelContainer<Model, RequiredProps extends object = {}, OwnProps = {}>(props: ModelContainerProps<Model, RequiredProps, OwnProps>): React.JSX.Element | null;
export default ModelContainer;
