import Container from "./Container";
import { AnyProps, ARCConnectedComponent, ARCContainerProps, ARCWrappedComponentProps, ComponentPropsWithRequiredModelParams, ComponentWithStoreProps } from "../types/components.types";
import { ARCMetas } from "../types/model.types";
import React from "react";
type AnyArcComponentProps<Model> = ComponentWithStoreProps | ARCContainerProps<Model>;
export declare class ModelContainer<P, S, Model> extends Container<P, S, Model> {
    /** PUBLIC ACTIONS METHODS **/
    isNew(props?: AnyProps): boolean;
    getKey(props?: AnyProps): string | null;
    getParams(props?: AnyProps): ComponentPropsWithRequiredModelParams | null;
    hasRequiredParams(props?: AnyProps): boolean;
    _getModel(props?: AnyArcComponentProps<Model>): any;
    fetch: (params: ComponentPropsWithRequiredModelParams) => import("axios").AxiosPromise<Model>;
    remove: () => void;
    /** PUBLIC METHODS **/
    getFetchingCount: () => number;
    getModel(props?: ARCWrappedComponentProps<Model>): any;
    getMetas(prop: keyof ARCMetas, props?: ARCWrappedComponentProps<Model>): any;
    getError(props?: ARCWrappedComponentProps<Model>): any;
    isSyncing(props?: ARCWrappedComponentProps<Model>): any;
    isLoaded(props?: ARCWrappedComponentProps<Model>): any;
    allowReFetch: (props?: ARCConnectedComponent<Model>) => boolean;
    errorReFetch(props?: ARCConnectedComponent<Model>): boolean;
    componentDidUpdate(): void;
    prepareFetch({ skipReFetchStep }: {
        skipReFetchStep?: boolean | undefined;
    }): void;
    componentWillUnmount(): void;
    delayedFetch({ skipReFetchStep }: {
        skipReFetchStep?: boolean | undefined;
    }): void;
    _fetchAuthorization(props: ARCConnectedComponent<Model>, { skipReFetchStep }: {
        skipReFetchStep?: boolean | undefined;
    }): boolean;
    componentDidMount(): void;
    getModelDataTyped(): any;
    render(): React.JSX.Element | null;
}
export {};
