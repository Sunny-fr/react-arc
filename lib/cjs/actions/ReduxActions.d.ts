import { AxiosInstance, AxiosPromise } from "axios";
import { ARCConfig, ARCConfigHeaders, ARCHttpRestMethodMap, RetryConditionFn } from "../types/config.types";
import { Dispatch } from "redux";
import { ComponentPropsWithRequiredModelParams } from "../types/components.types";
import { ARCAxiosOptions, ReduxActionsListOptions } from "../types/actions.types";
export declare const AXIOS_CANCEL_PAYLOAD: {
    readonly code: "ERR_CANCELED";
    readonly name: "CanceledError";
};
export declare class ReduxActions<Model> {
    config: ARCConfig<Model>;
    initialConfig: ARCConfig<Model>;
    retryConditionFn: RetryConditionFn<Model> | undefined;
    axios: AxiosInstance;
    headers: ARCConfigHeaders;
    methods: ARCHttpRestMethodMap;
    constructor(options: ReduxActionsListOptions<Model>);
    static GenerateAbortSignal<Model>(axiosOptions: ARCAxiosOptions<Model>): AbortSignal | undefined;
    getInitialConfig(): ARCConfig<Model>;
    generateAbortSignal(axiosOptions: ARCAxiosOptions<Model>): AbortSignal | undefined;
    decorateHeaders(props?: {}): ARCConfigHeaders;
    setHeaders(): void;
    updateConfig(config: ARCConfig<Model>): void;
    setupMethods(): void;
    decorate: (str: string, options?: object) => string;
    beforeFetch({ config, props, params, }: {
        config: ARCConfig<Model>;
        props: object;
        params: ComponentPropsWithRequiredModelParams;
    }): ARCConfig<Model>;
    /** EDITING **/
    edit(data: any, params: ComponentPropsWithRequiredModelParams): (dispatch: Dispatch) => void;
    /** SINGLE ITEM **/
    standAloneFetchOne(_params: ComponentPropsWithRequiredModelParams, config: ARCConfig<Model>, _props: object, axiosOptions: ARCAxiosOptions<Model>): AxiosPromise<Model>;
    fetchOne(params: ComponentPropsWithRequiredModelParams, props: object | undefined, axiosOptions: ARCAxiosOptions<Model>): (dispatch: Dispatch) => AxiosPromise<Model>;
    /**  SAVE **/
    standAloneSave(data: object, params: ComponentPropsWithRequiredModelParams, create: boolean, config: ARCConfig<Model>, _props: object): Promise<import("axios").AxiosResponse<any, any>>;
    save(data: object, params: ComponentPropsWithRequiredModelParams, create?: boolean, props?: object): (dispatch: Dispatch) => AxiosPromise;
    /** REMOVE **/
    standAloneRemove(_params: ComponentPropsWithRequiredModelParams, config: ARCConfig<Model>, _props: object): AxiosPromise;
    remove(params: ComponentPropsWithRequiredModelParams, props?: object): (dispatch: Dispatch) => AxiosPromise;
    resetTemp(): (dispatch: Dispatch) => void;
}
