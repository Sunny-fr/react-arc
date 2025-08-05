import React, { ComponentType } from "react";
import { ARCConfig } from "../types/config.types";
export declare function withUseDetachedARC<Model>(config: ARCConfig<Model>): <T extends object>(Wrapped: ComponentType<T>) => {
    (props: T): React.JSX.Element;
    displayName: string;
};
