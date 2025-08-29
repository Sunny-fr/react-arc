import { ARCConfig } from "./types/config.types"

interface CancelRequestParams<Model, RequiredProps> {
  ARCConfig: ARCConfig<Model, RequiredProps>
}

const commons = {
  /**
   * @param {ARCConfig} ARCConfig
   * @return {{type: string, message: string}}
   */
  cancelRequestPayload<Model, RequiredProps>({ ARCConfig }: CancelRequestParams<Model, RequiredProps>)  {
    return {
      type: "ARC:Cancel",
      message: `ARC: Cancel request due to unmount (reducer: ${
        ARCConfig.name || "Unknown reducer"
      })`,
    }
  },
}
export default commons
