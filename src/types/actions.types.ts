import { ARCConfig } from "./config.types"
import { ComponentPropsWithRequiredModelParams } from "./components.types"
import { Canceler } from "axios"

export interface ReduxActionsListOptions {
  config: ARCConfig
}
export interface RetryFnParams {
  params: ComponentPropsWithRequiredModelParams
  config: ARCConfig
  props: object
  axiosOptions: ARCAxiosOptions
  tryNumber: number
}
export interface ARCAxiosOptions {
  cancel?: Canceler
  retryConditionFn?: (error: object, params: RetryFnParams) => boolean
}
