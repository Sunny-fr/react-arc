import React from 'react';
import { ARCConfig } from "../types/config.types";
import { ARCContainer, ARCContainerProps, RenderComponent } from "../types/components.types";
import { SelectorFn } from "../types/connectors.types";
interface CreateHOCParams<Model, RequiredProps extends object = {}, OwnProps extends object = {}> {
    Container?: ARCContainer<Model, RequiredProps, OwnProps>;
    ARCConfig: ARCConfig<Model, RequiredProps>;
    selectors?: SelectorFn<any, OwnProps>[];
}
export declare function createHOC<Model, RequiredProps extends object = {}, OwnProps extends object = {}>({ Container, ARCConfig, selectors }: CreateHOCParams<Model, RequiredProps, OwnProps>): <OverriddenRequiredProps extends RequiredProps = RequiredProps>(Wrapped: RenderComponent<Model, OverriddenRequiredProps, OwnProps>) => <OwnPropsPassed extends OwnProps = OwnProps>(visibleProps: OwnPropsPassed & OverriddenRequiredProps) => React.ReactElement<ARCContainerProps<Model, OverriddenRequiredProps, OwnProps>>;
export {};
