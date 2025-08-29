const commons = {
    /**
     * @param {ARCConfig} ARCConfig
     * @return {{type: string, message: string}}
     */
    cancelRequestPayload({ ARCConfig }) {
        return {
            type: "ARC:Cancel",
            message: `ARC: Cancel request due to unmount (reducer: ${ARCConfig.name || "Unknown reducer"})`,
        };
    },
};
export default commons;
