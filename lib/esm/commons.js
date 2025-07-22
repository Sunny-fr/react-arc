var commons = {
    /**
     * @param {ARCConfig} ARCConfig
     * @return {{type: string, message: string}}
     */
    cancelRequestPayload: function (_a) {
        var ARCConfig = _a.ARCConfig;
        return {
            type: "ARC:Cancel",
            message: "ARC: Cancel request due to unmount (reducer: ".concat(ARCConfig.name || "Unknown reducer", ")"),
        };
    },
};
export default commons;
