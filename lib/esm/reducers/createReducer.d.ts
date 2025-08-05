import { ARCConfig } from "../types/config.types";
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
} | {
    temp: {
        metas: {
            saving: boolean;
            end: number;
            saved: boolean;
            loaded: boolean;
            fetching: boolean;
            fetchRequested: boolean;
            valid: boolean;
            deleting: boolean;
            tries: number;
            start: number;
            error?: any;
        };
        model: any;
    };
    collection: import("../types/model.types").ARCMetaCollectionMap<Model>;
};
export default createReducer;
