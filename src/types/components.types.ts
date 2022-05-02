import { ARCConfig } from "./config.types"
import {
  ARCCollectionMap,
  ARCMetaModel,
  ARCMetasType,
  ARCModel,
} from "./model.types"
import { ThunkDispatch } from "redux-thunk"

/**
 * Any Component Props
 */
export interface ComponentProps {
  dispatch?: ThunkDispatch<any, any, any>
}

/**
 * Component Props with required params
 * for example model ARCConfig.modelParams = ['id','name']
 * expected ComponentPropsWithRequiredModelParams are  {id:'12', name:'Al', ...}
 */
export interface ComponentPropsWithRequiredModelParams extends ComponentProps {}

/**
 * Component Props with required params
 * for example model ARCConfig.modelParams = ['id','name']
 * expected ComponentPropsWithRequiredModelParams are  {id:'12', name:'Al', ...}
 */
export interface ComponentWithStoreProps
  extends ComponentPropsWithRequiredModelParams {
  //ARCConfig: ARCConfig
  collection: ARCCollectionMap
  temp: ARCModel
  // To be dropped
  fetching: boolean
  // To be dropped
  loaded: boolean
  // To be dropped
  error: object | null
  // Other props
  //[key: string]: any
}
export interface ARCContainerProps
  extends ComponentPropsWithRequiredModelParams {
  ARCConfig: ARCConfig
  dispatch: ThunkDispatch<any, any, any>
  collection: ARCCollectionMap
  // To be dropped
  temp: ARCModel
  // To be dropped
  fetching: boolean
  // To be dropped
  loaded: boolean
  // To be dropped
  error: object | null
}

export interface ARCWrappedComponentProps
  extends ComponentPropsWithRequiredModelParams {
  ARCConfig: ARCConfig
  loaded: boolean
  metaModel: ARCMetaModel | null
  model: object
  error: object
  syncing: boolean
  metas: ARCMetasType
  isNew: boolean
  collection: ARCCollectionMap
  tempModel: ARCModel
  dispatch: ThunkDispatch<any, any, any>

  // To be dropped
  temp: ARCModel
  // To be dropped
  fetching: boolean
}
//
// export interface ARCContainerProps
//   extends ComponentPropsWithRequiredModelParams {
//   ARCConfig: ARCConfig
//   //retryConditionFn: RetryConditionFn
//   //dispatch: ThunkDispatch<any, any, any>
// }

/**
 * ARC Wrapped Component
 */
//
// export type ARCWrappedComponent = (
//   arg0: ARCWrappedComponentProps
// ) => JSX.Element
