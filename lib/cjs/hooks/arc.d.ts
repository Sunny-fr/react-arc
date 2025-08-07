import { ARCConfig, ARCConfigHeaders, ARCHttpRestMethodMap } from "../types/config.types";
import { AnyProps, ComponentPropsWithRequiredModelParams } from "../types/components.types";
interface ARCParams<Model> {
    ARCConfig: ARCConfig<Model>;
}
export declare class ARC<Model> {
    config: ARCConfig<Model>;
    constructor({ ARCConfig }: ARCParams<Model>);
    static createConfig<Model>(ARCConfig: ARCConfig<Model>): ARCConfig<Model>;
    static extendConfig<Model>(ARCConfig: ARCConfig<Model>): ARCConfig<Model>;
    static extendHeaders<Model>(ARCConfig: ARCConfig<Model>): ARCConfigHeaders;
    static extendMethods<Model>(extendedConfig: ARCConfig<Model>): ARCHttpRestMethodMap;
    hasRequiredParams(props: AnyProps): boolean;
    extractParams(props: AnyProps): ComponentPropsWithRequiredModelParams;
    applyHeaders(headers: ARCConfigHeaders | undefined, props: AnyProps): ARCConfigHeaders;
    get({ props, params, options }: {
        props: AnyProps;
        params: ComponentPropsWithRequiredModelParams;
        options?: {
            signal?: AbortSignal;
        };
    }): Promise<any>;
    remove({ props, params, }: {
        props: AnyProps;
        params: ComponentPropsWithRequiredModelParams;
    }): Promise<any>;
    create({ props, body, params, }: {
        props: AnyProps;
        body: any;
        params: ComponentPropsWithRequiredModelParams;
    }): Promise<any>;
    update({ props, body, params, }: {
        props: AnyProps;
        body: any;
        params: ComponentPropsWithRequiredModelParams;
    }): Promise<any>;
    static jsonOrText(content: any): any;
    static json(response: Response): Promise<any>;
}
export {};
