import equal from "deep-equal"
import defaultConfig from "../defaultConfig"
import {ARCMetaCollectionMap, ARCMetaModel, ARCModel} from "../types/model.types"
import {ARCConfig, ARCHttpRestMethodMap, Fetcher, FetcherMap} from "../types/config.types"
import {AnyProps,} from "../types/components.types"
import axios from "axios";
import {ReduxActions} from "../actions/ReduxActions";


export function flatten<Model>(
  arcCollectionMap: ARCMetaCollectionMap<Model>,
  withMetas: boolean = false
): ARCModel<Model>[] | ARCMetaModel<Model>[] {
  const metaModels = Object.keys(arcCollectionMap).map((nodeName) =>
    arcCollectionMap[nodeName])
  return withMetas ? metaModels : metaModels.map((metaModel) => metaModel.model)
}

export function extendWithDefaultProps<Model,RequiredProps = {}, P ={}>(
  config: ARCConfig<Model,RequiredProps>,
  ownProps: P
) {
  const defaultProps = (config.defaultProps || {}) as AnyProps //keyof ARCConfig<Model,RequiredProps>['defaultProps']
  return Object.keys(defaultProps).reduce((state, prop) => {
    const originalProps = ownProps as AnyProps
    if (typeof originalProps[prop] === "undefined") {
      state[prop] = defaultProps[prop]
    }
    return state
  }, ownProps as AnyProps)
}

export type ObjectValues<T> = T[keyof T]

//
// export const getDefaultFromMissingProps = (ARCConfig, ownProps) => {
//   const defaultProps = ARCConfig.defaultProps || {}
//   return Object.keys(defaultProps).reduce((state, prop) => {
//     if (typeof ownProps[prop] === "undefined") {
//       state[prop] = defaultProps[prop]
//     }
//     return state
//   }, {})
// }
//
// export const removeMissingProps = (ARCConfig, ownProps) => {
//   const defaultProps = ARCConfig.defaultProps || {}
//
//   return Object.keys(defaultProps).reduce(
//     (state, prop) => {
//       if (typeof ownProps[prop] === "undefined") {
//         //ugly shit
//         delete state[prop]
//         return state
//       }
//       return state
//     },
//     { ...ownProps }
//   )
// }

export function extractParams(
  props: string[] = [],
  source: AnyProps = {}
) {
  return props.reduce(
    (params, prop) => ({
      ...params,
      [prop]: source[prop],
    }),
    {}
  )
}

export function getParams<Model, RequiredProps ={}>(
  config: ARCConfig<Model, RequiredProps>,
  source: RequiredProps = {} as RequiredProps
): RequiredProps {
  const props = config.modelProps
  const defaultProps = config.defaultProps || {}
  const merged = { ...defaultProps, ...source }
  const componentProps = {}
  return props.reduce(
    (params, prop) => ({
      ...params,
      [prop]: merged[prop],
    }),
    componentProps
  ) as RequiredProps
}

export const changedProps = function (
  prevProps: AnyProps,
  nextProps: AnyProps
): string[] {
  const changed: string[] = []
  if (!prevProps) return changed
  if (typeof prevProps !== typeof prevProps) return Object.keys(prevProps)

  return Object.keys(nextProps).reduce((state, item) => {
    if (!equal(prevProps[item], nextProps[item])) {
      state.push(item)
    }
    return state
  }, changed)
}

export function cleanParams(str: string): string {
  return str.replace(/({[A-z0-9_\-]+})/g, "")
}
export function stringIsReplaceable  (str:string) {
  return (/{([A-z0-9_\-]+)}/g).test(str)
}

export function interpolate(str: string | null, params: object): string {

  const keys = Object.keys(params)
  // if no string is given we generate one ( params = {foo:'bar', baz:'wth'} will generate {foo}:{baz})
  // it will provide a unique id for models
  const stringToDecorate =
    str ||
    keys
      .sort()
      .map((v) => "{" + v + "}")
      .join(":")
  // it will turn path/to/{id} to path/to/123
  const result = keys.reduce((prev, current) => {
    if(!stringIsReplaceable(prev)){
      return prev
    }
    // @ts-ignore any type is fine here
    const elm_val:string|number = params[current]
    // skip functions
    if (typeof elm_val === "function") return prev

    if (Array.isArray(elm_val)) {
      return prev.replace(
        new RegExp("{" + current + "}", "g"),
        "[" +
          elm_val
            .map((item) =>
              typeof item === "object" ? interpolate(null, item) : item
            )
            .join("|") +
          "]"
      )
    }
    if (typeof elm_val === "undefined") return prev
    return prev.replace(new RegExp("{" + current + "}", "g"), String(elm_val))
  }, stringToDecorate)
  // if params are missing we remove them
  // path/to/123/{anotherId} => path/to/123/
  return cleanParams(result)
}

export function getDefaultConfig<Model, RequiredProps>() {
  return defaultConfig as ARCConfig<Model, RequiredProps>
  // return JSON.parse(
  //   JSON.stringify(defaultConfig)
  // ) as ARCConfig<Model>
}

export function omit<T extends object, K extends keyof T>(
  obj: T,
  keysToOmit: K | K[] = [] as unknown as K
): Omit<T, K> {
  const keys = Array.isArray(keysToOmit) ? keysToOmit : [keysToOmit];
  const result: Partial<T> = {};
  const objKeys = Object.keys(obj) as Array<keyof T>;
  for (const key of objKeys) {
    if (!keys.includes(key as K)) {
      result[key] = obj[key];
    }
  }

  return result as Omit<T, K>;
}


export function initializeConfig<Model, RequiredProps>(
  config: ARCConfig<Model, RequiredProps>
): ARCConfig<Model,RequiredProps> {
  if (!config) {
    return getDefaultConfig<Model, RequiredProps>()
  }

  const FETCHER_MAP:FetcherMap<Model, RequiredProps>= {
    fetch: (_params,
            config,
            _props,
            axiosOptions) => {
      return axios({
        // methods are already lowercased in setupMethods
        method: (config.methods as ARCHttpRestMethodMap).read ,
        url: config.paths.item,
        headers: config.headers,
        signal: axiosOptions ? ReduxActions.GenerateAbortSignal(axiosOptions) : undefined,
      })
    },
    ...config.fetchers
  } as const

  type FetcherKey = keyof typeof FETCHER_MAP

  const extendedConfig:ARCConfig<Model, RequiredProps> & {fetchers: Record<FetcherKey, Fetcher<Model, RequiredProps>>} = {
    ...getDefaultConfig<Model, RequiredProps>(),
    ...config,
    actionNamespace: config?.actionNamespace || config.name.toUpperCase(),
    fetchers: FETCHER_MAP
  }

  return extendedConfig
}