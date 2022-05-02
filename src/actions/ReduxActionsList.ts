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

export class ReduxActionsList {
  config: ARCConfig
  initialConfig: ARCConfig
  retryConditionFn: RetryConditionFn | undefined
  axios: AxiosInstance
  headers: ARCConfigHeaders
  methods: ARCHttpRestMethodMap

  constructor(options: ReduxActionsListOptions) {
    this.config = { ...getDefaultConfig(), ...(options.config || {}) }
    this.initialConfig = this.config
    this.retryConditionFn = this.config.retryConditionFn
    this.setHeaders()
    this.setupMethods()
    this.axios = axios.create()
  }

  static GenerateCancelToken(axiosOptions: ARCAxiosOptions) {
    return new axios.CancelToken(function executor(c) {
      if (axiosOptions) {
        axiosOptions.cancel = c
      }
    })
  }

  getInitialConfig() {
    return this.initialConfig
  }

  generateCancelToken(axiosOptions: ARCAxiosOptions) {
    return new axios.CancelToken(function executor(c) {
      if (axiosOptions) {
        axiosOptions.cancel = c
      }
    })
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

  updateConfig(config: ARCConfig) {
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
    config: ARCConfig
    props: object
    params: ComponentPropsWithRequiredModelParams
  }): ARCConfig {
    const paths: ARCConfigPaths = {
      item: "",
    }
    //DECORATE URLS
    return {
      ...config,
      headers: this.decorateHeaders({ ...props, ...params }),
      paths: Object.keys(config.paths).reduce((s, path) => {
        const value = this.decorate(config.paths[path], params)
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
    config: ARCConfig,
    _props: object,
    axiosOptions: ARCAxiosOptions
  ): AxiosPromise {
    return this.axios({
      // @ts-ignore Default methods are already extended
      method: config.methods.read,
      url: config.paths.item,
      headers: config.headers,
      cancelToken: this.generateCancelToken(axiosOptions),
    })
  }

  // NEVER USED !
  // init(params) {
  //   return (dispatch) => {
  //     dispatch({
  //       type: this.decorate("INIT_{uppercaseName}"),
  //       payload: { params },
  //     })
  //   }
  // }

  // NEVER USED !
  // requestFetchOne(params) {
  //   return (dispatch) => {
  //     dispatch({
  //       type: this.decorate("FETCH_REQUESTED_{uppercaseName}"),
  //       payload: { params },
  //     })
  //   }
  // }

  fetchOne(
    params: ComponentPropsWithRequiredModelParams,
    props: object = {},
    axiosOptions: ARCAxiosOptions
  ) {
    return (dispatch: Dispatch) => {
      const retryConditionFn =
        this.retryConditionFn || axiosOptions?.retryConditionFn
      const config = this.beforeFetch({ config: this.config, params, props })
      const maxTries = this.config.maxTries || 1
      const applyRequest = (tryNumber: number = 1): AxiosPromise => {
        //(!!axiosOptions ? axiosOptions.retryConditionFn : undefined)
        dispatch({
          type: this.decorate("FETCH_{uppercaseName}"),
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
    config: ARCConfig,
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
    config: ARCConfig,
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
    config: ARCConfig,
    _props: object,
    axiosOptions: ARCAxiosOptions
  ): AxiosPromise {
    const url = config.paths.collection
    return this.axios({
      // @ts-ignore
      method: config.methods.read,
      url,
      headers: config.headers,
      cancelToken: this.generateCancelToken(axiosOptions),
    })
  }

  fetchAll(
    params: ComponentPropsWithRequiredModelParams,
    props: object = {},
    axiosOptions: ARCAxiosOptions
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

export default ReduxActionsList
