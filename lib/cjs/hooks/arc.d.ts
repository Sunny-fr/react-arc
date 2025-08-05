import { ARCConfig, ARCConfigHeaders, ARCHttpRestMethodMap } from "../types/config.types";
import { ComponentProps, ComponentPropsWithRequiredModelParams } from "../types/components.types";
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
    hasRequiredParams(props: ComponentProps): boolean;
    extractParams(props: ComponentProps): ComponentPropsWithRequiredModelParams;
    applyHeaders(headers: ARCConfigHeaders | undefined, props: ComponentProps): ARCConfigHeaders;
    get({ props, params, options }: {
        props: ComponentProps;
        params: ComponentPropsWithRequiredModelParams;
        options?: {
            signal?: AbortSignal;
        };
    }): Promise<any>;
    remove({ props, params, }: {
        props: ComponentProps;
        params: ComponentPropsWithRequiredModelParams;
    }): Promise<any>;
    create({ props, body, params, }: {
        props: ComponentProps;
        body: any;
        params: ComponentPropsWithRequiredModelParams;
    }): Promise<any>;
    update({ props, body, params, }: {
        props: ComponentProps;
        body: any;
        params: ComponentPropsWithRequiredModelParams;
    }): Promise<any>;
    static jsonOrText(content: any): any;
    static json(response: Response): Promise<any>;
}
export {};
