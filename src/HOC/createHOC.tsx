import React from 'react'
import {ARCConfig} from "../types/config.types";
import {ModelContainer} from "../containers-next/ModelContainer";
import {withARC} from "./withARC";
import {ARCContainer} from "../types/components.types";


interface CreateHOCParams<R, Model, P extends object = {}> {
  Container?: React.ComponentType<R & ARCContainer<P, Model, R> & P>
  ARCConfig: ARCConfig<Model, R>
}

// R = Required Props
// P = Props that are passed to the wrapped component

export function createHOC<R extends object, Model = any, P extends object = {}>({Container = ModelContainer, ARCConfig}: CreateHOCParams<R, Model, P> ) {

  return function GeneratedHOC<P>(Wrapped: React.ComponentType<ARCContainer<P, Model, R> & R & P>)  {
    const GeneratedARCContainer = withARC<Model, R>(ARCConfig)(Container) as React.ComponentType<R>
    return function Component(props: R & P) {
      const extendedProps = {
        ...props,
        component: Wrapped,
      }
      return <GeneratedARCContainer {...extendedProps }/>
    }
  }
}



