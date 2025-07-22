import { ARCConfig } from "../types/config.types";
import { ARCMetaCollectionMap, ARCMetaModel } from "../types/model.types";
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
export declare function mixerStore<Model>(options: MixerStoreParams<Model>): (state: ARCStoreState<Model> | undefined, action: ReduxAction) => {
    fetching: boolean;
    error: null;
    start: number;
    collection: ARCMetaCollectionMap<Model>;
    temp: ARCMetaModel<Model>;
    loaded: boolean;
} | {
    fetching: boolean;
    loaded: boolean;
    end: number;
    collection: ARCMetaCollectionMap<Model>;
    temp: ARCMetaModel<Model>;
    error: object | null;
} | {
    fetching: boolean;
    loaded: boolean;
    end: number;
    error: object | undefined;
    collection: ARCMetaCollectionMap<Model>;
    temp: ARCMetaModel<Model>;
} | {
    temp: {
        model: any;
        metas: import("../types/model.types").ARCMetas;
    };
    collection: ARCMetaCollectionMap<Model>;
    fetching: boolean;
    loaded: boolean;
    error: object | null;
};
export default mixerStore;
