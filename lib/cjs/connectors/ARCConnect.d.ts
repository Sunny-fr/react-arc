import { ARCConfig } from "../types/config.types";
import { ARCStoreState } from "../types/connectors.types";
import { ComponentWithStoreProps } from "../types/components.types";
/**
 * Store Connector
 * @param {ARCConfig} config

 */
export declare function ARCConnect<T extends object, Model>(config: ARCConfig<Model>): (store: ARCStoreState<Model>, ownProps: T) => ComponentWithStoreProps<Model>;
