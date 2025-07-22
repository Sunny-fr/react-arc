import { ARCConfig } from "./types/config.types";
interface CancelRequestParams<Model> {
    ARCConfig: ARCConfig<Model>;
}
declare const commons: {
    /**
     * @param {ARCConfig} ARCConfig
     * @return {{type: string, message: string}}
     */
    cancelRequestPayload<Model>({ ARCConfig }: CancelRequestParams<Model>): {
        type: string;
        message: string;
    };
};
export default commons;
