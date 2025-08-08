/**
 * Config
 */
import { AnyProps, ComponentPropsWithRequiredModelParams } from "./components.types";
import { ARCModel } from "./model.types";
import { ComponentProps } from "react";
import { ARCAxiosOptions } from "./actions.types";
import { AxiosPromise } from "axios";
import { ObjectValues } from "../utils";
export type ARCConfigHeaders = Record<string, string>;
export declare const ARC_HTTP_METHOD: {
    readonly get: "get";
    readonly GET: "GET";
    readonly delete: "delete";
    readonly DELETE: "DELETE";
    readonly head: "head";
    readonly HEAD: "HEAD";
    readonly options: "options";
    readonly OPTIONS: "OPTIONS";
    readonly post: "post";
    readonly POST: "POST";
    readonly put: "put";
    readonly PUT: "PUT";
    readonly patch: "patch";
    readonly PATCH: "PATCH";
    readonly purge: "purge";
    readonly PURGE: "PURGE";
    readonly link: "link";
    readonly LINK: "LINK";
    readonly unlink: "unlink";
    readonly UNLINK: "UNLINK";
};
export type ARCHTTPMethod = ObjectValues<typeof ARC_HTTP_METHOD>;
export interface ARCHttpRestMethodMap {
    create: ARCHTTPMethod;
    update: ARCHTTPMethod;
    delete: ARCHTTPMethod;
    read: ARCHTTPMethod;
}
export interface ARCConfigPaths extends Partial<Record<string, string>> {
    item: string;
    read?: string;
    delete?: string;
    update?: string;
    create?: string;
}
export interface RetryConditionFnCallbackParams<Model, RequiredProps = {}> {
    params: ComponentPropsWithRequiredModelParams;
    config: ARCConfig<Model, RequiredProps>;
    props: ComponentProps<any>;
    axiosOptions?: ARCAxiosOptions<Model, RequiredProps>;
    tryNumber: number;
}
export type RetryConditionFn<Model, RequiredProps = {}> = (arg0: any, arg1: RetryConditionFnCallbackParams<Model, RequiredProps>) => boolean;
export type Fetcher<Model, RequiredProps> = (params: RequiredProps, config: ARCConfig<Model>, props: AnyProps, axiosOptions: ARCAxiosOptions<Model, RequiredProps>) => AxiosPromise<Model>;
export interface FetcherMap<Model, RequiredProps> {
    'fetch': Fetcher<Model, RequiredProps>;
    [key: string]: Fetcher<Model, RequiredProps>;
}
export interface ARCConfig<Model, RequiredProps = {}> {
    name: string;
    actionNamespace?: string;
    modelProps: string[];
    paths: ARCConfigPaths;
    methods?: ARCHttpRestMethodMap;
    defaultModel?: ARCModel<Model>;
    defaultProps?: Partial<ComponentProps<any>>;
    fetchOnce?: boolean;
    refetchOnError?: boolean;
    retryOnError?: boolean;
    headers?: ARCConfigHeaders;
    maxPendingRequestsPerReducer?: number;
    requestFetchDelay?: number;
    maxTries?: number;
    retryConditionFn?: RetryConditionFn<Model, RequiredProps>;
    fetchers?: FetcherMap<Model, RequiredProps>;
}
