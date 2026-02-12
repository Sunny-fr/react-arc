import { ARCConfig } from "./config.types";
export type ARCResponse<Model> = Model | null | undefined;
/**
 * Type de retour complet du hook useARC
 */
export interface UseARC<Model, RequiredProps> {
    error: any;
    loading: boolean;
    loaded: boolean;
    data: ARCResponse<Model>;
    ARCConfig: ARCConfig<Model, RequiredProps>;
    fetch: ({ params }?: {
        params?: RequiredProps;
    }) => Promise<any>;
}
