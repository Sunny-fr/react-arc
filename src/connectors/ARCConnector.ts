import {getDefaultConfig, extendWithDefaultProps} from "../utils"
import {core} from "../actions/core"
import {ARCConfig} from "../types/config.types"
import {
  ARCWrappedComponentProps,
  ComponentWithStoreProps,
} from "../types/components.types"
import {DefaultRootState, Connect} from "react-redux"
import {ThunkDispatch} from "redux-thunk";
import {ARCRootState} from "../types/connectors.types";



/** LEGACY **/
export function ARCConnector<Model>(
  connect: Connect,
  config: ARCConfig<Model>,
  customMapStateToProps?: (store: DefaultRootState) => object
) {
  const ARCConfig = {...getDefaultConfig<Model>(), ...config}
  const namespace = ARCConfig.name
  function arcConnector (store: ARCRootState<Model>, ownProps: ComponentWithStoreProps<Model>){
    // Required Props
    const collection = store[namespace].collection
    if (!collection) {
      throw new Error(`Collection not found in store for namespace "${namespace}". Please ensure the ARCConfig is correctly set up.`);
    }
    const arcProps = {
      collection,
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
