import axios, { AxiosInstance, AxiosPromise } from "axios"
import { getDefaultConfig, interpolate } from "../utils"
import {
  ARCConfig,
  ARCConfigHeaders,
  ARCConfigPaths,
  ARCHttpRestMethodMap,
  RetryConditionFn,
} from "../types/config.types"
//import { ARCStoreState } from "../types/connectors.types"
import { Dispatch } from "redux"

import { ComponentPropsWithRequiredModelParams } from "../types/components.types"
import {
  ARCAxiosOptions,
  ReduxActionsListOptions,
} from "../types/actions.types"

//type Actions = any //{ type: 'FOO' } | { type: 'BAR'; result: number };

//type ThunkResult<R> = ThunkAction<R, ARCStoreState, undefined, Actions>

const ERRORS = {
  CANCEL_HTTP_REQUEST: "ARC:Cancel",
}

export class ReduxActionsList<Model>{
  config: ARCConfig<Model>
  initialConfig: ARCConfig<Model>
  retryConditionFn: RetryConditionFn<Model> | undefined
  axios: AxiosInstance
  headers: ARCConfigHeaders
  methods: ARCHttpRestMethodMap

  constructor(options: ReduxActionsListOptions<Model>) {
    this.config = { ...getDefaultConfig(), ...(options.config || {}) }
    this.initialConfig = this.config
    this.retryConditionFn = this.config.retryConditionFn
    this.setHeaders()
    this.setupMethods()
    this.axios = axios.create()
  }

  static GenerateAbortSignal<Model>(axiosOptions: ARCAxiosOptions<Model>) {
    return axiosOptions?.abortController?.signal
  }

  getInitialConfig() {
    return this.initialConfig
  }

  generateAbortSignal(axiosOptions: ARCAxiosOptions<Model>) {
    return axiosOptions?.abortController?.signal
  }

  decorateHeaders(props = {}): ARCConfigHeaders {
    const { headers } = this
    if (Object.keys(headers || {}).length < 1) {
      return {}
    }
    return Object.keys(headers).reduce((state, header) => {
      if (!headers[header]) return state

      return {
        ...state,
        [header]: interpolate(headers[header], props),
      }
    }, {})
  }

  setHeaders(): void {
    const headers = this.config.headers || {}
    this.headers = { ...headers }
  }

  updateConfig(config: ARCConfig<Model>) {
    this.config = { ...this.config, ...config }
    this.setHeaders()
    this.setupMethods()
  }

  setupMethods() {
    const { methods } = this.config

    this.methods = {
      // @ts-ignore Default methods are already extended
      create: methods.create.toLowerCase(),
      // @ts-ignore Default methods are already extended
      read: methods.read.toLowerCase(),
      // @ts-ignore Default methods are already extended
      update: methods.update.toLowerCase(),
      // @ts-ignore Default methods are already extended
      delete: methods.delete.toLowerCase(),
    }
  }

  decorate = (str: string, options?: object): string => {
    return interpolate(str, options || this.config)
  }

  beforeFetch({
    config,
    props = {},
    params,
  }: {
    config: ARCConfig<Model>
    props: object
    params: ComponentPropsWithRequiredModelParams
  }): ARCConfig<Model> {
    const paths: ARCConfigPaths = {
      item: "",
    }
    //DECORATE URLS
    return {
      ...config,
      headers: this.decorateHeaders({ ...props, ...params }),
      paths: Object.keys(config.paths).reduce((s, path) => {
        const _path = config.paths[path]
        if(!_path) {
          throw new Error(`Path ${path} in your ARCConfig  is not defined in config`)
        }
        const value = this.decorate(_path, params)
        return {
          ...s,
          [path]: value,
        }
      }, paths),
    }
  }

  /** EDITING **/
  edit(data: any, params: ComponentPropsWithRequiredModelParams) {
    return (dispatch: Dispatch) => {
      dispatch({
        type: this.decorate("EDIT_{uppercaseName}"),
        payload: { data, params },
      })
    }
  }

  /** SINGLE ITEM **/

  standAloneFetchOne(
    _params: ComponentPropsWithRequiredModelParams,
    config: ARCConfig<Model>,
    _props: object,
    axiosOptions: ARCAxiosOptions<Model>
  ): AxiosPromise<Model> {
    return this.axios({
      // methods are already lowercased in setupMethods
      method: (config.methods as ARCHttpRestMethodMap).read ,
      url: config.paths.item,
      headers: config.headers,
      signal: this.generateAbortSignal(axiosOptions),
    })
  }


  fetchOne(
    params: ComponentPropsWithRequiredModelParams,
    props: object = {},
    axiosOptions: ARCAxiosOptions<Model>
  ) {
    return (dispatch: Dispatch) => {

      const retryConditionFn =
        this.retryConditionFn || axiosOptions?.retryConditionFn
      const config = this.beforeFetch({ config: this.config, params, props })
      const maxTries = this.config.maxTries || 1
      const applyRequest = (tryNumber: number = 1): AxiosPromise<Model> => {
        //(!!axiosOptions ? axiosOptions.retryConditionFn : undefined)
        const actionType = this.decorate("FETCH_{uppercaseName}")
        dispatch({
          type: actionType,
          payload: {
            params,
            tries: tryNumber,
          },
        })
        return this.standAloneFetchOne(params, config, props, axiosOptions)
          .then((response) => {
            dispatch({
              type: this.decorate("FETCH_{uppercaseName}_FULFILLED"),
              payload: { data: response.data, params },
            })
            return Promise.resolve(response)
          })
          .catch((error) => {
            if (error && error.type === ERRORS.CANCEL_HTTP_REQUEST) {
              dispatch({
                type: this.decorate("FETCH_{uppercaseName}_CANCELLED"),
                payload: { error, params },
              })
              return Promise.reject(error)
            }

            if (
              typeof retryConditionFn === "function" &&
              retryConditionFn(error, {
                params,
                config,
                props,
                axiosOptions,
                tryNumber,
              })
            ) {
              //console.log(`retry #${tryNumber}`)
              return applyRequest(tryNumber + 1)
            }
            if (
              typeof retryConditionFn !== "function" &&
              tryNumber < maxTries
            ) {
              //console.log(`retry #${tryNumber}`)
              return applyRequest(tryNumber + 1)
            }
            dispatch({
              type: this.decorate("FETCH_{uppercaseName}_REJECTED"),
              payload: { error, params },
            })
            return Promise.reject(error)
          })
      }

      return applyRequest()
    }
  }

  /**  SAVE **/

  standAloneSave(
    data: object,
    params: ComponentPropsWithRequiredModelParams,
    create: boolean,
    config: ARCConfig<Model>,
    _props: object
  ) {
    // @ts-ignore
    const method = create ? config.methods.create : config.methods.update
    const url = this.decorate(
      this.config.paths.item,
      method === "post" ? {} : params
    )
    return this.axios({
      method,
      url,
      headers: config.headers,
      data,
    })
  }

  save(
    data: object,
    params: ComponentPropsWithRequiredModelParams,
    create: boolean = false,
    props: object = {}
  ) {
    return (dispatch: Dispatch): AxiosPromise => {
      const config = this.beforeFetch({ config: this.config, params, props })
      dispatch({
        type: this.decorate("SAVE_{uppercaseName}"),
        payload: { data, params, create },
      })
      return this.standAloneSave(data, params, create, config, props)
        .then((response) => {
          dispatch({
            type: this.decorate("SAVE_{uppercaseName}_FULFILLED"),
            payload: { params, data: response.data, create },
          })
          return Promise.resolve(response)
        })
        .catch((error) => {
          dispatch({
            type: this.decorate("SAVE_{uppercaseName}_REJECTED"),
            payload: { error, data, params, create },
          })
          return Promise.reject(error)
        })
    }
  }

  /** REMOVE **/

  standAloneRemove(
    _params: ComponentPropsWithRequiredModelParams,
    config: ARCConfig<Model>,
    _props: object
  ): AxiosPromise {
    const url = config.paths.item
    return this.axios({
      // @ts-ignore
      method: config.methods.delete,
      url,
      headers: config.headers,
    })
  }

  remove(params: ComponentPropsWithRequiredModelParams, props: object = {}) {
    return (dispatch: Dispatch): AxiosPromise => {
      const config = this.beforeFetch({ config: this.config, params, props })
      dispatch({
        type: this.decorate("DELETE_{uppercaseName}"),
        payload: { params },
      })
      return this.standAloneRemove(params, config, props)
        .then((response) => {
          dispatch({
            type: this.decorate("DELETE_{uppercaseName}_FULFILLED"),
            payload: { params, data: response.data },
          })
          return Promise.resolve(response)
        })
        .catch((error) => {
          dispatch({
            type: this.decorate("DELETE_{uppercaseName}_REJECTED"),
            payload: { error, params },
          })
          return Promise.reject(error)
        })
    }
  }

  /**
   * LISTS
   * to be deprecated
   * **/

  standAloneFetchAll(
    _params: ComponentPropsWithRequiredModelParams,
    config: ARCConfig<Model>,
    _props: object,
    axiosOptions: ARCAxiosOptions<Model>
  ): AxiosPromise<Model[]> {
    const url = config.paths.collection
    return this.axios({
      method: (config.methods as ARCHttpRestMethodMap).read,
      url,
      headers: config.headers,
      signal: this.generateAbortSignal(axiosOptions),
    })
  }

  fetchAll(
    params: ComponentPropsWithRequiredModelParams,
    props: object = {},
    axiosOptions: ARCAxiosOptions<Model>
  ) {
    return (dispatch: Dispatch): AxiosPromise => {
      dispatch({
        type: this.decorate("FETCH_{uppercaseName}S"),
        payload: { params },
      })
      const config = this.beforeFetch({ config: this.config, params, props })
      return this.standAloneFetchAll(params, config, props, axiosOptions)
        .then((response) => {
          dispatch({
            type: this.decorate("FETCH_{uppercaseName}S_FULFILLED"),
            payload: { data: response.data },
          })
          return Promise.resolve(response)
        })
        .catch((error) => {
          if (error && error.type === ERRORS.CANCEL_HTTP_REQUEST) {
            dispatch({
              type: this.decorate("FETCH_{uppercaseName}S_CANCELLED"),
              payload: { error, params },
            })
            return Promise.reject(error)
          }
          dispatch({
            type: this.decorate("FETCH_{uppercaseName}S_REJECTED"),
            payload: { error, params },
          })
          return Promise.reject(error)
        })
    }
  }

  reset() {
    return (dispatch: Dispatch): void => {
      dispatch({ type: this.decorate("RESET_{uppercaseName}S") })
      return
    }
  }

  resetTemp() {
    return (dispatch: Dispatch): void => {
      dispatch({ type: this.decorate("RESET_{uppercaseName}_TEMP") })
    }
  }
}


