import { ARCConfig } from "./config.types"
import { ComponentPropsWithRequiredModelParams } from "./components.types"
import { Canceler } from "axios"

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
  cancel?: Canceler
  retryConditionFn?: (error: object, params: RetryFnParams<Model>) => boolean
}
