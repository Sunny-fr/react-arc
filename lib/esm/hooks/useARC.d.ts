import { AnyProps } from "../types/components.types";
import { ARCConfig } from "../types/config.types";
import { UseARC } from "../types/hooks.connected.types";
export declare function useARC<Model, RequiredProps extends object>({ ARCConfig: initialConfig, props, }: {
    ARCConfig: ARCConfig<Model, RequiredProps>;
    props: AnyProps;
}): UseARC<Model>;
