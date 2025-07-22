import { ARC } from "./arc";
import { ComponentProps, ComponentPropsWithRequiredModelParams } from "../types/components.types";
import { ARCConfig } from "../types/config.types";
export declare function useARC<Model>({ ARCConfig, props, }: {
    ARCConfig: ARCConfig<Model>;
    props: ComponentProps;
}): {
    error: object | null;
    loading: boolean;
    loaded: boolean;
    response: Response | null;
    arc: {
        arc: ARC<Model>;
        get: (args: {
            props?: ComponentProps | undefined;
            params: ComponentPropsWithRequiredModelParams;
        }) => Promise<void | Response> | undefined;
        remove: (args: {
            props?: ComponentProps | undefined;
            params: ComponentPropsWithRequiredModelParams;
        }) => Promise<void | Response> | undefined;
        create: (args: {
            props?: ComponentProps | undefined;
            params: ComponentPropsWithRequiredModelParams;
            body: any;
        }) => Promise<void | Response> | undefined;
        update: (args: {
            props?: ComponentProps | undefined;
            params: ComponentPropsWithRequiredModelParams;
            body: any;
        }) => Promise<void | Response> | undefined;
        extract: (props: ComponentProps) => ComponentPropsWithRequiredModelParams;
        extractParams: (props: ComponentProps) => ComponentPropsWithRequiredModelParams;
        custom: (fetcher: () => Promise<Response>) => Promise<void | Response> | undefined;
    };
};
