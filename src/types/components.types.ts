import {ARCConfig} from "./config.types"
import {ThunkDispatch} from "redux-thunk"
import React from "react";
import {ARCMetaModel} from "./model.types";


export interface ARCConnectedComponent<Model> {
  ARCConfig: ARCConfig<Model>
  loaded: boolean
  metaModel: ARCMetaModel<Model>
  model: Model
  error: any
  syncing: boolean
  metas: ARCMetaModel<Model>['metas']
  isNew: boolean
  dispatch: ThunkDispatch<any, any, any>
  component?: React.ComponentType<any>
}

/**
 * Any Component Props
 */
export interface ComponentProps extends React.ComponentProps<any> {
  dispatch?: ThunkDispatch<any, any, any>
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
export interface ComponentWithStoreProps
  extends ComponentPropsWithRequiredModelParams {
}
export interface ARCContainerProps<Model>
  extends ARCConnectedComponent<Model> {
  component: React.ComponentType<any>
}

export interface ARCWrappedComponentProps<Model>
  extends ComponentPropsWithRequiredModelParams {
  ARCConfig: ARCConfig<Model>
  dispatch: ThunkDispatch<any, any, any>
  // fetching: boolean
}
