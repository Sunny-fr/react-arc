import {getDefaultConfig, extendWithDefaultProps} from "../utils"
import core from "../actions/core"
import {ARCConfig} from "../types/config.types"
import {
  ARCWrappedComponentProps,
  ComponentWithStoreProps,
} from "../types/components.types"
import {DefaultRootState, Connect} from "react-redux"
import {ThunkDispatch} from "redux-thunk";



/** LEGACY **/
export function ARCConnector<Model>(
  connect: Connect,
  config: ARCConfig<Model>,
  customMapStateToProps?: (store: DefaultRootState) => object
) {
  const ARCConfig = {...getDefaultConfig<Model>(), ...config}
  const namespace = ARCConfig.name
  function arcConnector (store: DefaultRootState, ownProps: ComponentWithStoreProps<Model>){
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

    const mergedProps: ComponentWithStoreProps<Model> = {
      ...extendWithDefaultProps(ARCConfig, ownProps),
      //...removeMissingProps(ownProps),
      ...arcProps,
    }
    const loaded = core.isLoaded(ARCConfig, mergedProps)
    const metaModel = core._getModel(ARCConfig, mergedProps)
    const model = core.getModel<Model>(ARCConfig, mergedProps)
    const error = core.getError(ARCConfig, mergedProps)
    const syncing = core.isSyncing(ARCConfig, mergedProps)
    const metas = core.getMetas(ARCConfig, undefined, mergedProps)

    const mapStateToProps: ARCWrappedComponentProps<Model> = {
      ...extendWithDefaultProps(ARCConfig, ownProps),
      fetching: false,
      temp: undefined,
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
      dispatch: ownProps.dispatch as ThunkDispatch<any, any, any>
    }
    const optionalStateToProps = customMapStateToProps
      ? customMapStateToProps(store)
      : {}
    return {...mapStateToProps, optionalStateToProps}
  }
  return connect(arcConnector,
    null,
    null,
    {
      forwardRef: true,
    }
  )
}

export default ARCConnector
