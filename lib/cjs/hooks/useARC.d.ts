import { ARCConfig } from "../types/config.types";
import { SelectorFn } from "../types/connectors.types";
import { UseARC } from "../types/hooks.connected.types";
export declare function useARC<Model, RequiredProps extends object = {}, OwnProps extends object = {}>({ ARCConfig: initialConfig, props, selectors }: {
    ARCConfig: ARCConfig<Model, RequiredProps>;
    props: RequiredProps & OwnProps;
    selectors?: SelectorFn<any, OwnProps>[];
}): UseARC<Model, RequiredProps>;
