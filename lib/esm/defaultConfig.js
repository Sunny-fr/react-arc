//DEFAULT CONFIG
const config = {
    //reducer name
    name: "",
    //namespace
    actionNamespace: "",
    // useful to map objects in collection
    modelProps: [],
    // path to your rest server
    paths: {
        item: "/",
    },
    /** OPTIONAL **/
    //methods
    methods: {
        create: "POST",
        update: "PUT",
        delete: "DELETE",
        read: "GET",
    },
    //default model : {name:'', description:'', tags: []}
    defaultModel: {},
    //props will be added if missing
    defaultProps: {},
    /** EXPERIMENTAL **/
    // Lazy mode :
    // will fetch only once and use the first time loaded result
    fetchOnce: false,
    // will refetch when the component will be mounted
    refetchOnError: false,
    // adds custom headers
    headers: {},
    // Limits the number of fetch requests (-1 means no limit)
    maxPendingRequestsPerReducer: -1,
    // delay before re fetch
    requestFetchDelay: 100,
    //tries
    maxTries: 1,
    // fetchers: {
    //   'fetch': (params, config1, props, axiosOptions) =>
    //     Promise.resolve({
    //       data: {},
    //       status: 200,
    //       statusText: "OK",
    //       headers: {},
    //       config: {},
    //     }),
    // }
};
export default config;
