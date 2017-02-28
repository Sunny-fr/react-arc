//EXAMPLE CONFIG
export const config = {
    name: 'something',
    //used in the reducers
    uppercaseName: 'SOMETHING',
    // useful to map objects in collection
    modelProps: ['id'],
    // for paging for example
    collectionProps: ['size','page'],
    paths: {
        item: '/some/url',
        collection: '/some/other/url'
    }
}

export default config