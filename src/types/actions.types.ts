import {ARCConfig} from "./config.types"
import {AnyProps, ComponentPropsWithRequiredModelParams} from "./components.types"

export interface ReduxActionsOptions<Model, RequiredProps> {
  config: ARCConfig<Model, RequiredProps>
}
export interface RetryFnParams<Model, RequiredProps> {
  params: ComponentPropsWithRequiredModelParams
  config: ARCConfig<Model, RequiredProps>
  props: AnyProps
  axiosOptions: ARCAxiosOptions<Model, RequiredProps>
  tryNumber: number
}
export interface ARCAxiosOptions<Model, RequiredProps> {
  abortController?: AbortController
  retryConditionFn?: (error: any, params: RetryFnParams<Model, RequiredProps>) => boolean
}


export interface ArcFetchError {
  message: string
  meta: {
    code: string
    message: string
    status: number
    response: {
      status: number
      statusText: string
      data: any
    }
  }
}
