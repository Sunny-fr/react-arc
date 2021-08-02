"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _utils = require("../utils");

var core = {
  /**
   * Generates Key
   * @param {object} params - Params
   * @return {ArcModelKey}
   */
  keyGenerator: function keyGenerator(params) {
    return (0, _utils.interpolate)(null, params);
  },

  /**
   * returns true if the component has all the required props
   * @param {ARCConfig} ARCConfig
   * @param {object} props - component props
   * @return {boolean}
   */
  hasRequiredParams: function hasRequiredParams(ARCConfig, props) {
    return ARCConfig.modelProps.every(function (prop) {
      return typeof props[prop] !== "undefined";
    });
  },

  /**
   * returns the missing required props (useful for debugging)
   * @param {ARCConfig} ARCConfig
   * @param {object} props - component props
   * @return {array<string>}
   */
  missingParams: function missingParams(ARCConfig, props) {
    return ARCConfig.modelProps.reduce(function (state, prop) {
      if (typeof props[prop] !== "undefined") return state;
      return state.concat(prop);
    }, []);
  },

  /**
   * Is the data fetched or a new model is created ?
   * @param {ARCConfig} ARCConfig
   * @param {object} props - component props
   * @return {boolean}
   */
  isNew: function isNew(ARCConfig, props) {
    return !this.getKey(ARCConfig, props);
  },

  /**
   * returns the reducer key
   * @param {ARCConfig} ARCConfig
   * @param {object} props - component props
   * @return {ArcModelKey|null}
   */
  getKey: function getKey(ARCConfig, props) {
    var params = this.getParams(ARCConfig, props);
    return !params ? null : this.keyGenerator(params);
  },

  /**
   * returns the only the required params from the component props
   * @param {ARCConfig} ARCConfig
   * @param {object} props - component props
   * @return {object|null}
   */
  getParams: function getParams(ARCConfig, props) {
    if (!this.hasRequiredParams(ARCConfig, props)) return null;
    return (0, _utils.getParams)(ARCConfig, props);
  },

  /**
   * returns the metas
   * @param {ARCConfig} ARCConfig
   * @param {string} [prop] - requested meta
   * @param {object} props - component props
   * @return {null|object|*}
   */
  getMetas: function getMetas(ARCConfig, prop, props) {
    if (!this._getModel(ARCConfig, props)) return null;
    return !!prop ? this._getModel(ARCConfig, props).metas[prop] : this._getModel(ARCConfig, props).metas;
  },

  /**
   * returns the meta model
   * @param {ARCConfig} ARCConfig
   * @param {object} props - component props
   * @return {object}
   */
  _getModel: function _getModel(ARCConfig, props) {
    //TO BE RENAMED
    return this.isNew(ARCConfig, props) ? props.tempModel : props.collection[this.getKey(ARCConfig, props)];
  },

  /**
   * returns the model
   * @param {ARCConfig} ARCConfig
   * @param {object} props - component props
   * @return {ArcModel|null}
   */
  getModel: function getModel(ARCConfig, props) {
    var metaModel = this._getModel(ARCConfig, props);
    if (!metaModel) {
      return null;
    }
    return metaModel.model;
  },

  /**
   * returns the caught error
   * @param {ARCConfig} ARCConfig
   * @param {object} props - component props
   * @return {object|null}
   */
  getError: function getError(ARCConfig, props) {
    return this.getMetas(ARCConfig, "error", props);
  },

  /**
   * returns true if the component is syncing
   * @param {ARCConfig} ARCConfig
   * @param {object} props - component props
   * @return {boolean}
   */
  isSyncing: function isSyncing(ARCConfig, props) {
    return this.getMetas(ARCConfig, "fetching", props);
  },

  /**
   * returns true if the component is loaded
   * @param {ARCConfig} ARCConfig
   * @param {object} props - component props
   * @return {boolean}
   */
  isLoaded: function isLoaded(ARCConfig, props) {
    if (this.isNew(ARCConfig, props)) return true;
    return !(!this._getModel(ARCConfig, props) || !this.getMetas(ARCConfig, "loaded", props));
  },

  /**
   * returns true if the component can be re-fetched
   * @param {ARCConfig} ARCConfig
   * @param {object} props - component props
   * @return {boolean}
   */
  allowReFetch: function allowReFetch(ARCConfig, props) {
    return !(ARCConfig.fetchOnce && this.isLoaded(ARCConfig, props));
  },

  /**
   * returns true if the component can re-refetch on error
   * @param {ARCConfig} ARCConfig
   * @param {object} props - component props
   * @return {boolean}
   */
  errorReFetch: function errorReFetch(ARCConfig, props) {
    //canReFetchOnerror
    if (ARCConfig.refetchOnError === true && !this.isSyncing(ARCConfig, props) && !this.isLoaded(ARCConfig, props) && !!this.getError(ARCConfig, props)) return true;
    return !this.getError(ARCConfig, props);
  },

  /**
   * the reducer state
   * @param {ARCConfig} ARCConfig
   * @param {object} reduxStoreState - redux's store.getState()
   * @return {object}
   */
  getStore: function getStore(ARCConfig, reduxStoreState) {
    return reduxStoreState[ARCConfig.name];
  },

  /**
   * Returns a list of fetched models
   * @param {ARCConfig} ARCConfig
   * @param {object} props - component props
   * @param {array<ArcModelKey>} [keys=[]] - list of model keys
   * @return {array<ArcModel>}
   */
  modelPicker: function modelPicker(ARCConfig, props) {
    var _this = this;

    var keys = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : [];
    var collection = props.collection;

    return keys.reduce(function (state, keyProps) {
      var modelParams = _this.getParams(ARCConfig, keyProps);
      return state.concat(_this.getModel(ARCConfig, _extends({ collection: collection }, modelParams)));
    }, []);
  },


  /**
   * return a model
   * @param {ARCConfig} ARCConfig
   * @param {object} reduxStoreState - redux's store.getState()
   * @param {array<ArcModelKey>} [keys=[]] - list of model keys
   * @return {array<ArcModel>}
   */
  freeModelPicker: function freeModelPicker(ARCConfig, reduxStoreState) {
    var keys = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : [];

    var _getStore = this.getStore(ARCConfig, reduxStoreState),
        collection = _getStore.collection;

    return this.modelPicker(ARCConfig, { collection: collection }, keys);
  },


  /**
   * Returns the number of fetching items
   * @param {ARCConfig} ARCConfig
   * @param {object} props - component props
   * @return {number}
   */
  getFetchingCount: function getFetchingCount(ARCConfig, props) {
    var _ref = props || this.props,
        collection = _ref.collection;

    return Object.keys(collection).map(function (key) {
      return collection[key];
    }).filter(function (model) {
      return model.metas.fetching;
    }).length;
  },


  /** COLLECTIONS **/
  getCollectionError: function getCollectionError(ARCConfig, props) {
    var error = props.error;

    return error;
  },
  isCollectionLoaded: function isCollectionLoaded(ARCConfig, props) {
    var loaded = props.loaded;

    return loaded;
  },
  isCollectionSyncing: function isCollectionSyncing(ARCConfig, props) {
    var fetching = props.fetching;

    return fetching;
  },
  allowCollectionReFetch: function allowCollectionReFetch(ARCConfig, props) {
    return !(ARCConfig.fetchOnce && this.isCollectionLoaded(ARCConfig, props));
  }
};

exports.default = core;