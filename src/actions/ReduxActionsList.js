import axios from "axios"
import { getDefaultConfig, interpolate } from "../utils/index"
import commons from "../commons"

const ERRORS = {
  CANCEL_HTTP_REQUEST: "ARC:Cancel",
}

export class ReduxActionsList {
  constructor(options) {
    this.config = { ...getDefaultConfig(), ...(options.config || {}) }
    this.initialConfig = this.config
    this.retryConditionFn = options.retryConditionFn
    this.setHeaders()
    this.setupMethods()
    this.axios = axios.create()
  }

  static GenerateCancelToken(axiosOptions) {
    return new axios.CancelToken(function executor(c) {
      if (axiosOptions) {
        axiosOptions.cancel = c
      }
    })
  }

  getInitialConfig() {
    return this.initialConfig
  }

  generateCancelToken(axiosOptions) {
    return new axios.CancelToken(function executor(c) {
      if (axiosOptions) {
        axiosOptions.cancel = c
      }
    })
  }

  decorateHeaders(props = {}) {
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

  setHeaders() {
    this.headers =
      Object.keys(this.config.headers).length > 0
        ? { ...this.config.headers }
        : {}
  }

  updateConfig(config) {
    this.config = { ...this.config, ...config }
    this.setHeaders()
    this.setupMethods()
  }

  setupMethods() {
    const { methods } = this.config
    this.methods = {
      create: methods.create.toLowerCase(),
      read: methods.read.toLowerCase(),
      update: methods.update.toLowerCase(),
      delete: methods.delete.toLowerCase(),
    }
  }

  decorate = (str, options) => {
    return interpolate(str, options || this.config)
  }

  beforeFetch = ({ config, props = {}, params = {} }) => {
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
      }, {}),
    }
  }

  /** EDITING **/
  edit(data, params) {
    return (dispatch) => {
      dispatch({
        type: this.decorate("EDIT_{uppercaseName}"),
        payload: { data, params },
      })
    }
  }

  /** SINGLE ITEM **/

  standAloneFetchOne(params, config, props, axiosOptions) {
    return this.axios({
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

  fetchOne(params = {}, props = {}, axiosOptions) {
    return (dispatch) => {
      const generateRequest = (tryNumber = 1) => {
        const config = this.beforeFetch({ config: this.config, params, props })
        const retryConditionFn =
          this.retryConditionFn ||
          (!!axiosOptions ? axiosOptions.retryConditionFn : undefined)
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
              return generateRequest(tryNumber + 1)
            }
            if (
              typeof retryConditionFn !== "function" &&
              tryNumber < this.config.maxTries
            ) {
              //console.log(`retry #${tryNumber}`)
              return generateRequest(tryNumber + 1)
            }
            dispatch({
              type: this.decorate("FETCH_{uppercaseName}_REJECTED"),
              payload: { error, params },
            })
            return Promise.reject(error)
          })
      }

      return generateRequest()
    }
  }

  /**  SAVE **/

  standAloneSave(data, params, create, config, props) {
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

  save(data, params, create = false, props = {}) {
    return (dispatch) => {
      const config = this.beforeFetch({ config: this.config, params, props })
      dispatch({
        type: this.decorate("SAVE_{uppercaseName}"),
        payload: { data, params, create },
      })
      this.standAloneSave(data, params, create, config, props)
        .then((response) => {
          dispatch({
            type: this.decorate("SAVE_{uppercaseName}_FULFILLED"),
            payload: { params, data: response.data, create },
          })
        })
        .catch((error) => {
          dispatch({
            type: this.decorate("SAVE_{uppercaseName}_REJECTED"),
            payload: { error, data, params, create },
          })
        })
    }
  }

  /** REMOVE **/

  standAloneRemove(params, config, props) {
    const url = config.paths.item
    return this.axios({
      method: config.methods.delete,
      url,
      headers: config.headers,
    })
  }

  remove(params, props = {}) {
    return (dispatch) => {
      const config = this.beforeFetch({ config: this.config, params, props })
      dispatch({
        type: this.decorate("DELETE_{uppercaseName}"),
        payload: { params },
      })
      this.standAloneRemove(params, config, props)
        .then((response) => {
          dispatch({
            type: this.decorate("DELETE_{uppercaseName}_FULFILLED"),
            payload: { params, data: response.data },
          })
        })
        .catch((error) => {
          dispatch({
            type: this.decorate("DELETE_{uppercaseName}_REJECTED"),
            payload: { error, params },
          })
        })
    }
  }

  /** LISTS **/

  standAloneFetchAll(params, config, props, axiosOptions) {
    const url = config.paths.collection
    return this.axios({
      method: config.methods.read,
      url,
      headers: config.headers,
      cancelToken: this.generateCancelToken(axiosOptions),
    })
  }

  fetchAll(params = {}, props = {}, axiosOptions) {
    return (dispatch) => {
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
    return (dispatch) => {
      dispatch({ type: this.decorate("RESET_{uppercaseName}S") })
    }
  }

  resetTemp() {
    return (dispatch) => {
      dispatch({ type: this.decorate("RESET_{uppercaseName}_TEMP") })
    }
  }
}

export default ReduxActionsList
