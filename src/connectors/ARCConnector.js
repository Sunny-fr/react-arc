import React from "react"
import { getDefaultConfig } from "../utils"
import core from "../actions/core"

export const ARCConnector = function (
  connect,
  config,
  customMapStateToProps = null
) {
  const ARCConfig = { ...getDefaultConfig(), ...config }
  const namespace = ARCConfig.name
  return connect(
    (store, ownProps) => {
      // Required Props
      const collection = store[namespace].collection
      const arcProps = {
        collection,
        tempModel: store[namespace].temp,
      }

      const loaded = core.isLoaded(ARCConfig, { ...ownProps, ...arcProps })
      const metaModel = core._getModel(ARCConfig, { ...ownProps, ...arcProps })
      const model = core.getModel(ARCConfig, { ...ownProps, ...arcProps })
      const error = core.getError(ARCConfig, { ...ownProps, ...arcProps })
      const syncing = core.isSyncing(ARCConfig, { ...ownProps, ...arcProps })
      const metas = core.getMetas(ARCConfig, { ...ownProps, ...arcProps })

      const mapStateToProps = (store) => {
        return {
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
      return Object.assign({}, mapStateToProps(store), optionalStateToProps)
    },
    null,
    null,
    {
      forwardRef: true,
    }
  )
}

export default ARCConnector
