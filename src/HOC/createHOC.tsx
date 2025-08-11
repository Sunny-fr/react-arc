import React from 'react'
import {ARCConfig} from "../types/config.types";
import {ModelContainer} from "../containers-next/ModelContainer";
import {withARC} from "./withARC";
import {ARCContainer, ARCContainerProps, RenderComponent} from "../types/components.types";
import {SelectorFn} from "../types/connectors.types";


interface CreateHOCParams<Model, RequiredProps extends object = {}, OwnProps extends object  = {}> {
  Container?: ARCContainer<Model, RequiredProps, OwnProps>
  ARCConfig: ARCConfig<Model, RequiredProps>,
  selectors?: SelectorFn<any, OwnProps>[]
}


export function createHOC<Model, RequiredProps extends object  = {} , OwnProps  extends object  = {}>({
                                                                       Container = ModelContainer,
                                                                       ARCConfig,
                                                                        selectors = []
                                                                     }: CreateHOCParams<Model, RequiredProps, OwnProps> ) {
  return function GeneratedHOC<OverriddenRequiredProps extends RequiredProps = RequiredProps>(Wrapped: RenderComponent<Model, OverriddenRequiredProps, OwnProps>)  {
    const GeneratedARCContainer = withARC<Model, RequiredProps, OwnProps>(ARCConfig, selectors)(Container) as ARCContainer<Model,OverriddenRequiredProps, OwnProps>
    return function Component<OwnPropsPassed extends OwnProps = OwnProps>(visibleProps: OwnPropsPassed & OverriddenRequiredProps) {
      const actualProps = visibleProps as unknown as ARCContainerProps<Model,RequiredProps, OwnProps>
      // const extendedProps = {
      //   ...actualProps,
      //   component: Wrapped
      // }
      //{...extendedProps}

      return <GeneratedARCContainer
        {...actualProps as unknown as  OverriddenRequiredProps & OwnPropsPassed}
        ARCConfig={ARCConfig}
        model={actualProps.model}
        modelKey={actualProps.modelKey}
        metaModel={actualProps.metaModel}
        metas={actualProps.metas}
        loaded={actualProps.loaded}
        error={actualProps.error}
        loading={actualProps.loading}
        isNew={actualProps.isNew}
        component={Wrapped}
        dispatch={actualProps.dispatch}



      /> as unknown as React.ReactElement<ARCContainerProps<Model, OverriddenRequiredProps, OwnProps>>
    }
  }
}
