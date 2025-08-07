/**
 * Config
 */

import {AnyProps} from "./components.types"
import {ARCModel} from "./model.types"
import {ComponentProps} from "react"
import {ARCAxiosOptions} from "./actions.types";
import {AxiosPromise} from "axios";
import {ObjectValues} from "../utils";

export type ARCConfigHeaders = Record<string, string>


export const ARC_HTTP_METHOD = {
  get: "get",
  GET: "GET",
  delete: "delete",
  DELETE: "DELETE",
  head: "head",
  HEAD: "HEAD",
  options: "options",
  OPTIONS: "OPTIONS",
  post: "post",
  POST: "POST",
  put: "put",
  PUT: "PUT",
  patch: "patch",
  PATCH: "PATCH",
  purge: "purge",
  PURGE: "PURGE",
  link: "link",
  LINK: "LINK",
  unlink: "unlink",
  UNLINK: "UNLINK",
} as const
export type ARCHTTPMethod = ObjectValues<typeof ARC_HTTP_METHOD>



export interface ARCHttpRestMethodMap {
  create: ARCHTTPMethod
  update: ARCHTTPMethod
  delete: ARCHTTPMethod
  read: ARCHTTPMethod
}

export interface ARCConfigPaths extends Partial<Record<string, string>>{
  //to-be-renamed
  item: string
  read?: string
  delete?: string
  update?: string
  create?: string
}

export interface RetryConditionFnCallbackParams<Model, RequiredProps> {
  params: RequiredProps
  config: ARCConfig<Model>
  props: ComponentProps<any>
  axiosOptions: ARCAxiosOptions<Model>
  tryNumber: number
}
export type RetryConditionFn<Model, RequiredProps> = (
  // error
  arg0: any,
  // retry fn
  arg1: RetryConditionFnCallbackParams<Model, RequiredProps>
) => boolean


export type Fetcher<Model, RequiredProps>  = (params: RequiredProps,
                               config: ARCConfig<Model>,
                               props: AnyProps,
                               axiosOptions: ARCAxiosOptions<Model>) => AxiosPromise<Model>


export interface FetcherMap<Model, RequiredProps>  {
  // Default fetcher
  'fetch': Fetcher<Model, RequiredProps>
  [key: string]: Fetcher<Model, RequiredProps>
}

export interface ARCConfig<Model, RequiredProps = {}> {
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
  retryConditionFn?: RetryConditionFn<Model, RequiredProps>
  fetchers?: FetcherMap<Model, RequiredProps>
}
