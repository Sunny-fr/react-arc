const commons = {
  /**
   * @param {ARCConfig} ARCConfig
   * @param {object} rest
   * @return {{type: string, message: string}}
   */
  cancelRequestPayload: ({ ARCConfig, ...rest }) => {
    return {
      type: "ARC:Cancel",
      message: `ARC: Cancel request due to unmount (reducer: ${
        ARCConfig?.name || "unknown reducer"
      })`,
    }
  },
}
export default commons
