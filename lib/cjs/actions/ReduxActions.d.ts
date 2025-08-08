import { AxiosInstance, AxiosPromise } from "axios";
import { ARCConfig, ARCConfigHeaders, ARCConfigPaths, ARCHttpRestMethodMap, RetryConditionFn } from "../types/config.types";
import { Dispatch } from "redux";
import { AnyProps, ComponentPropsWithRequiredModelParams } from "../types/components.types";
import { ARCAxiosOptions, ReduxActionsOptions } from "../types/actions.types";
export declare const AXIOS_CANCEL_PAYLOAD: {
    readonly code: "ERR_CANCELED";
    readonly name: "CanceledError";
};
export declare class ReduxActions<Model, RequiredProps extends object = {}> {
    config: ARCConfig<Model, RequiredProps>;
    initialConfig: ARCConfig<Model, RequiredProps>;
    retryConditionFn: RetryConditionFn<Model, RequiredProps> | undefined;
    axios: AxiosInstance;
    headers: ARCConfigHeaders;
    paths: ARCConfigPaths;
    methods: ARCHttpRestMethodMap;
    constructor(options: ReduxActionsOptions<Model, RequiredProps>);
    static GenerateAbortSignal<Model, RequiredProps>(axiosOptions: ARCAxiosOptions<Model, RequiredProps>): AbortSignal | undefined;
    getInitialConfig(): ARCConfig<Model, RequiredProps>;
    generateAbortSignal(axiosOptions: ARCAxiosOptions<Model, RequiredProps>): AbortSignal | undefined;
    decorateHeaders(props?: {}): ARCConfigHeaders;
    decoratePaths(props?: {}): ARCConfigPaths;
    setHeaders(): void;
    setPaths(): void;
    updateConfig(config: ARCConfig<Model, RequiredProps>): void;
    setupMethods(): void;
    decorate: (str: string) => string;
    beforeFetch({ config, props, params, }: {
        config: ARCConfig<Model, RequiredProps>;
        props: AnyProps;
        params: ComponentPropsWithRequiredModelParams;
    }): ARCConfig<Model, RequiredProps>;
    /** EDITING **/
    edit(data: any, params: ComponentPropsWithRequiredModelParams): (dispatch: Dispatch) => void;
    /** SINGLE ITEM **/
    standAloneFetchOne(_params: ComponentPropsWithRequiredModelParams, config: ARCConfig<Model, RequiredProps>, _props: AnyProps, axiosOptions: ARCAxiosOptions<Model, RequiredProps>): AxiosPromise<Model>;
    fetchOne(params: ComponentPropsWithRequiredModelParams, props: AnyProps | undefined, axiosOptions: ARCAxiosOptions<Model, RequiredProps>): (dispatch: Dispatch) => AxiosPromise<Model>;
}
