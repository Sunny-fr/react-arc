"use strict";

/**
 * @typedef {function} StoreConnector
 * @param {object} store
 * @param {object} ownProps
 * @return {ARCMappedProps}
 * @export
 */

/**
 * ARCMappedProps
 * @typedef {object} ARCMappedProps
 * @property {boolean} loaded
 * @property {object} metaModel
 * @property {object} model
 * @property {object} error
 * @property {boolean} syncing
 * @property {object} metas
 * @property {boolean} isNew
 * @property {ARCConfig} ARCConfig
 * @property {ArcCollection} collection
 * @property {object} tempModel
 * @export
 */

/**
 * @typedef {Object.<ArcModelKey, ArcMetaModel>} ArcCollection
 * @export
 */

/**
 * ARC Store
 * @typedef {object} ArcStore
 * @property {ArcCollection} collection
 * @property {ArcMetaModel} temp
 * @property {boolean} fetching
 * @property {boolean} loaded
 * @property {object|null} error
 * @export
 */

exports.unused = {};