import { ARCConfig } from "../types/config.types";
import { ComponentWithStoreProps } from "../types/components.types";
import React, { ComponentType } from "react";
/**
 *
 * @param {ARCConfig} config
 * @return {function(Component)<ARCWrappedComponent>}
 */
export declare function withARC<Model>(config: ARCConfig<Model>): <T extends object>(Wrapped: React.ComponentType<T>) => import("react-redux").ConnectedComponent<(props: T & ComponentWithStoreProps<Model>) => React.JSX.Element, import("react-redux").DistributiveOmit<T & ComponentWithStoreProps<Model>, Extract<string, keyof ComponentWithStoreProps<Model> | keyof T> | Extract<number, keyof ComponentWithStoreProps<Model> | keyof T>> & T>;
