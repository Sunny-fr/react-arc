"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _utils = require("../utils");

var core = {
  hasRequiredParams: function hasRequiredParams(ARCConfig, props) {
    var result = ARCConfig.modelProps.reduce(function (valid, prop) {
      return valid === true && typeof props[prop] !== "undefined" ? valid : false;
    }, true);
    //if (!result) console.log('missing required params', ARCConfig.modelProps, props)
    return result;
  },
  missingParams: function missingParams(ARCConfig, props) {
    return ARCConfig.modelProps.reduce(function (state, prop) {
      if (typeof props[prop] !== "undefined") return state;
      return state.concat(prop);
    }, []);
  },
  isNew: function isNew(ARCConfig, props) {
    return !this.getKey(ARCConfig, props);
  },
  getKey: function getKey(ARCConfig, props) {
    var params = this.getParams(ARCConfig, props);
    return !params ? null : (0, _utils.interpolate)(null, params);
  },
  getParams: function getParams(ARCConfig, props) {
    if (!this.hasRequiredParams(ARCConfig, props)) return null;
    return (0, _utils.extractParams)(ARCConfig.modelProps, props);
  },
  getMetas: function getMetas(ARCConfig, prop, props) {
    if (!this._getModel(ARCConfig, props)) return null;
    return !!prop ? this._getModel(ARCConfig, props).metas[prop] : this._getModel(ARCConfig, props).metas;
  },
  _getMetaModel: function _getMetaModel(ARCConfig, props) {
    return this.isNew(ARCConfig, props) ? props.tempModel : props.collection[this.getKey(ARCConfig, props)];
  },
  _getModel: function _getModel(ARCConfig, props) {
    //TO BE RENAMED
    return this.isNew(ARCConfig, props) ? props.tempModel : props.collection[this.getKey(ARCConfig, props)];
  },
  getModel: function getModel(ARCConfig, props) {
    var metaModel = this._getModel(ARCConfig, props);
    if (!metaModel) {
      return null;
    }
    return metaModel.model;
  },
  getError: function getError(ARCConfig, props) {
    return this.getMetas(ARCConfig, "error", props);
  },
  isSyncing: function isSyncing(ARCConfig, props) {
    return this.getMetas(ARCConfig, "fetching", props);
  },
  isLoaded: function isLoaded(ARCConfig, props) {
    if (this.isNew(ARCConfig, props)) return true;
    return !(!this._getModel(ARCConfig, props) || !this.getMetas(ARCConfig, "loaded", props));
  },
  allowReFetch: function allowReFetch(ARCConfig, props) {
    return !(ARCConfig.fetchOnce && this.isLoaded(ARCConfig, props));
  },
  errorReFetch: function errorReFetch(ARCConfig, props) {
    //canReFetchOnerror
    if (ARCConfig.refetchOnError === true && !this.isSyncing(ARCConfig, props) && !this.isLoaded(ARCConfig, props) && !!this.getError(ARCConfig, props)) return true;
    return !this.getError(ARCConfig, props);
  },
  getStore: function getStore(ARCConfig, reduxStore) {
    return reduxStore[ARCConfig.name];
  },
  modelPicker: function modelPicker(ARCConfig, props) {
    var _this = this;

    var keys = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : [];
    var collection = props.collection;

    return keys.reduce(function (state, keyProps) {
      var modelParams = _this.getParams(ARCConfig, keyProps);
      return state.concat(_this.getModel(ARCConfig, _extends({ collection: collection }, modelParams)));
    }, []);
  },
  freeModelPicker: function freeModelPicker(ARCConfig, reduxStore) {
    var keys = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : [];

    var _getStore = this.getStore(ARCConfig, reduxStore),
        collection = _getStore.collection;

    return this.modelPicker(ARCConfig, { collection: collection }, keys);
  },


  /** **/
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