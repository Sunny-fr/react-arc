import { ARCMetaCollectionMap, ARCMetaModel, ARCMetas, ARCModel, ARCModelKey } from "../types/model.types";
import { ARCConfig } from "../types/config.types";
import { AnyProps, ComponentPropsWithRequiredModelParams } from "../types/components.types";
import { ARCRootState, ARCStoreState } from "../types/connectors.types";
type KeyGeneratorFn = (params: object) => ARCModelKey;
export interface CoreMethods {
    keyGenerator: KeyGeneratorFn;
    getCollection<Model>(reducerState: ARCStoreState<Model>): ARCMetaCollectionMap<Model>;
    hasRequiredParams<Model>(config: ARCConfig<Model>, props: AnyProps): boolean;
    missingParams<Model>(config: ARCConfig<Model>, props: AnyProps): string[];
    isNew<Model>(config: ARCConfig<Model>, props: AnyProps): boolean;
    getKey<Model>(config: ARCConfig<Model>, props: AnyProps): string | null;
    getParams<Model>(config: ARCConfig<Model>, props: ComponentPropsWithRequiredModelParams): ComponentPropsWithRequiredModelParams | null;
    getMetas<Model>(prop: keyof ARCMetas | undefined, metaModel?: ARCMetaModel<Model> | null): ARCMetas | any | null;
    _getModel<Model>(metaModel: ARCMetaModel<Model> | null): ARCMetaModel<Model> | null;
    getModel<Model>(metaModel?: ARCMetaModel<Model> | null): Model | null;
    getError<Model>(metaModel?: ARCMetaModel<Model> | null): any;
    isSyncing<Model>(metaModel?: ARCMetaModel<Model> | null): boolean;
    isLoaded<Model>(metaModel?: ARCMetaModel<Model> | null): boolean;
    allowReFetch<Model>(config: ARCConfig<Model>, metaModel?: ARCMetaModel<Model> | null): boolean;
    errorReFetch<Model>(config: ARCConfig<Model>, metaModel?: ARCMetaModel<Model> | null): boolean;
    getStore<Model>(config: ARCConfig<Model>, reduxStoreState: object): ARCStoreState<Model>;
    modelPicker<Model>(rootState: ARCRootState, config: ARCConfig<Model>, listOfParams: ComponentPropsWithRequiredModelParams[]): Model[];
    freeModelPicker<Model>(rootState: ARCRootState, config: ARCConfig<Model>, listOfParams: ComponentPropsWithRequiredModelParams[]): ARCModel<Model>[];
    getFetchingCount<Model>(props: ARCMetaCollectionMap<Model>): number;
}
export declare const core: CoreMethods;
export {};
