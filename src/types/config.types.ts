/**
 * Config
 */

import { ComponentPropsWithRequiredModelParams } from "./components.types"
import { ARCModel } from "./model.types"
import { ComponentProps } from "react"
import {ARCAxiosOptions} from "./actions.types";
import {AxiosPromise} from "axios";

export type ARCConfigHeaders = Record<string, string>

export type ARCHTTPMethod =
  | "get"
  | "GET"
  | "delete"
  | "DELETE"
  | "head"
  | "HEAD"
  | "options"
  | "OPTIONS"
  | "post"
  | "POST"
  | "put"
  | "PUT"
  | "patch"
  | "PATCH"
  | "purge"
  | "PURGE"
  | "link"
  | "LINK"
  | "unlink"
  | "UNLINK"

/**
 * Methods
 * @typedef {object} HttpRestMethodMap
 */

export interface ARCHttpRestMethodMap {
  create: ARCHTTPMethod
  update: ARCHTTPMethod
  delete: ARCHTTPMethod
  read: ARCHTTPMethod
}
export const ARCHttpRestMethodMapDefaults: ARCHttpRestMethodMap = {
  create: "POST",
  update: "PUT",
  delete: "DELETE",
  read: "GET",
}

export interface ARCConfigPaths extends Partial<Record<string, string>>{
  //to-be-renamed
  item: string
  read?: string
  delete?: string
  update?: string
  create?: string
}

export interface RetryConditionFnCallbackParams<Model> {
  params: ComponentPropsWithRequiredModelParams
  config: ARCConfig<Model>
  props: ComponentProps<any>
  axiosOptions: any
  tryNumber: number
}
export type RetryConditionFn<Model> = (
  arg0: any,
  arg1: RetryConditionFnCallbackParams<Model>
) => boolean


export type Fetcher<Model>  = (params: ComponentPropsWithRequiredModelParams,
                               config: ARCConfig<Model>,
                               props: object,
                               axiosOptions: ARCAxiosOptions<Model>) => AxiosPromise<Model>


export type FetcherMap<Model> = {
  // Default fetcher
  'fetch': Fetcher<Model>
  [key: string]: Fetcher<Model>
}
/**
 * ARCConfig V1
 */
export interface ARCConfig<Model> {
  // Reducer Name
  name: string
  // Actions Namespace
  actionNamespace?: string
  // Required props component for a model type
  modelProps: string[]
  // URL to resources item for a model
  paths: ARCConfigPaths
  // Http methods/verbs
  methods?: ARCHttpRestMethodMap
  // default model
  defaultModel?: ARCModel<Model>
  // defaults props passed to a component
  defaultProps?: Partial<ComponentProps<any>>
  // will fetch the data only one time
  fetchOnce?: boolean
  // if fetching data fails when the component is remounted, it will try to fetch again the data
  refetchOnError?: boolean
  retryOnError?: boolean
  // headers added to the fetch request (supports also templating using component's props and {syntax}
  headers?: ARCConfigHeaders
  // max simultaneous requests
  maxPendingRequestsPerReducer?: number
  // delay between two requests
  requestFetchDelay?: number
  // number of tries in case of failure
  maxTries?: number
  retryConditionFn?: RetryConditionFn<Model>
  fetchers?: FetcherMap<Model>
}

interface ARCHttpRestMethodMapDefaults<Model> {
  // Http methods/verbs
  methods: ARCHttpRestMethodMap
  // default model
  defaultModel: ARCModel<Model>
  // defaults props passed to a component
  defaultProps: Partial<ComponentProps<any>>
  // will fetch the data only one time
  fetchOnce: boolean
  // if fetching data fails when the component is remounted, it will try to fetch again the data
  refetchOnError: boolean
  // headers added to the fetch request (supports also templating using component's props and {syntax}
  headers: object
  // max simultaneous requests
  maxPendingRequestsPerReducer: number
  // delay between two requests
  requestFetchDelay: number
  // number of tries in case of failure
  maxTries: number
}

export const ARCConfigDefaults: ARCHttpRestMethodMapDefaults<any> = {
  methods: {
    create: "POST",
    read: "GET",
    delete: "DELETE",
    update: "PUT",
  },
  defaultModel: {},
  defaultProps: {},
  fetchOnce: false,
  refetchOnError: false,
  maxPendingRequestsPerReducer: 1,
  maxTries: 1,
  requestFetchDelay: 100,
  headers: {},
}
