import React from 'react'
import {ARCConfig} from "../types/config.types";
import {ARCMetaModel} from "../types/model.types";
import {ModelContainer} from "../containers-next/ModelContainer";
//import {ModelContainer} from '../containers/ModelContainer'
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
  // ARCConfig: ARCConfig<M>
}


interface CreateHOCParams<P extends object, M> {
  Container?: React.ComponentType<P>
  ARCConfig: ARCConfig<M>
}


export function createHOC<P extends object, M>({Container = ModelContainer, ARCConfig}: CreateHOCParams<P, M> ) {

  // @ts-ignore
  const ARCContainer = withARC(ARCConfig)(Container) as React.ComponentType<P & HOCBootstrapped<M>>
  return (Wrapped: React.ComponentType<P & HOCBootstrapped<M>>) =>
    (props: P) => {
      return <ARCContainer {...props as P & HOCBootstrapped<M>} component={Wrapped}/>
    }
}


