import { ARCConfig } from "../types/config.types";
import { ARCStoreState } from "../types/connectors.types";
interface MixerStoreParams<Model, Props> {
    config: ARCConfig<Model, Props>;
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
export declare function createReducer<Model, Props extends object>(options: MixerStoreParams<Model, Props>): (state: ARCStoreState<Model> | undefined, action: ReduxAction) => {
    collection: {};
};
export default createReducer;
