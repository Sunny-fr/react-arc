import { ComponentProps } from "../types/components.types";
import { ARCConfig } from "../types/config.types";
import { UseDetachedARC } from "../types/hooks.detached.types";
export declare function useDetachedARC<Model>({ ARCConfig, props, }: {
    ARCConfig: ARCConfig<Model>;
    props: ComponentProps;
}): UseDetachedARC<Model>;
