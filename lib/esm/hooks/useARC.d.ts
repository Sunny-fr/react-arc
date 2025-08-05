import { ComponentProps } from "../types/components.types";
import { ARCConfig } from "../types/config.types";
import { UseARC } from "../types/hooks.connected.types";
export declare function useARC<Model>({ ARCConfig: initialConfig, props, }: {
    ARCConfig: ARCConfig<Model>;
    props: ComponentProps;
}): UseARC<Model>;
