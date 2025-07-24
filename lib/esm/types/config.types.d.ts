/**
 * Config
 */
import { ComponentPropsWithRequiredModelParams } from "./components.types";
import { ARCModel } from "./model.types";
import { ComponentProps } from "react";
export type ARCConfigHeaders = Record<string, string>;
export type ARCHTTPMethod = "get" | "GET" | "delete" | "DELETE" | "head" | "HEAD" | "options" | "OPTIONS" | "post" | "POST" | "put" | "PUT" | "patch" | "PATCH" | "purge" | "PURGE" | "link" | "LINK" | "unlink" | "UNLINK";
/**
 * Methods
 * @typedef {object} HttpRestMethodMap
 */
export interface ARCHttpRestMethodMap {
    create: ARCHTTPMethod;
    update: ARCHTTPMethod;
    delete: ARCHTTPMethod;
    read: ARCHTTPMethod;
}
export declare const ARCHttpRestMethodMapDefaults: ARCHttpRestMethodMap;
export interface ARCConfigPaths extends Partial<Record<string, string>> {
    item: string;
    collection?: string;
    read?: string;
    delete?: string;
    update?: string;
    create?: string;
}
export interface RetryConditionFnCallbackParams<Model> {
    params: ComponentPropsWithRequiredModelParams;
    config: ARCConfig<Model>;
    props: ComponentProps<any>;
    axiosOptions: any;
    tryNumber: number;
}
export type RetryConditionFn<Model> = (arg0: any, arg1: RetryConditionFnCallbackParams<Model>) => boolean;
/**
 * ARCConfig V1
 */
export interface ARCConfig<Model> {
    name: string;
    uppercaseName: string;
    modelProps: string[];
    collectionProps?: string[];
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
    retryConditionFn?: RetryConditionFn<Model>;
}
interface ARCHttpRestMethodMapDefaults<Model> {
    methods: ARCHttpRestMethodMap;
    defaultModel: ARCModel<Model>;
    defaultProps: Partial<ComponentProps<any>>;
    fetchOnce: boolean;
    refetchOnError: boolean;
    headers: object;
    maxPendingRequestsPerReducer: number;
    requestFetchDelay: number;
    maxTries: number;
}
export declare const ARCConfigDefaults: ARCHttpRestMethodMapDefaults<any>;
export {};
