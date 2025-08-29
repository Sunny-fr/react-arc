import React, { ComponentType } from "react";
import { ARCConfig } from "../types/config.types";
export declare function withUseDetachedARC<Model, RequiredProps extends object = {}, OwnProps = {}>(config: ARCConfig<Model, RequiredProps>): (Wrapped: ComponentType<OwnProps>) => {
    (props: RequiredProps & OwnProps): React.JSX.Element;
    displayName: string;
};
