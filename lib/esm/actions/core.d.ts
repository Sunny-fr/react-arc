import { ARCMetaCollectionMap, ARCMetaModel, ARCMetas, ARCModel, ARCModelKey } from "../types/model.types";
import { ARCConfig } from "../types/config.types";
import { ARCContainerProps } from "../types/components.types";
import { ARCRootState, ARCStoreState } from "../types/connectors.types";
type KeyGeneratorFn = (params: object) => ARCModelKey;
export interface CoreMethods {
    keyGenerator: KeyGeneratorFn;
    getCollection<Model>(reducerState: ARCStoreState<Model>): ARCMetaCollectionMap<Model>;
    hasRequiredParams<Model, RequiredProps>(config: ARCConfig<Model, RequiredProps>, props: RequiredProps): boolean;
    missingParams<Model, RequiredProps, OwnProps = {}>(config: ARCConfig<Model, RequiredProps>, props: ARCContainerProps<Model, RequiredProps, OwnProps>): string[];
    isNew<Model, RequiredProps>(config: ARCConfig<Model, RequiredProps>, props: RequiredProps): boolean;
    getKey<Model, RequiredProps>(config: ARCConfig<Model, RequiredProps>, props: RequiredProps): string | null;
    getParams<Model, RequiredProps>(config: ARCConfig<Model, RequiredProps>, props: RequiredProps): RequiredProps | null;
    getMetas<Model>(prop: keyof ARCMetas | undefined, metaModel?: ARCMetaModel<Model> | null): ARCMetas | any | null;
    _getModel<Model>(metaModel: ARCMetaModel<Model> | null): ARCMetaModel<Model> | null;
    getModel<Model>(metaModel?: ARCMetaModel<Model> | null): Model | null;
    getError<Model>(metaModel?: ARCMetaModel<Model> | null): any;
    isSyncing<Model>(metaModel?: ARCMetaModel<Model> | null): boolean;
    isLoaded<Model>(metaModel?: ARCMetaModel<Model> | null): boolean;
    allowReFetch<Model, RequiredProps>(config: ARCConfig<Model, RequiredProps>, metaModel?: ARCMetaModel<Model> | null): boolean;
    errorReFetch<Model, RequiredProps>(config: ARCConfig<Model, RequiredProps>, metaModel?: ARCMetaModel<Model> | null): boolean;
    getStore<Model, RequiredProps>(config: ARCConfig<Model, RequiredProps>, reduxStoreState: object): ARCStoreState<Model>;
    modelPicker<Model, RequiredProps>(rootState: ARCRootState, config: ARCConfig<Model, RequiredProps>, listOfParams: RequiredProps[]): Model[];
    freeModelPicker<Model, RequiredProps>(rootState: ARCRootState, config: ARCConfig<Model, RequiredProps>, listOfParams: RequiredProps[]): ARCModel<Model>[];
    getFetchingCount<Model>(props: ARCMetaCollectionMap<Model>): number;
}
export declare const core: CoreMethods;
export {};
