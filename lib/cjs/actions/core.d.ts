import { ARCMetaModel, ARCModel, ARCModelKey } from "../types/model.types";
import { ARCConfig } from "../types/config.types";
import { ARCContainerProps, ComponentProps, ComponentPropsWithRequiredModelParams, ComponentWithStoreProps } from "../types/components.types";
import { ARCStoreState } from "../types/connectors.types";
type AnyArcComponentProps<Model> = Omit<ComponentWithStoreProps<Model> | ARCContainerProps<Model>, 'dispatch'>;
type KeyGeneratorFn = (params: object) => ARCModelKey;
export interface CoreMethods {
    keyGenerator: KeyGeneratorFn;
    hasRequiredParams<Model>(config: ARCConfig<Model>, props: ComponentProps): boolean;
    missingParams<Model>(config: ARCConfig<Model>, props: ComponentProps): string[];
    isNew<Model>(config: ARCConfig<Model>, props: ComponentProps): boolean;
    getKey<Model>(config: ARCConfig<Model>, props: ComponentProps): string | null;
    getParams<Model>(config: ARCConfig<Model>, props: ComponentProps): ComponentPropsWithRequiredModelParams | null;
    getMetas<Model>(config: ARCConfig<Model>, prop: string | undefined, props: ComponentProps): any;
    _getModel<Model>(config: ARCConfig<Model>, props: AnyArcComponentProps<Model>): ARCMetaModel<Model> | null;
    getModel<Model>(config: ARCConfig<Model>, props: AnyArcComponentProps<Model>): Model | null;
    getError<Model>(config: ARCConfig<Model>, props: ComponentWithStoreProps<Model>): any;
    isSyncing<Model>(config: ARCConfig<Model>, props: ComponentWithStoreProps<Model>): boolean;
    isLoaded<Model>(config: ARCConfig<Model>, props: ComponentWithStoreProps<Model>): boolean;
    allowReFetch<Model>(config: ARCConfig<Model>, props: ComponentWithStoreProps<Model>): boolean;
    errorReFetch<Model>(config: ARCConfig<Model>, props: ComponentWithStoreProps<Model>): boolean;
    getStore<Model>(config: ARCConfig<Model>, reduxStoreState: object): ARCStoreState<Model>;
    modelPicker<Model>(config: ARCConfig<Model>, props: ComponentWithStoreProps<Model>, listOfParams: ComponentPropsWithRequiredModelParams[]): Model[];
    freeModelPicker<Model>(config: ARCConfig<Model>, reduxStoreState: object, listOfParams: ComponentPropsWithRequiredModelParams[]): ARCModel<Model>[];
    getFetchingCount<Model>(props: ComponentWithStoreProps<Model>): number;
    /** COLLECTIONS
     * SOON TO BE DROPPED
     * **/
    getCollectionError<Model>(props: ComponentWithStoreProps<Model>): any;
    isCollectionLoaded<Model>(props: ComponentWithStoreProps<Model>): boolean;
    isCollectionSyncing<Model>(props: ComponentWithStoreProps<Model>): boolean;
    allowCollectionReFetch<Model>(config: ARCConfig<Model>, props: ComponentWithStoreProps<Model>): boolean;
}
export declare const core: CoreMethods;
export {};
