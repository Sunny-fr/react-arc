import {ARCConfig, ARCConfigHeaders, ARCHttpRestMethodMap,} from "../types/config.types"
import {getParams, initializeConfig, interpolate} from "../utils"
import {AnyProps, ComponentPropsWithRequiredModelParams,} from "../types/components.types"

interface ARCParams<Model> {
  ARCConfig: ARCConfig<Model>
}

export class ARC<Model> {
  config: ARCConfig<Model>

  constructor({ ARCConfig }: ARCParams<Model>) {
    this.config = ARC.createConfig(ARCConfig)
  }

  static createConfig<Model>(ARCConfig: ARCConfig<Model>): ARCConfig<Model> {
    const config = ARC.extendConfig(ARCConfig)
    config.headers = ARC.extendHeaders(config)
    config.methods = ARC.extendMethods(config)
    return config
  }

  static extendConfig<Model>(ARCConfig: ARCConfig<Model>): ARCConfig<Model> {
    return initializeConfig(ARCConfig)
  }

  static extendHeaders<Model>(ARCConfig: ARCConfig<Model>): ARCConfigHeaders {
    const headers = ARCConfig.headers || {}
    return { ...headers }
  }

  static extendMethods<Model>(extendedConfig: ARCConfig<Model>): ARCHttpRestMethodMap {
    const { methods } = extendedConfig
    return {
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

  hasRequiredParams(props: AnyProps): boolean {
    return this.config.modelProps.every((prop) => {
      return typeof props[prop] !== "undefined"
    })
  }

  extractParams(props: AnyProps): ComponentPropsWithRequiredModelParams {
    return getParams(this.config, props)
  }

  applyHeaders(
    headers: ARCConfigHeaders = {},
    props: AnyProps
  ): ARCConfigHeaders {
    // MUST BE PROPS !!!
    // OR PARAMS MUST TAKE THE CHARGE OF HAVING SPECIALS PROPS SUCH AS TOKEN/BEARERS
    return Object.keys(headers).reduce((state, header) => {
      return {
        ...state,
        [header]: interpolate(headers[header], props),
      }
    }, {})
  }

  get({
    props,
    params,
    options
  }: {
    props: AnyProps
    params: ComponentPropsWithRequiredModelParams
    options?: {
      signal?: AbortSignal
    }
  }) {
    const p: ComponentPropsWithRequiredModelParams =
      params || this.extractParams(props)
    return fetch(
      interpolate(this.config.paths.read || this.config.paths.item, p),
      {
        // @ts-ignore
        method: this.config.methods.read,
        headers: this.applyHeaders(this.config.headers, props),
        signal: options?.signal
      }
    ).then(ARC.json)
  }

  remove({
    props,
    params,
  }: {
    props: AnyProps
    params: ComponentPropsWithRequiredModelParams
  }) {
    const p = params || this.extractParams(props)
    return fetch(
      interpolate(this.config.paths.delete || this.config.paths.item, p),
      {
        // @ts-ignore
        method: this.config.methods.delete,
        headers: this.applyHeaders(this.config.headers, props),
      }
    ).then(ARC.json)
  }

  create({
    props,
    body,
    params,
  }: {
    props: AnyProps
    body: any
    params: ComponentPropsWithRequiredModelParams
  }) {
    const p = params || this.extractParams(props)
    // WARNING !!
    return fetch(
      interpolate(this.config.paths.create || this.config.paths.item, p),
      {
        // @ts-ignore
        method: this.config.methods.create,
        headers: this.applyHeaders(this.config.headers, props),
        body: JSON.stringify(body),
      }
    ).then(ARC.json)
  }

  update({
    props,
    body,
    params,
  }: {
    props: AnyProps
    body: any
    params: ComponentPropsWithRequiredModelParams
  }) {
    const p = params || this.extractParams(props)
    return fetch(
      interpolate(this.config.paths.update || this.config.paths.item, p),
      {
        // @ts-ignore
        method: this.config.methods.update,
        headers: this.applyHeaders(this.config.headers, props),
        body: JSON.stringify(body),
      }
    ).then(ARC.json)
  }

  static jsonOrText(content: any) {
    try {
      return JSON.parse(content)
    } catch (e) {
      return content
    }
  }

  static json(response: Response) {
    if (response.ok) {
      return response.text().then((rawResponseBody) => {
        return Promise.resolve(ARC.jsonOrText(rawResponseBody))
      })
    }
    return response.text().then((rawResponseBody) => {
      return Promise.reject({
        content: ARC.jsonOrText(rawResponseBody),
        response,
      })
    })
  }
}
