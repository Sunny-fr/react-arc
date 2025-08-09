import React from 'react';
import { ARCConfig } from "../types/config.types";
import { ARCContainer, ARCContainerProps, RenderComponent } from "../types/components.types";
interface CreateHOCParams<Model, RequiredProps = {}, OwnProps = {}> {
    Container?: ARCContainer<Model, RequiredProps, OwnProps>;
    ARCConfig: ARCConfig<Model, RequiredProps>;
}
export declare function createHOC<Model, RequiredProps = {}, OwnProps = {}>({ Container, ARCConfig }: CreateHOCParams<Model, RequiredProps, OwnProps>): <OverriddenRequiredProps extends RequiredProps>(Wrapped: RenderComponent<Model, OverriddenRequiredProps, OwnProps>) => <OwnPropsPassed extends OwnProps>(props: OverriddenRequiredProps & OwnPropsPassed) => React.ReactElement<ARCContainerProps<Model, OverriddenRequiredProps, OwnProps>>;
export {};
