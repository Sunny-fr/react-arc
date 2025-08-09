import { AxiosInstance, AxiosPromise } from "axios";
import { ARCConfig, ARCConfigHeaders, ARCConfigPaths, ARCHttpRestMethodMap, RetryConditionFn } from "../types/config.types";
import { Dispatch } from "redux";
import { ARCAxiosOptions, ReduxActionsOptions } from "../types/actions.types";
export declare const AXIOS_CANCEL_PAYLOAD: {
    readonly code: "ERR_CANCELED";
    readonly name: "CanceledError";
};
export declare class ReduxActions<Model, RequiredProps, OwnProps extends object = {}> {
    config: ARCConfig<Model, RequiredProps>;
    initialConfig: ARCConfig<Model, RequiredProps>;
    retryConditionFn: RetryConditionFn<Model, RequiredProps> | undefined;
    axios: AxiosInstance;
    headers: ARCConfigHeaders;
    paths: ARCConfigPaths;
    methods: ARCHttpRestMethodMap;
    constructor(options: ReduxActionsOptions<Model, RequiredProps>);
    static GenerateAbortSignal<Model, RequiredProps, OwnProps = {}>(axiosOptions: ARCAxiosOptions<Model, RequiredProps, OwnProps>): AbortSignal | undefined;
    getInitialConfig(): ARCConfig<Model, RequiredProps>;
    generateAbortSignal(axiosOptions: ARCAxiosOptions<Model, RequiredProps, OwnProps>): AbortSignal | undefined;
    decorateHeaders(props?: RequiredProps & OwnProps): ARCConfigHeaders;
    decoratePaths(props?: RequiredProps & OwnProps): ARCConfigPaths;
    setHeaders(): void;
    setPaths(): void;
    updateConfig(config: ARCConfig<Model, RequiredProps>): void;
    setupMethods(): void;
    decorate: (str: string) => string;
    beforeFetch({ config, props, params, }: {
        config: ARCConfig<Model, RequiredProps>;
        props: RequiredProps & OwnProps;
        params: RequiredProps;
    }): ARCConfig<Model, RequiredProps>;
    /** EDITING **/
    edit(data: any, params: RequiredProps): (dispatch: Dispatch) => void;
    /** SINGLE ITEM **/
    standAloneFetchOne(_params: RequiredProps, config: ARCConfig<Model, RequiredProps>, _props: RequiredProps & OwnProps, axiosOptions: ARCAxiosOptions<Model, RequiredProps, OwnProps>): AxiosPromise<Model>;
    fetchOne(params: RequiredProps, props: RequiredProps & OwnProps, axiosOptions: ARCAxiosOptions<Model, RequiredProps, OwnProps>): (dispatch: Dispatch) => AxiosPromise<Model>;
}
