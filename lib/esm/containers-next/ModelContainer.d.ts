import React from "react";
import { ContainerHookConfig } from "./Container";
import { ARCContainerProps, ARCWrappedComponentProps, ComponentProps, ComponentPropsWithRequiredModelParams, ComponentWithStoreProps } from "../types/components.types";
import { ARCMetas } from "../types/model.types";
type AnyArcComponentProps<Model> = ComponentWithStoreProps<Model> | ARCContainerProps<Model>;
export interface ModelContainerHookProps<Model> extends ContainerHookConfig<Model> {
    props: ComponentProps;
}
export declare function useModelContainer<Model>({ ARCConfig, props: initialProps }: ModelContainerHookProps<Model>): {
    isNew: (componentProps?: ComponentProps) => boolean;
    getKey: (componentProps?: ComponentProps) => string | null;
    getParams: (componentProps?: ComponentProps) => ComponentPropsWithRequiredModelParams | null;
    hasRequiredParams: (componentProps?: ComponentProps) => boolean;
    _getModel: (componentProps?: AnyArcComponentProps<Model>) => import("../types/model.types").ARCMetaModel<Model> | null;
    fetch: (params: ComponentPropsWithRequiredModelParams) => Promise<void> | Promise<import("axios").AxiosResponse<Model, any>>;
    edit: (model: object) => void;
    save: () => void;
    remove: () => void;
    resetTempModel: () => void;
    getFetchingCount: () => number;
    getModel: (componentProps?: ARCWrappedComponentProps<Model>) => any;
    getMetas: (prop: keyof ARCMetas, componentProps?: ARCWrappedComponentProps<Model>) => any;
    getError: (componentProps?: ARCWrappedComponentProps<Model>) => any;
    isSyncing: (componentProps?: ARCWrappedComponentProps<Model>) => any;
    isLoaded: (componentProps?: ARCWrappedComponentProps<Model>) => any;
    allowReFetch: (componentProps?: ComponentWithStoreProps<Model>) => boolean;
    errorReFetch: (componentProps?: ComponentWithStoreProps<Model>) => boolean;
    getModelDataTyped: () => any;
    prepareFetch: ({ skipReFetchStep }: {
        skipReFetchStep?: boolean | undefined;
    }) => void;
    ARCConfig: import("..").ARCConfig<Model>;
    actions: import("..").ReduxActions<Model>;
    core: import("../actions/core").CoreMethods;
    abortController: React.MutableRefObject<AbortController | null>;
    getTrueStoreState: () => {
        collection: any;
    };
    getPropsFromTrueStoreState: (props?: ComponentProps) => ComponentWithStoreProps<Model>;
    updateARC: (config: import("..").ARCConfig<Model>) => void;
};
export type ModelContainerProps<P, Model> = P & ARCWrappedComponentProps<Model> & {
    component: React.ComponentType<any>;
};
export declare function ModelContainer<P, Model>(props: ModelContainerProps<P, Model>): React.JSX.Element | null;
export default ModelContainer;
