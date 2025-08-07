import { ARCConfig } from "./config.types";
import { ThunkDispatch } from "redux-thunk";
import React from "react";
import { ARCMetaModel, ARCMetas } from "./model.types";
export interface ARCConnectedComponent<Model> {
    ARCConfig: ARCConfig<Model>;
    loaded: boolean;
    metaModel: ARCMetaModel<Model>;
    model: Model | null;
    error: any;
    loading: boolean;
    metas: ARCMetas;
    isNew: boolean;
    dispatch: ThunkDispatch<any, any, any>;
    component?: React.ComponentType<any>;
}
export interface WithARCInjectProps<Model> {
    ARCConfig: ARCConfig<Model>;
    modelKey: string | null;
    metaModel: ARCMetaModel<Model>;
    metas: ARCMetas;
    model: Model | null;
    loaded: boolean;
    error: any;
    loading: boolean;
    isNew: boolean;
    dispatch: ThunkDispatch<any, any, any>;
}
export interface ARCContainer<Model, P> extends WithARCInjectProps<Model> {
    component: React.ComponentType<P & WithARCInjectProps<Model>>;
}
export interface AnyProps extends React.ComponentProps<any> {
    [key: string]: any;
}
/**
 * Utility (not necessary, but helps with type safety)
 * Component Props with required params
 * for example model ARCConfig.modelParams = ['id','name']
 * expected ComponentPropsWithRequiredModelParams are  {id:'12', name:'Al', ...}
 */
export interface ComponentPropsWithRequiredModelParams extends AnyProps {
}
/**
 * Component Props with required params
 * for example model ARCConfig.modelParams = ['id','name']
 * expected ComponentPropsWithRequiredModelParams are  {id:'12', name:'Al', ...}
 */
export interface ComponentWithStoreProps extends ComponentPropsWithRequiredModelParams {
}
export interface ARCContainerProps<Model> extends ARCConnectedComponent<Model> {
    component: React.ComponentType<any>;
}
export interface ARCWrappedComponentProps<Model> extends ComponentPropsWithRequiredModelParams {
    ARCConfig: ARCConfig<Model>;
    dispatch: ThunkDispatch<any, any, any>;
}
