import { Connect } from "react-redux";
import { ARCConfig } from "./types/config.types";
export declare function mixerConnector<Model>(connect: Connect, config: ARCConfig<Model>, customMapStateToProps: Function | undefined): import("react-redux").InferableComponentEnhancerWithProps<any, {}>;
export default mixerConnector;
