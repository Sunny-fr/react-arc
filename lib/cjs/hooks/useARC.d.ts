import { ComponentProps } from "../types/components.types";
import { ARCConfig } from "../types/config.types";
import { UseARCReturn } from "../types/hooks.types";
export declare function useARC<Model>({ ARCConfig, props, }: {
    ARCConfig: ARCConfig<Model>;
    props: ComponentProps;
}): UseARCReturn<Model>;
