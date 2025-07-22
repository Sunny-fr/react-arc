import {connect} from "react-redux"
import { getDefaultConfig} from "../utils"
import {ARCConfig} from "../types/config.types"
import { ComponentWithStoreProps} from "../types/components.types"
import React, {ComponentType} from "react"
import {ARCConnect} from "../connectors/ARCConnect";



/**
 *
 * @param {ARCConfig} config
 * @return {function(Component)<ARCWrappedComponent>}
 */
export function withARC<Model>(config: ARCConfig<Model>) {
  /** @type {ARCConfig} **/
  const extendedConfig: ARCConfig<Model> = {...getDefaultConfig(), ...config}

  function ARCHoc<T extends object>(Wrapped: ComponentType<T>) {

    return connect(ARCConnect<T, Model>(extendedConfig))((props : T & ComponentWithStoreProps<Model>) => {

      return <Wrapped {...props as T & ComponentWithStoreProps<Model>} />
    })
  }

  return ARCHoc
}
