import React from "react"
import {
  getDefaultFromMissingProps,
  getDefaultConfig,
  removeMissingProps,
} from "../utils"
import core from "../actions/core"

/** LEGACY **/
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

      const mergedProps = {
        ...getDefaultFromMissingProps(ARCConfig, ownProps),
        ...removeMissingProps(ownProps),
        ...arcProps,
      }
      const loaded = core.isLoaded(ARCConfig, mergedProps)
      const metaModel = core._getModel(ARCConfig, mergedProps)
      const model = core.getModel(ARCConfig, mergedProps)
      const error = core.getError(ARCConfig, mergedProps)
      const syncing = core.isSyncing(ARCConfig, mergedProps)
      const metas = core.getMetas(ARCConfig, undefined, mergedProps)

      const mapStateToProps = (store) => {
        return {
          ARCConfig,
          metas,
          metaModel,
          model,
          loaded,
          error,
          syncing,
          ...getDefaultFromMissingProps(ARCConfig, ownProps),
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
