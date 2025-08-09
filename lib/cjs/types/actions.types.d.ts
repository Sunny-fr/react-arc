import { ARCConfig } from "./config.types";
export interface ReduxActionsOptions<Model, RequiredProps> {
    config: ARCConfig<Model, RequiredProps>;
}
export interface RetryFnParams<Model, RequiredProps, OwnProps = {}> {
    params: RequiredProps;
    config: ARCConfig<Model, RequiredProps>;
    props: OwnProps;
    axiosOptions: ARCAxiosOptions<Model, RequiredProps, OwnProps>;
    tryNumber: number;
}
export interface ARCAxiosOptions<Model, RequiredProps, OwnProps = {}> {
    abortController?: AbortController;
    retryConditionFn?: (error: any, params: RetryFnParams<Model, RequiredProps, OwnProps>) => boolean;
}
export interface ArcFetchError {
    message: string;
    meta: {
        code: string;
        message: string;
        status: number;
        response: {
            status: number;
            statusText: string;
            data: any;
        };
    };
}
