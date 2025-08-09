import { ARCConfig, ARCConfigHeaders, ARCHttpRestMethodMap } from "../types/config.types";
interface ARCParams<Model, RequiredProps> {
    ARCConfig: ARCConfig<Model, RequiredProps>;
}
export declare class ARC<Model, RequiredProps, OwnProps = {}> {
    config: ARCConfig<Model, RequiredProps>;
    constructor({ ARCConfig }: ARCParams<Model, RequiredProps>);
    static createConfig<Model, RequiredProps>(ARCConfig: ARCConfig<Model, RequiredProps>): ARCConfig<Model, RequiredProps>;
    static extendConfig<Model, RequiredProps>(ARCConfig: ARCConfig<Model, RequiredProps>): ARCConfig<Model, RequiredProps>;
    static extendHeaders<Model, RequiredProps>(ARCConfig: ARCConfig<Model, RequiredProps>): ARCConfigHeaders;
    static extendMethods<Model, RequiredProps>(extendedConfig: ARCConfig<Model, RequiredProps>): ARCHttpRestMethodMap;
    hasRequiredParams(props: RequiredProps & OwnProps): boolean;
    extractParams(props: RequiredProps): RequiredProps;
    applyHeaders(headers: ARCConfigHeaders | undefined, props: RequiredProps): ARCConfigHeaders;
    get({ props, params, options }: {
        props: RequiredProps & OwnProps;
        params: RequiredProps;
        options?: {
            signal?: AbortSignal;
        };
    }): Promise<any>;
    remove({ props, params, }: {
        props: RequiredProps & OwnProps;
        params: RequiredProps;
    }): Promise<any>;
    create({ props, body, params, }: {
        props: RequiredProps & OwnProps;
        body: any;
        params: RequiredProps;
    }): Promise<any>;
    update({ props, body, params, }: {
        props: RequiredProps & OwnProps;
        body: any;
        params: RequiredProps;
    }): Promise<any>;
    static jsonOrText(content: any): any;
    static json(response: Response): Promise<any>;
}
export {};
