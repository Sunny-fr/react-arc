import { ARCConfig } from "./config.types"
import { ComponentPropsWithRequiredModelParams } from "./components.types"

export interface ReduxActionsListOptions<Model> {
  config: ARCConfig<Model>
}
export interface RetryFnParams<Model> {
  params: ComponentPropsWithRequiredModelParams
  config: ARCConfig<Model>
  props: object
  axiosOptions: ARCAxiosOptions<Model>
  tryNumber: number
}
export interface ARCAxiosOptions<Model> {
  abortController?: AbortController
  retryConditionFn?: (error: object, params: RetryFnParams<Model>) => boolean
}
