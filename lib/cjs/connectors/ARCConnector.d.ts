import { ARCConfig } from "../types/config.types";
import { ComponentWithStoreProps } from "../types/components.types";
import { DefaultRootState, Connect } from "react-redux";
import { ThunkDispatch } from "redux-thunk";
/** LEGACY **/
export declare function ARCConnector<Model>(connect: Connect, config: ARCConfig<Model>, customMapStateToProps?: (store: DefaultRootState) => object): import("react-redux").InferableComponentEnhancerWithProps<import("react-redux").DispatchProp<import("redux").AnyAction> & {
    optionalStateToProps: object;
    ARCConfig: ARCConfig<Model>;
    loaded: boolean;
    metaModel: import("..").ARCMetaModel<Model> | null;
    model: Model | null;
    error: object;
    syncing: boolean;
    metas: import("..").ARCMetasType;
    isNew: boolean;
    collection: import("..").ARCMetaCollectionMap<Model>;
    tempModel?: Model | null | undefined;
    dispatch: ThunkDispatch<any, any, any>;
    temp: Model | null | undefined;
    fetching: boolean;
}, ComponentWithStoreProps<Model>>;
export default ARCConnector;
