/**
 * Config
 */
export var ARCHttpRestMethodMapDefaults = {
    create: "POST",
    update: "PUT",
    delete: "DELETE",
    read: "GET",
};
export var ARCConfigDefaults = {
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
