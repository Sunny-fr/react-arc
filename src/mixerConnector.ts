import {getDefaultConfig} from "./utils"
import {Connect} from "react-redux"
import {ARCConfig} from "./types/config.types"
import {ARCRootState} from "./types/connectors.types";

export function mixerConnector <Model>(
  connect: Connect,
  config: ARCConfig<Model>,
  customMapStateToProps: Function | undefined
) {
  const extendedConfig = { ...getDefaultConfig(), ...config }
  const reducerName = extendedConfig.name
  return connect(
    (store) => {
      const mapStateToProps = (rootState:ARCRootState<Model>) => {
        const state = rootState[reducerName]
        return {
          ARCConfig: extendedConfig,
          collection: state.collection,
        }
      }
      const optionalStateToProps = customMapStateToProps
        ? customMapStateToProps(store)
        : {}
      return Object.assign({}, mapStateToProps(store as ARCRootState<Model>), optionalStateToProps)
    },
    null,
    null,
    {
      forwardRef: true,
    }
  )
}

export default mixerConnector
