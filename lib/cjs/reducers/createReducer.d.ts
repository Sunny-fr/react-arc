import { ARCConfig } from "../types/config.types";
import { ARCMetaModel } from "../types/model.types";
import { ARCStoreState } from "../types/connectors.types";
interface MixerStoreParams<Model> {
    config: ARCConfig<Model>;
}
interface ReduxActionPayload {
    data?: any;
    error?: object;
    params?: object;
    tries?: number;
    create?: boolean;
}
interface ReduxAction {
    type: string;
    payload: ReduxActionPayload;
}
export declare function createReducer<Model>(options: MixerStoreParams<Model>): (state: ARCStoreState<Model> | undefined, action: ReduxAction) => {
    collection: {};
    temp: ARCMetaModel<Model>;
    fetching: boolean;
    loaded: boolean;
    error: object | null;
} | {
    temp: {
        model: any;
        metas: import("../types/model.types").ARCMetas;
    };
    collection: import("../types/model.types").ARCMetaCollectionMap<Model>;
    fetching: boolean;
    loaded: boolean;
    error: object | null;
};
export default createReducer;
