import { ARCConfig } from "../types/config.types";
import { UseDetachedARC } from "../types/hooks.detached.types";
export declare function useDetachedARC<Model, RequiredProps extends object, OwnProps = {}>({ ARCConfig, props, }: {
    ARCConfig: ARCConfig<Model, RequiredProps>;
    props: RequiredProps & OwnProps;
}): UseDetachedARC<Model, RequiredProps>;
