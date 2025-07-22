import React, { ComponentType } from "react";
import { ARCConfig } from "../types/config.types";
export declare function withUseARC<Model>(config: ARCConfig<Model>): <T extends object>(Wrapped: React.ComponentType<T>) => {
    (props: T): React.JSX.Element;
    displayName: string;
};
