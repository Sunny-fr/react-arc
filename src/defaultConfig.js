//EXAMPLE CONFIG
export const config = {
    name: 'something',
    //used in the reducers
    uppercaseName: 'SOMETHING',
    // useful to map objects in collection
    modelProps: ['id'],
    // can be empty (might be usefull if you need paging...)
    collectionProps: ['size','page'],
    // path to your rest server
    paths: {
        item: '/some/url',
        collection: '/some/other/url'
    },
    /** OPTIONAL **/
    //methods
    methods: {
        create: 'POST',
        update: 'PUT',
        delete: 'DELETE',
        read:   'GET'
    },
    //default model : {name:'', description:'', tags: []}
    defaultModel : {},
    // Lazy mode :
    // will fetch only once and use the first time loaded result
    fetchOnce: false
}

export default config