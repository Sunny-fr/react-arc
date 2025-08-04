import React, { ComponentType } from "react"
import { useARC } from "../hooks/useARC"
import { ARCConfig } from "../types/config.types"

export function withUseARC<Model>(config: ARCConfig<Model>) {
  return function HOC<T extends object>(Wrapped: ComponentType<T>) {
    const displayName = Wrapped.displayName || Wrapped.name || "Component"

    const ComponentWithArc = (props: T) => {
      const arc = useARC({ ARCConfig: config, props })
      return <Wrapped {...arc} {...(props as T)} />
    }

    ComponentWithArc.displayName = `withARC(${displayName})`

    return ComponentWithArc
  }
}
