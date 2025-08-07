import React from 'react'
import {ARCConfig} from "../types/config.types";
import {ModelContainer} from "../containers-next/ModelContainer";
import {withARC} from "./withARC";
import {ARCContainer} from "../types/components.types";


interface CreateHOCParams<R, Model> {
  Container?: React.ComponentType<R & ARCContainer<Model, R>>
  ARCConfig: ARCConfig<Model, R>
}

// R = Required Props
// P = Props that are passed to the wrapped component

export function createHOC<R extends object, Model = any>({Container = ModelContainer, ARCConfig}: CreateHOCParams<R, Model> ) {

  return function GeneratedHOC<P extends R>(Wrapped: React.ComponentType<R & ARCContainer<Model, R> & P>)  {
    const ARCContainer = withARC<Model, R>(ARCConfig)(Container) as React.ComponentType<R>
    return function Component(props: R & P) {
      const extendedProps = {
        ...props,
        component: Wrapped,
      }
      return <ARCContainer {...extendedProps }/>
    }
  }
}



