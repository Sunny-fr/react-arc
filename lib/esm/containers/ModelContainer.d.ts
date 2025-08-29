import Container from "./Container";
import { ARCContainerProps } from "../types/components.types";
import { ARCMetas } from "../types/model.types";
import React from "react";
/**
 * DEPRECATED: Use containers-next instead
 * @deprecated Use ModelContainer from containers-next instead
 */
export declare class ModelContainer<Model, RequiredProps = {}, OwnProps extends object = {}, State = any> extends Container<Model, RequiredProps, OwnProps, State> {
    /** PUBLIC ACTIONS METHODS **/
    isNew(props?: ARCContainerProps<Model, RequiredProps, OwnProps>): boolean;
    getKey(props?: ARCContainerProps<Model, RequiredProps, OwnProps>): string | null;
    getParams(props?: ARCContainerProps<Model, RequiredProps, OwnProps>): RequiredProps | null;
    hasRequiredParams(props?: ARCContainerProps<Model, RequiredProps, OwnProps>): boolean;
    _getModel(props?: ARCContainerProps<Model, RequiredProps, OwnProps>): import("../types/model.types").ARCMetaModel<Model>;
    fetch: (params: RequiredProps) => import("axios").AxiosPromise<Model>;
    /** PUBLIC METHODS **/
    getFetchingCount: () => number;
    getModel(props?: ARCContainerProps<Model, RequiredProps, OwnProps>): Model | null;
    getMetas(prop: keyof ARCMetas, props?: ARCContainerProps<Model, RequiredProps, OwnProps>): any;
    getError(props?: ARCContainerProps<Model, RequiredProps, OwnProps>): any;
    isSyncing(props?: ARCContainerProps<Model, RequiredProps, OwnProps>): boolean;
    isLoaded(props?: ARCContainerProps<Model, RequiredProps, OwnProps>): boolean;
    allowReFetch: (props?: ARCContainerProps<Model, RequiredProps, OwnProps>) => boolean;
    errorReFetch(props?: ARCContainerProps<Model, RequiredProps, OwnProps>): boolean;
    componentDidUpdate(): void;
    prepareFetch({ skipReFetchStep }: {
        skipReFetchStep?: boolean | undefined;
    }): void;
    componentWillUnmount(): void;
    delayedFetch({ skipReFetchStep }: {
        skipReFetchStep?: boolean | undefined;
    }): void;
    _fetchAuthorization(props: ARCContainerProps<Model, RequiredProps, OwnProps>, { skipReFetchStep }: {
        skipReFetchStep?: boolean | undefined;
    }): boolean;
    componentDidMount(): void;
    render(): React.JSX.Element | null;
}
