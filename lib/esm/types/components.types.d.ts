import { ARCConfig } from "./config.types";
import { ARCMetaCollectionMap, ARCMetaModel, ARCMetasType, ARCModel } from "./model.types";
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
    temp?: ARCModel<Model> | null | undefined;
    fetching?: boolean;
    loaded?: boolean;
    error?: null | any;
}
export interface ARCContainerProps<Model> extends ComponentPropsWithRequiredModelParams {
    ARCConfig: ARCConfig<Model>;
    dispatch: ThunkDispatch<any, any, any>;
    collection: ARCMetaCollectionMap<Model>;
    temp?: ARCModel<Model>;
    fetching: boolean;
    loaded: boolean;
    error: null | any;
}
export interface ARCWrappedComponentProps<Model> extends ComponentPropsWithRequiredModelParams {
    ARCConfig: ARCConfig<Model>;
    loaded: boolean;
    metaModel: ARCMetaModel<Model> | null;
    model: ARCModel<Model> | null;
    error: any | null;
    syncing: boolean;
    metas: ARCMetasType;
    isNew: boolean;
    collection: ARCMetaCollectionMap<Model>;
    tempModel?: ARCModel<Model> | null | undefined;
    dispatch: ThunkDispatch<any, any, any>;
    temp: ARCModel<Model> | null | undefined;
    fetching: boolean;
}
/**
 * ARC Wrapped Component
 */
