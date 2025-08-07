import React from 'react'
import {ARCConfig} from "../types/config.types";
import {ModelContainer} from "../containers-next/ModelContainer";
import {withARC} from "./withARC";
import {ARCContainer} from "../types/components.types";


interface CreateHOCParams<P, Model> {
  Container?: React.ComponentType<P & ARCContainer<Model, P>>
  ARCConfig: ARCConfig<Model>
}

// R = Required Props
// P = Props that are passed to the wrapped component

export function createHOC<R extends object = {}, Model = any>({Container = ModelContainer, ARCConfig}: CreateHOCParams<R, Model> ) {
  const ARCContainer = withARC<Model, R>(ARCConfig)(Container) as React.ComponentType<R>
  return function GeneratedHOC<P>(Wrapped: React.ComponentType<R & ARCContainer<Model, R> & P>)  {
    return function Component(props: R & P) {
      const extendedProps = {
        ...props,
        component: Wrapped,
      } as R & P
      return <ARCContainer {...extendedProps as R & P }/>
    }
  }
}

// Example usage of createHOC
//
//
// const SampleContainer = () => {
//   return <div>Sample Container</div>
// }
//
// type SampleModel = {
//   name: string
//   id: string
// }
//
// const sampleConfig: ARCConfig<SampleModel> = {
//   name: 'sample',
//   modelProps: ['id'],
//   paths: {
//     item: '/sample/:id',
//   }
// }
//
// interface SampleProps {
//   id: string
//
// }
//
// const withSample = createHOC<SampleProps>({
//   //Container: SampleContainer,
//   ARCConfig: sampleConfig
// })
//
//
// interface SampleComponentProps extends SampleProps{
//   hello: string
// }
//
// const SampleComponent:React.FC<SampleComponentProps> = withSample((props) => {
//   const {model, error, loaded, loading, hello} = props
//
//   if (error) return <div>Error: {error.message}</div>
//   if (!loaded) return <div>Loading...</div>
//   if(!model) return <div>No model found</div>
//
//   return (
//     <div>
//       <h1>Sample Component</h1>
//       <p>Hello: {hello}</p>
//       <p>ID: {model.id}</p>
//       <p>Hello: {model.name}</p>
//       {loading && <p>loading...</p>}
//     </div>
//   )
// })
//
// const Demo = () => {
//   return (
//     <div>
//       <h1>Demo Component</h1>
//       <SampleComponent id="123" hello="World" />
//     </div>
//   )
// }



