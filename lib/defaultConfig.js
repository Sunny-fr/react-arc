'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
//EXAMPLE CONFIG
var config = {
    //reducer name
    name: '',
    //namespace
    uppercaseName: '',
    // useful to map objects in collection
    modelProps: [],
    // can be empty (might be usefull if you need paging...)
    collectionProps: [],
    // path to your rest server
    paths: {
        item: '/',
        collection: '/'
    },

    /** OPTIONAL **/
    //methods
    methods: {
        create: 'POST',
        update: 'PUT',
        delete: 'DELETE',
        read: 'GET'
    },
    //default model : {name:'', description:'', tags: []}
    defaultModel: {},

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
    requestFetchDelay: 100
};

exports.default = Object.freeze(config);