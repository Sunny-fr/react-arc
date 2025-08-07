import {ARCConfig} from "../types/config.types";
import {WithARCInjectProps} from "../types/components.types";
import React from "react";
import {UseDetachedARCMethods} from "../types/hooks.detached.types";
import {createHOC} from "../HOC/createHOC";


// EXAMPLE CONFIGURATION

type SampleAnimalModel = {
  id: string
  kind: string
}

const sampleConfig: ARCConfig<SampleAnimalModel, SampleProps> = {
  name: 'sample',
  modelProps: ['id'],
  paths: {
    item: '/sample/{id}',
  }
}

interface SampleProps {
  id: string

}

const withSample = createHOC<SampleProps, SampleAnimalModel>({
  ARCConfig: sampleConfig
})

// EXAMPLE CONFIGURATION END



// EXAMPLE COMPONENTS


const SampleComponentWithoutExtendedProps = withSample((props) => {
  const { error, loaded, loading} = props

  // type is correctly retrieved here
  const model = props.model

  if (error) return <div>Error: {error.message}</div>
  if (!loaded) return <div>Loading...</div>
  if(!model) return <div>No model found</div>

  return (
    <div>
      {loading && <p>loading...</p>}
      <h1>Animal</h1>
      <p>id: {model.id}</p>
      <p>kind: {model.kind}</p>
    </div>
  )
})


interface SampleComponentWithExtendedPropsProps extends SampleProps{
  name: string
}

const SampleComponentWithExtendedProps = withSample<SampleComponentWithExtendedPropsProps>(withARCLoader((props) => {
  const {error, loaded, loading, name} = props

  // type is correctly retrieved here
  const model = props.model

  if (error) return <div>Error: {error.message}</div>
  if (!loaded) return <div>Loading...</div>
  if(!model) return <div>No model found</div>

  return (
    <div>
      {loading && <p>loading...</p>}
      <h1>Animal</h1>
      <p>id: {model.id}</p>
      <p>kind: {model.kind}</p>
      <p>name: {name}</p>
    </div>
  )
}))



const SampleComponentWithoutExtendedWithChainingProps = withSample(withARCLoader((props) => {
  const { error, loaded, loading} = props

  // type is not retrieved here
  const model = props.model

  if (error) return <div>Error: {error.message}</div>
  if (!loaded) return <div>Loading...</div>
  if(!model) return <div>No model found</div>

  return (
    <div>
      {loading && <p>loading...</p>}
      <h1>Animal</h1>
      <p>id: {model.id}</p>
      <p>kind: {model.kind}</p>
    </div>
  )
}))



interface SampleComponentWithExtendedPropsAndChainingProps extends SampleProps{
  name: string
}

const SampleComponentWithExtendedPropsAndChaining = withSample<SampleComponentWithExtendedPropsAndChainingProps>(withARCLoader((props) => {
  const {error, loaded, loading, name} = props

  // type is correctly retrieved here
  const model = props.model

  if (error) return <div>Error: {error.message}</div>
  if (!loaded) return <div>Loading...</div>
  if(!model) return <div>No model found</div>

  return (
    <div>
      {loading && <p>loading...</p>}
      <h1>Animal</h1>
      <p>id: {model.id}</p>
      <p>kind: {model.kind}</p>
      <p>name: {name}</p>
    </div>
  )
}))





interface WithARCAlteredProps<Model> extends Omit<WithARCInjectProps<Model>,'model'> {
  model: Model
}

export function withARCLoader<P extends object = {}, Model = any>(
  Wrapped: React.ComponentType<P & WithARCAlteredProps<Model> & {arc?: UseDetachedARCMethods<Model>} >
) {
  return function WithARCLoader(ownProps: P & WithARCInjectProps<Model> & {arc?: UseDetachedARCMethods<Model>}) {
    const {loaded, error, arc} = ownProps as WithARCAlteredProps<Model> & {arc?: UseDetachedARCMethods<Model>}

    // is an arc hook
    if (arc && !arc.arc.hasRequiredParams(ownProps)) {
      return <Wrapped {...ownProps as P & WithARCAlteredProps<Model> } />
    }
    if (error) return <div>Error: {error.message}</div>
    if (!loaded) return <div>Loading...</div>
    return <Wrapped {...ownProps as P & WithARCAlteredProps<Model>} model={ownProps.model as Model} />
  }
}


export const Demo = () => {
  return (
    <div>
      <h1>Demo Component</h1>

      <SampleComponentWithoutExtendedProps id="123" />
      <SampleComponentWithExtendedProps id="123" name="Gus" />

      <SampleComponentWithoutExtendedWithChainingProps id="123"  />
      <SampleComponentWithExtendedPropsAndChaining id="123" name="Gus"  />
    </div>
  )
}
