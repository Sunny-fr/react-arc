import Container from "./Container";
import { AnyProps, ARCContainerProps, ComponentPropsWithRequiredModelParams, ComponentWithStoreProps } from "../types/components.types";
import { ARCMetas } from "../types/model.types";
import React from "react";
type AnyArcComponentProps<Model> = ComponentWithStoreProps | ARCContainerProps<Model>;
export declare class ModelContainer<P, Model, RequiredProps extends object = {}> extends Container<P, Model, RequiredProps> {
    /** PUBLIC ACTIONS METHODS **/
    isNew(props?: AnyProps): boolean;
    getKey(props?: AnyProps): string | null;
    getParams(props?: AnyProps): ComponentPropsWithRequiredModelParams | null;
    hasRequiredParams(props?: AnyProps): boolean;
    _getModel(props?: AnyArcComponentProps<Model>): any;
    fetch: (params: ComponentPropsWithRequiredModelParams) => import("axios").AxiosPromise<Model>;
    /** PUBLIC METHODS **/
    getFetchingCount: () => number;
    getModel(props?: ARCContainerProps<Model, RequiredProps>): Model | null;
    getMetas(prop: keyof ARCMetas, props?: ARCContainerProps<Model, RequiredProps>): any;
    getError(props?: ARCContainerProps<Model, RequiredProps>): any;
    isSyncing(props?: ARCContainerProps<Model, RequiredProps>): boolean;
    isLoaded(props?: ARCContainerProps<Model, RequiredProps>): boolean;
    allowReFetch: (props?: ARCContainerProps<Model, RequiredProps>) => boolean;
    errorReFetch(props?: ARCContainerProps<Model, RequiredProps>): boolean;
    componentDidUpdate(): void;
    prepareFetch({ skipReFetchStep }: {
        skipReFetchStep?: boolean | undefined;
    }): void;
    componentWillUnmount(): void;
    delayedFetch({ skipReFetchStep }: {
        skipReFetchStep?: boolean | undefined;
    }): void;
    _fetchAuthorization(props: ARCContainerProps<Model, RequiredProps>, { skipReFetchStep }: {
        skipReFetchStep?: boolean | undefined;
    }): boolean;
    componentDidMount(): void;
    getModelDataTyped(): Model | null;
    render(): React.JSX.Element | null;
}
export {};
