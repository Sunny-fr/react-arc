'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
//EXAMPLE CONFIG
var config = exports.config = {
    name: 'something',
    //used in the reducers
    uppercaseName: 'SOMETHING',
    // useful to map objects in collection
    modelProps: ['id'],
    // for paging for example
    collectionProps: ['size', 'page'],
    paths: {
        item: '/some/url',
        collection: '/some/other/url'
    }
};

exports.default = config;