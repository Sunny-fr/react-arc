import { ARCConfig } from "./types/config.types"

interface CancelRequestParams<Model> {
  ARCConfig: ARCConfig<Model>
}

const commons = {
  /**
   * @param {ARCConfig} ARCConfig
   * @return {{type: string, message: string}}
   */
  cancelRequestPayload<Model>({ ARCConfig }: CancelRequestParams<Model>)  {
    return {
      type: "ARC:Cancel",
      message: `ARC: Cancel request due to unmount (reducer: ${
        ARCConfig.name || "Unknown reducer"
      })`,
    }
  },
}
export default commons
