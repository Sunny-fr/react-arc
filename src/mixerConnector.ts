import { getDefaultConfig } from "./utils"
import { Connect, DefaultRootState } from "react-redux"
import { ARCConfig } from "./types/config.types"

export function mixerConnector <Model>(
  connect: Connect,
  config: ARCConfig<Model>,
  customMapStateToProps: Function | undefined
) {
  const extendedConfig = { ...getDefaultConfig(), ...config }
  const namespace = extendedConfig.name
  return connect(
    (store) => {
      // Required Props
      const mapStateToProps = (store: DefaultRootState) => {
        return {
          ARCConfig: extendedConfig,
          tempModel: store[namespace].temp,
          loaded: store[namespace].loaded,
          fetching: store[namespace].fetching,
          error: store[namespace].error,
          collection: store[namespace].collection,
        }
      }
      const optionalStateToProps = customMapStateToProps
        ? customMapStateToProps(store)
        : {}
      return Object.assign({}, mapStateToProps(store), optionalStateToProps)
    },
    null,
    null,
    {
      forwardRef: true,
    }
  )
}

export default mixerConnector
