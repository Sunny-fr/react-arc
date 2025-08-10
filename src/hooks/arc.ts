import {ARCConfig, ARCConfigHeaders, ARCHttpRestMethodMap,} from "../types/config.types"
import {getParams, initializeConfig, interpolate} from "../utils"

interface ARCParams<Model, RequiredProps> {
  ARCConfig: ARCConfig<Model, RequiredProps>
}

export class ARC<Model, RequiredProps, OwnProps = {}> {
  config: ARCConfig<Model, RequiredProps>

  constructor({ ARCConfig }: ARCParams<Model, RequiredProps>) {
    this.config = ARC.createConfig(ARCConfig)
  }

  static createConfig<Model, RequiredProps>(ARCConfig: ARCConfig<Model, RequiredProps>): ARCConfig<Model, RequiredProps> {
    const config = ARC.extendConfig(ARCConfig)
    config.headers = ARC.extendHeaders(config)
    config.methods = ARC.extendMethods(config)
    return config
  }

  static extendConfig<Model, RequiredProps>(ARCConfig: ARCConfig<Model, RequiredProps>): ARCConfig<Model, RequiredProps> {
    return initializeConfig(ARCConfig)
  }

  static extendHeaders<Model, RequiredProps>(ARCConfig: ARCConfig<Model,RequiredProps>): ARCConfigHeaders {
    const headers = ARCConfig.headers || {}
    return { ...headers }
  }

  static extendMethods<Model,RequiredProps>(extendedConfig: ARCConfig<Model, RequiredProps>): ARCHttpRestMethodMap {
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

  hasRequiredParams(props: RequiredProps & OwnProps): boolean {
    return this.config.modelProps.every((prop) => {
      return typeof props[prop as keyof (RequiredProps & OwnProps)] !== "undefined"
    })
  }

  extractParams(props: RequiredProps): RequiredProps {
    return getParams(this.config, props)
  }

  applyHeaders(
    headers: ARCConfigHeaders = {},
    props: RequiredProps
  ): ARCConfigHeaders {
    // MUST BE PROPS !!!
    // OR PARAMS MUST TAKE THE CHARGE OF HAVING SPECIALS PROPS SUCH AS TOKEN/BEARERS
    return Object.keys(headers).reduce((state, header) => {
      return {
        ...state,
        [header]: interpolate(headers[header], props as object),
      }
    }, {})
  }

  get({
    props,
    params,
    options
  }: {
    props: RequiredProps & OwnProps
    params: RequiredProps
    options?: {
      signal?: AbortSignal
    }
  }) {
    const p: RequiredProps  =
      params || this.extractParams(props)
    return fetch(
      interpolate(this.config.paths.read || this.config.paths.item, p as object),
      {

        method: this.config.methods!.read,
        headers: this.applyHeaders(this.config.headers, props),
        signal: options?.signal
      }
    ).then(ARC.json)
  }

  remove({
    props,
    params,
  }: {
    props: RequiredProps & OwnProps
    params: RequiredProps
  }) {
    const p = params || this.extractParams(props)
    return fetch(
      interpolate(this.config.paths.delete || this.config.paths.item, p as object),
      {
        method: this.config.methods!.delete,
        headers: this.applyHeaders(this.config.headers, props),
      }
    ).then(ARC.json)
  }

  create({
    props,
    body,
    params,
  }: {
    props: RequiredProps & OwnProps
    body: any
    params: RequiredProps
  }) {
    const p = params || this.extractParams(props)
    // WARNING !!
    return fetch(
      interpolate(this.config.paths.create || this.config.paths.item, p as object),
      {
        method: this.config.methods!.create,
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
    props: RequiredProps & OwnProps
    body: any
    params: RequiredProps
  }) {
    const p = params || this.extractParams(props)
    return fetch(
      interpolate(this.config.paths.update || this.config.paths.item, p as object),
      {
        method: this.config.methods!.update,
        headers: this.applyHeaders(this.config.headers, props),
        body: JSON.stringify(body),
      }
    ).then(ARC.json)
  }

  static jsonOrText(content: any) {
    try {
      return JSON.parse(content)
    } catch  {
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
