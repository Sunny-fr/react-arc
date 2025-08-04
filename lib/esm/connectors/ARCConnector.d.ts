import { ARCConfig } from "../types/config.types";
import { ComponentWithStoreProps } from "../types/components.types";
import { Connect } from "react-redux";
import { ThunkDispatch } from "redux-thunk";
import { ARCRootState } from "../types/connectors.types";
/** LEGACY **/
export declare function ARCConnector<Model>(connect: Connect, config: ARCConfig<Model>, customMapStateToProps?: (store: ARCRootState) => object): import("react-redux").InferableComponentEnhancerWithProps<import("react-redux").DispatchProp<import("redux").UnknownAction> & {
    optionalStateToProps: object;
    ARCConfig: ARCConfig<Model>;
    collection: import("..").ARCMetaCollectionMap<Model>;
    dispatch: ThunkDispatch<any, any, any>;
    Component?: React.ComponentType<any>;
}, ComponentWithStoreProps<Model>>;
export default ARCConnector;
