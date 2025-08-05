import { ARCConfig } from "./config.types";
import { ARCMetaCollectionMap } from "./model.types";
import { ThunkDispatch } from "redux-thunk";
/**
 * Any Component Props
 */
export interface ComponentProps extends React.ComponentProps<any> {
    dispatch?: ThunkDispatch<any, any, any>;
}
/**
 * Component Props with required params
 * for example model ARCConfig.modelParams = ['id','name']
 * expected ComponentPropsWithRequiredModelParams are  {id:'12', name:'Al', ...}
 */
export interface ComponentPropsWithRequiredModelParams extends ComponentProps {
    [key: string]: any;
}
/**
 * Component Props with required params
 * for example model ARCConfig.modelParams = ['id','name']
 * expected ComponentPropsWithRequiredModelParams are  {id:'12', name:'Al', ...}
 */
export interface ComponentWithStoreProps<Model> extends ComponentPropsWithRequiredModelParams {
    collection: ARCMetaCollectionMap<Model>;
}
export interface ARCContainerProps<Model> extends ComponentPropsWithRequiredModelParams {
    Component: React.ComponentType<any>;
    ARCConfig: ARCConfig<Model>;
    dispatch: ThunkDispatch<any, any, any>;
    collection: ARCMetaCollectionMap<Model>;
}
export interface ARCWrappedComponentProps<Model> extends ComponentPropsWithRequiredModelParams {
    ARCConfig: ARCConfig<Model>;
    collection: ARCMetaCollectionMap<Model>;
    dispatch: ThunkDispatch<any, any, any>;
}
/**
 * ARC Wrapped Component
 */
