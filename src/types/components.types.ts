import {ARCConfig} from "./config.types"
import {ARCMetaCollectionMap,} from "./model.types"
import {ThunkDispatch} from "redux-thunk"


/**
 * Any Component Props
 */
export interface ComponentProps extends React.ComponentProps<any> {
  dispatch?: ThunkDispatch<any, any, any>
  //Component?: React.ComponentType<any>
}

/**
 * Component Props with required params
 * for example model ARCConfig.modelParams = ['id','name']
 * expected ComponentPropsWithRequiredModelParams are  {id:'12', name:'Al', ...}
 */
export interface ComponentPropsWithRequiredModelParams extends ComponentProps  {
  [key: string]: any
}

/**
 * Component Props with required params
 * for example model ARCConfig.modelParams = ['id','name']
 * expected ComponentPropsWithRequiredModelParams are  {id:'12', name:'Al', ...}
 */
export interface ComponentWithStoreProps<Model>
  extends ComponentPropsWithRequiredModelParams {
  //ARCConfig: ARCConfig
  collection: ARCMetaCollectionMap<Model>
  // temp?: ARCModel<Model> | null | undefined
  // To be dropped
  // fetching?: boolean
  // To be dropped
  // loaded?: boolean
  // To be dropped
  // error?:  null | any
  // Other props
  //[key: string]: any
}
export interface ARCContainerProps<Model>
  extends ComponentPropsWithRequiredModelParams {
  Component: React.ComponentType<any>
  ARCConfig: ARCConfig<Model>
  dispatch: ThunkDispatch<any, any, any>
  collection: ARCMetaCollectionMap<Model>
  // To be dropped
  //temp?: ARCModel<Model>
  // To be dropped
  //fetching: boolean
  // To be dropped
  //loaded: boolean
  // To be dropped
  //error: null | any
}

export interface ARCWrappedComponentProps<Model>
  extends ComponentPropsWithRequiredModelParams {
  ARCConfig: ARCConfig<Model>
  //loaded: boolean
  //metaModel: ARCMetaModel<Model> | null
  //model: ARCModel<Model> |null
  //error: any | null
  //syncing: boolean
  //metas: ARCMetasType
  //isNew: boolean
  collection: ARCMetaCollectionMap<Model>
  // tempModel?: ARCModel<Model> | null | undefined
  dispatch: ThunkDispatch<any, any, any>

  // To be dropped
  //temp: ARCModel<Model> | null | undefined
  // To be dropped
  // fetching: boolean
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
