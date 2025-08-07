import { ARCConfig } from "./config.types";
import { ThunkDispatch } from "redux-thunk";
import React from "react";
import { ARCMetaModel, ARCMetas } from "./model.types";
import { ARCAxiosOptions } from "./actions.types";
export interface WithARCInjectProps<Model, RequiredProps = {}> {
    ARCConfig: ARCConfig<Model, RequiredProps>;
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
export interface ARCContainer<P, Model, RequiredProps = {}> extends WithARCInjectProps<Model, RequiredProps> {
    component: React.ComponentType<P & WithARCInjectProps<Model, RequiredProps>>;
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
export interface ARCContainerProps<Model, RequiredProps = {}, P = {}> extends WithARCInjectProps<Model, RequiredProps> {
    component: React.ComponentType<P & WithARCInjectProps<Model, RequiredProps> & {
        fetch?: (params?: RequiredProps, axiosOptions?: ARCAxiosOptions<Model, RequiredProps>) => void;
    }>;
}
