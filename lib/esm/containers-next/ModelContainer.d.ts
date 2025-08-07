import React from "react";
import { ContainerHookConfig } from "./Container";
import { AnyProps, ARCContainerProps, ARCWrappedComponentProps, ComponentPropsWithRequiredModelParams, ComponentWithStoreProps } from "../types/components.types";
import { ARCMetas } from "../types/model.types";
type AnyArcComponentProps<Model> = ComponentWithStoreProps | ARCContainerProps<Model>;
export interface ModelContainerHookProps<Model> extends ContainerHookConfig<Model> {
    props: AnyProps;
}
export declare function useModelContainer<Model>({ ARCConfig, props }: ModelContainerHookProps<Model>): {
    isNew: (componentProps?: AnyProps) => boolean;
    getKey: (componentProps?: AnyProps) => string | null;
    getParams: (componentProps?: AnyProps) => ComponentPropsWithRequiredModelParams | null;
    hasRequiredParams: (componentProps?: AnyProps) => boolean;
    _getModel: (componentProps?: AnyArcComponentProps<Model>) => import("../types/model.types").ARCMetaModel<unknown> | null;
    fetch: (params: ComponentPropsWithRequiredModelParams) => Promise<void> | Promise<import("axios").AxiosResponse<Model, any>>;
    edit: (model: object) => void;
    save: () => void;
    remove: () => void;
    getFetchingCount: () => number;
    getModel: (componentProps?: ARCWrappedComponentProps<Model>) => any;
    getMetas: (prop: keyof ARCMetas, componentProps?: ARCWrappedComponentProps<Model>) => any;
    getError: (componentProps?: ARCWrappedComponentProps<Model>) => any;
    isSyncing: (componentProps?: ARCWrappedComponentProps<Model>) => any;
    isLoaded: (componentProps?: ARCWrappedComponentProps<Model>) => any;
    allowReFetch: (componentProps?: AnyArcComponentProps<Model>) => boolean;
    errorReFetch: (componentProps?: AnyArcComponentProps<Model>) => boolean;
    getModelDataTyped: () => any;
    prepareFetch: ({ skipReFetchStep }: {
        skipReFetchStep?: boolean | undefined;
    }) => void;
    ARCConfig: import("..").ARCConfig<Model, {}>;
    actions: import("..").ReduxActions<Model>;
    core: import("../actions/core").CoreMethods;
    abortController: React.MutableRefObject<AbortController | null>;
    updateARC: (config: import("..").ARCConfig<Model, {}>) => void;
};
export type ModelContainerProps<P, Model> = P & ARCWrappedComponentProps<Model> & {
    component: React.ComponentType<any>;
};
export declare function ModelContainer<P, Model>(props: ModelContainerProps<P, Model>): React.JSX.Element | null;
export default ModelContainer;
