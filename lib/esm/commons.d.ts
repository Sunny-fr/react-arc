import { ARCConfig } from "./types/config.types";
interface CancelRequestParams<Model, RequiredProps> {
    ARCConfig: ARCConfig<Model, RequiredProps>;
}
declare const commons: {
    /**
     * @param {ARCConfig} ARCConfig
     * @return {{type: string, message: string}}
     */
    cancelRequestPayload<Model, RequiredProps>({ ARCConfig }: CancelRequestParams<Model, RequiredProps>): {
        type: string;
        message: string;
    };
};
export default commons;
