import React, {ComponentType} from "react"
import {ARCConfig} from "../types/config.types"
import {useDetachedARC} from "../hooks/useDetachedARC";

export function withUseDetachedARC<Model, RequiredProps extends object ={}, OwnProps={}>(config: ARCConfig<Model, RequiredProps>) {
  return function HOC(Wrapped: ComponentType<OwnProps>) {
    const displayName = Wrapped.displayName || Wrapped.name || "Component"

    const ComponentWithArc = (props: RequiredProps & OwnProps) => {
      const arc = useDetachedARC<Model, RequiredProps, OwnProps>({ ARCConfig: config, props })
      return <Wrapped {...arc} {...(props )} />
    }

    ComponentWithArc.displayName = `withUseDetachedARC(${displayName})`

    return ComponentWithArc
  }
}
