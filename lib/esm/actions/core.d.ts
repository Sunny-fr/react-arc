import { ARCMetaCollectionMap, ARCMetaModel, ARCModel, ARCModelKey } from "../types/model.types";
import { ARCConfig } from "../types/config.types";
import { ComponentProps, ComponentPropsWithRequiredModelParams, ComponentWithStoreProps } from "../types/components.types";
import { ARCStoreState } from "../types/connectors.types";
type KeyGeneratorFn = (params: object) => ARCModelKey;
export interface CoreMethods {
    keyGenerator: KeyGeneratorFn;
    getCollection<Model>(reducerState: ARCStoreState<Model>): ARCMetaCollectionMap<Model>;
    hasRequiredParams<Model>(config: ARCConfig<Model>, props: ComponentProps): boolean;
    missingParams<Model>(config: ARCConfig<Model>, props: ComponentProps): string[];
    isNew<Model>(config: ARCConfig<Model>, props: ComponentProps): boolean;
    getKey<Model>(config: ARCConfig<Model>, props: ComponentProps): string | null;
    getParams<Model>(config: ARCConfig<Model>, props: ComponentPropsWithRequiredModelParams): ComponentPropsWithRequiredModelParams | null;
    getMetas<Model>(config: ARCConfig<Model>, prop: string | undefined, props: ComponentPropsWithRequiredModelParams, reducerState: ARCStoreState<Model>): any;
    _getModel<Model>(config: ARCConfig<Model>, props: ComponentPropsWithRequiredModelParams, reducerState: ARCStoreState<Model>): ARCMetaModel<Model> | null;
    getModel<Model>(config: ARCConfig<Model>, props: ComponentPropsWithRequiredModelParams, reducerState: ARCStoreState<Model>): Model | null;
    getError<Model>(config: ARCConfig<Model>, props: ComponentPropsWithRequiredModelParams, reducerState: ARCStoreState<Model>): any;
    isSyncing<Model>(config: ARCConfig<Model>, props: ComponentPropsWithRequiredModelParams, reducerState: ARCStoreState<Model>): boolean;
    isLoaded<Model>(config: ARCConfig<Model>, props: ComponentPropsWithRequiredModelParams, reducerState: ARCStoreState<Model>): boolean;
    allowReFetch<Model>(config: ARCConfig<Model>, props: ComponentPropsWithRequiredModelParams, reducerState: ARCStoreState<Model>): boolean;
    errorReFetch<Model>(config: ARCConfig<Model>, props: ComponentPropsWithRequiredModelParams, reducerState: ARCStoreState<Model>): boolean;
    getStore<Model>(config: ARCConfig<Model>, reduxStoreState: object): ARCStoreState<Model>;
    modelPicker<Model>(config: ARCConfig<Model>, props: ComponentWithStoreProps<Model>, listOfParams: ComponentPropsWithRequiredModelParams[], reducerState: ARCStoreState<Model>): Model[];
    freeModelPicker<Model>(config: ARCConfig<Model>, reduxStoreState: object, listOfParams: ComponentPropsWithRequiredModelParams[]): ARCModel<Model>[];
    getFetchingCount<Model>(props: ComponentWithStoreProps<Model>): number;
}
export declare const core: CoreMethods;
export {};
