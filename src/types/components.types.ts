import {ARCConfig} from "./config.types"
import React from "react";
import {ARCMetaModel, ARCMetas} from "./model.types";
import {ARCAxiosOptions} from "./actions.types";

import {ThunkDispatch} from "redux-thunk";




export type CommonConnectorProps<Model> = {
  modelKey: string | null
  metaModel: ARCMetaModel<Model>
  metas: ARCMetas
  model: Model | null
  loaded: boolean
  error: any
  loading: boolean
  isNew: boolean
} & {
  dispatch: ThunkDispatch<any, any, any> //& DispatchProp<any>
}


export type ConnectorProps<Model, RequiredProps = {}, OwnProps = {}> = {
  ARCConfig: ARCConfig<Model, RequiredProps>,
} & CommonConnectorProps<Model> & OwnProps & RequiredProps


export type WithARCInjectProps<Model, RequiredProps = {}, OwnProps = {}> = CommonConnectorProps<Model> & RequiredProps & OwnProps


export interface AnyProps extends React.ComponentProps<any> {
  [key: string]: any
}


export interface RenderFetchParams<Model, RequiredProps> {
  fetch?: ARCContainerFetcher<Model, RequiredProps>
}

export interface ContainerVitalProps<Model, RequiredProps = {}, OwnProps = {}> {
  ARCConfig: ARCConfig<Model, RequiredProps>
  component: RenderComponent<Model, RequiredProps, OwnProps>
}

export type RenderComponentProps<Model, RequiredProps ={}, OwnProps={}> =
  WithARCInjectProps<Model, RequiredProps, OwnProps> &
  RenderFetchParams<Model, RequiredProps>

export type RenderComponent<Model, RequiredProps, OwnProps> = React.ComponentType<RenderComponentProps<Model, RequiredProps, OwnProps>>


type ARCContainerFetcher<Model, RequiredProps, OwnProps = {}> = (params?: AnyProps, axiosOptions?: ARCAxiosOptions<Model, RequiredProps, OwnProps>) => void

export type ARCContainerProps<Model, RequiredProps = {}, OwnProps = {}> =
  WithARCInjectProps<Model, RequiredProps, OwnProps> &
  ContainerVitalProps<Model, RequiredProps, OwnProps>
  & RequiredProps & OwnProps



export type ARCContainer<Model, RequiredProps = {}, OwnProps = {}> = React.ComponentType<ARCContainerProps<Model, RequiredProps, OwnProps>>


