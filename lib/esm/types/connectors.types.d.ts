/**
 * ARCMappedProps
 */
import { ARCConfig } from "./config.types";
import { ARCMetaCollectionMap } from "./model.types";
interface DefaultRootState {
}
export interface ARCRootState extends DefaultRootState {
    [key: ARCConfig<any>['name']]: ARCStoreState<any>;
}
export type SelectorFn<OwnProps> = (store: ARCRootState, ownProps: OwnProps) => Record<string, any>;
/**
 * ARC Store
 */
export interface ARCStoreState<Model> {
    collection: ARCMetaCollectionMap<Model>;
}
export {};
