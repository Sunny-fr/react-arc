import React from 'react'
import {ARCConfig} from "../types/config.types";
import {ModelContainer} from "../containers-next/ModelContainer";
import {withARC} from "./withARC";
import {ARCContainer, ARCContainerProps, RenderComponent} from "../types/components.types";


interface CreateHOCParams<Model, RequiredProps = {}, OwnProps = {}> {
  Container?: ARCContainer<Model, RequiredProps, OwnProps>
  ARCConfig: ARCConfig<Model, RequiredProps>
}

export function createHOC<Model, RequiredProps = {} , OwnProps = {}>({Container = ModelContainer, ARCConfig}: CreateHOCParams<Model, RequiredProps, OwnProps> ) {
  return function GeneratedHOC<OverriddenRequiredProps extends RequiredProps>(Wrapped: RenderComponent<Model, OverriddenRequiredProps, OwnProps>)  {
    const GeneratedARCContainer = withARC<Model, RequiredProps, OwnProps>(ARCConfig)(Container)
    return function Component<OwnPropsPassed extends OwnProps>(props: OverriddenRequiredProps & OwnPropsPassed) {
      const extendedProps = {
        ...props,
        component: Wrapped
      }
      //@ts-ignore
      return <GeneratedARCContainer
        {...extendedProps}
      /> as unknown as React.ReactElement<ARCContainerProps<Model, OverriddenRequiredProps, OwnProps>>
    }
  }
}
