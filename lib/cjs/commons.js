"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
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
exports.default = commons;
