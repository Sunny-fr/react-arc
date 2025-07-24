import React from 'react'
import {ARCConfig} from "../types/config.types";
import {ARCMetaModel} from "../types/model.types";
import {ModelContainer} from "../containers-next/ModelContainer";
import {withARC} from "./withARC";


export interface HOCBootstrapped<M> {
  loaded: boolean
  metaModel: ARCMetaModel<M>
  model: M
  error: any
  syncing: boolean
  loading?: boolean
  metas: object
  isNew: boolean
  ARCConfig: ARCConfig<M>
}


interface CreateHOCParams<P, M> {
  Container?: React.ComponentType<P>
  ARCConfig: ARCConfig<M>
}


export function createHOC<P, M>({Container = ModelContainer, ARCConfig}: CreateHOCParams<P, M> ) {
  // const ARCContainer = Container || ModelContainer as React.ComponentType<P & HOCBootstrapped<M>>
  return (Wrapped: React.ComponentType<P & HOCBootstrapped<M>>) =>
    (props: P) => {
      const ARCContainer = withARC(ARCConfig)(Container) as React.ComponentType<P & HOCBootstrapped<M>>
      return <ARCContainer {...props as P & HOCBootstrapped<M>} component={Wrapped}/>
    }
}


