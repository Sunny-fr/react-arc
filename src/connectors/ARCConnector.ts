import { getDefaultConfig, extendWithDefaultProps } from "../utils"
import core from "../actions/core"
import { ARCConfig } from "../types/config.types"
import {
  ARCWrappedComponentProps,
  ComponentWithStoreProps,
} from "../types/components.types"
import { DefaultRootState } from "react-redux"

/** LEGACY **/
export const ARCConnector = function (
  connect: Function,
  config: ARCConfig,
  customMapStateToProps: Function
) {
  const ARCConfig = { ...getDefaultConfig(), ...config }
  const namespace = ARCConfig.name
  return connect(
    (store: DefaultRootState, ownProps: ComponentWithStoreProps) => {
      // Required Props
      const collection = store[namespace].collection
      const arcProps = {
        collection,
        // To be dropped
        temp: store[namespace].temp,
        // To be dropped
        fetching: store[namespace].fetching,
        // To be dropped
        loaded: store[namespace].loaded,
        // To be dropped
        error: store[namespace].error,
      }

      const mergedProps: ComponentWithStoreProps = {
        ...extendWithDefaultProps(ARCConfig, ownProps),
        //...removeMissingProps(ownProps),
        ...arcProps,
      }
      const loaded = core.isLoaded(ARCConfig, mergedProps)
      const metaModel = core._getModel(ARCConfig, mergedProps)
      const model = core.getModel(ARCConfig, mergedProps)
      const error = core.getError(ARCConfig, mergedProps)
      const syncing = core.isSyncing(ARCConfig, mergedProps)
      const metas = core.getMetas(ARCConfig, undefined, mergedProps)

      const mapStateToProps = (): ARCWrappedComponentProps => {
        return {
          ...extendWithDefaultProps(ARCConfig, ownProps),
          collection,
          isNew: false,
          tempModel: undefined,
          ARCConfig,
          metas,
          metaModel,
          model,
          loaded,
          error,
          syncing,
        }
      }
      const optionalStateToProps = customMapStateToProps
        ? customMapStateToProps(store)
        : {}
      return { ...mapStateToProps(), optionalStateToProps }
    },
    null,
    null,
    {
      forwardRef: true,
    }
  )
}

export default ARCConnector
