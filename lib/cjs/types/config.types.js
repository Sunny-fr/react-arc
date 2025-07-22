"use strict";
/**
 * Config
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.ARCConfigDefaults = exports.ARCHttpRestMethodMapDefaults = void 0;
exports.ARCHttpRestMethodMapDefaults = {
    create: "POST",
    update: "PUT",
    delete: "DELETE",
    read: "GET",
};
exports.ARCConfigDefaults = {
    methods: {
        create: "POST",
        read: "GET",
        delete: "DELETE",
        update: "PUT",
    },
    defaultModel: {},
    defaultProps: {},
    fetchOnce: false,
    refetchOnError: false,
    maxPendingRequestsPerReducer: 1,
    maxTries: 1,
    requestFetchDelay: 100,
    headers: {},
};
