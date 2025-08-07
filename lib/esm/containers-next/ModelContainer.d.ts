import React from "react";
import { ContainerHookConfig } from "./Container";
import { AnyProps, ARCContainerProps, ComponentPropsWithRequiredModelParams, ComponentWithStoreProps } from "../types/components.types";
import { ARCMetas } from "../types/model.types";
type AnyArcComponentProps<Model> = ComponentWithStoreProps | ARCContainerProps<Model>;
export interface ModelContainerHookProps<Model, RequiredProps> extends ContainerHookConfig<Model, RequiredProps> {
    props: AnyProps;
}
export declare function useModelContainer<Model, RequiredProps extends object = {}>({ ARCConfig, props }: ModelContainerHookProps<Model, RequiredProps>): {
    isNew: (componentProps?: AnyProps) => boolean;
    getKey: (componentProps?: AnyProps) => string | null;
    getParams: (componentProps?: AnyProps) => ComponentPropsWithRequiredModelParams | null;
    hasRequiredParams: (componentProps?: AnyProps) => boolean;
    _getModel: (componentProps?: AnyArcComponentProps<Model>) => import("../types/model.types").ARCMetaModel<unknown> | null;
    fetch: (params: ComponentPropsWithRequiredModelParams) => Promise<void> | Promise<import("axios").AxiosResponse<Model, any>>;
    getFetchingCount: () => number;
    getModel: (componentProps?: ARCContainerProps<Model, RequiredProps>) => any;
    getMetas: (prop: keyof ARCMetas, componentProps?: ARCContainerProps<Model, RequiredProps>) => any;
    getError: (componentProps?: ARCContainerProps<Model, RequiredProps>) => any;
    isSyncing: (componentProps?: ARCContainerProps<Model, RequiredProps>) => any;
    isLoaded: (componentProps?: ARCContainerProps<Model, RequiredProps>) => any;
    allowReFetch: (componentProps?: AnyArcComponentProps<Model>) => boolean;
    errorReFetch: (componentProps?: AnyArcComponentProps<Model>) => boolean;
    getModelDataTyped: () => any;
    prepareFetch: ({ skipReFetchStep }: {
        skipReFetchStep?: boolean | undefined;
    }) => void;
    ARCConfig: import("..").ARCConfig<Model, {}>;
    actions: import("..").ReduxActions<Model, {}>;
    core: import("../actions/core").CoreMethods;
    abortController: React.MutableRefObject<AbortController | null>;
    updateARC: (config: import("..").ARCConfig<Model, {}>) => void;
};
export type ModelContainerProps<P, Model, RequiredProps extends object = {}> = P & ARCContainerProps<Model, RequiredProps> & {
    component: React.ComponentType<any>;
};
export declare function ModelContainer<P, Model>(props: ModelContainerProps<P, Model>): React.JSX.Element | null;
export default ModelContainer;
