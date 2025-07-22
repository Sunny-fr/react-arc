
import equal from "deep-equal"
import cloneDeep from "lodash.clonedeep"
import defaultConfig from "../defaultConfig"
import { ARCMetaCollectionMap, ARCMetaModel, ARCModel} from "../types/model.types"
import { ARCConfig } from "../types/config.types"
import {
  ComponentProps,
  ComponentPropsWithRequiredModelParams,
} from "../types/components.types"

export function flatten<Model>(
  arcCollectionMap: ARCMetaCollectionMap<Model>,
  withMetas: boolean = false
): ARCModel<Model>[] | ARCMetaModel<Model>[] {
  const metaModels = Object.keys(arcCollectionMap).map((nodeName) =>
    arcCollectionMap[nodeName])
  return withMetas ? metaModels : metaModels.map((metaModel) => metaModel.model)
}

export function extendWithDefaultProps<Model>(
  config: ARCConfig<Model>,
  ownProps: ComponentProps
): ComponentProps {
  const defaultProps = config.defaultProps || {}
  return Object.keys(defaultProps).reduce((state, prop) => {
    if (typeof ownProps[prop] === "undefined") {
      state[prop] = defaultProps[prop]
    }
    return state
  }, ownProps)
}

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
  source: ComponentProps = {}
) {
  return props.reduce(
    (params, prop) => ({
      ...params,
      [prop]: source[prop],
    }),
    {}
  )
}

export function getParams<Model>(
  config: ARCConfig<Model>,
  source: ComponentProps = {}
): ComponentPropsWithRequiredModelParams {
  const props = config.modelProps
  const defaultProps = config.defaultProps || {}
  const merged = { ...defaultProps, ...source }
  const componentProps: ComponentProps = {}
  return props.reduce(
    (params, prop) => ({
      ...params,
      [prop]: merged[prop],
    }),
    componentProps
  )
}

export const changedProps = function (
  prevProps: ComponentProps,
  nextProps: ComponentProps
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

export function getDefaultConfig<Model>() {
  return cloneDeep<ARCConfig<Model>>(defaultConfig)
}
