import { ARCConfig } from "./config.types";
import { ComponentPropsWithRequiredModelParams } from "./components.types";
import { ComponentProps } from "react";
export interface ReduxActionsOptions<Model> {
    config: ARCConfig<Model>;
}
export interface RetryFnParams<Model> {
    params: ComponentPropsWithRequiredModelParams;
    config: ARCConfig<Model>;
    props: Partial<ComponentProps<any>>;
    axiosOptions: ARCAxiosOptions<Model>;
    tryNumber: number;
}
export interface ARCAxiosOptions<Model> {
    abortController?: AbortController;
    retryConditionFn?: (error: any, params: RetryFnParams<Model>) => boolean;
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
