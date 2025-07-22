import Container from "./Container";
import { ARCContainerProps, ARCWrappedComponentProps, ComponentProps, ComponentPropsWithRequiredModelParams, ComponentWithStoreProps } from "../types/components.types";
type AnyArcComponentProps<Model> = ComponentWithStoreProps<Model> | ARCContainerProps<Model>;
export declare class ModelContainer<P, S, Model> extends Container<P, S, Model> {
    /** PUBLIC ACTIONS METHODS **/
    isNew(props?: ComponentProps): boolean;
    getKey(props?: ComponentProps): string | null;
    getParams(props?: ComponentProps): ComponentPropsWithRequiredModelParams | null;
    hasRequiredParams(props?: ComponentProps): boolean;
    _getModel(props?: AnyArcComponentProps<Model>): import("..").ARCMetaModel<Model> | null;
    fetch: (params: ComponentPropsWithRequiredModelParams) => import("axios").AxiosPromise<Model>;
    edit: (model: object) => void;
    save: () => void;
    remove: () => void;
    resetTempModel: () => void;
    /** PUBLIC METHODS **/
    getFetchingCount: () => number;
    getModel(props?: ARCWrappedComponentProps<Model>): Model | null;
    getMetas(prop: string, props?: ARCWrappedComponentProps<Model>): any;
    getError(props?: ARCWrappedComponentProps<Model>): object;
    isSyncing(props?: ARCWrappedComponentProps<Model>): boolean;
    isLoaded(props?: ARCWrappedComponentProps<Model>): boolean;
    allowReFetch: (props?: ComponentWithStoreProps<Model>) => boolean;
    errorReFetch(props?: ComponentWithStoreProps<Model>): boolean;
    componentDidUpdate(): void;
    prepareFetch({ skipReFetchStep }: {
        skipReFetchStep?: boolean | undefined;
    }): void;
    componentWillUnmount(): void;
    delayedFetch({ skipReFetchStep }: {
        skipReFetchStep?: boolean | undefined;
    }): void;
    _fetchAuthorization(props: ComponentWithStoreProps<Model>, { skipReFetchStep }: {
        skipReFetchStep?: boolean | undefined;
    }): boolean;
    componentDidMount(): void;
}
export {};
