"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

exports.mixerStore = mixerStore;

var _utils = require("../utils");

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var time = function time() {
  return new Date().getTime();
};

// MIXER
// returns a reducer

function mixerStore(options) {
  var config = options && options.config ? options.config : {};
  var extendedConfig = _extends({}, (0, _utils.getDefaultConfig)(), config);
  var defaultModelObject = JSON.parse(JSON.stringify(extendedConfig.defaultModel));

  /* GENERATED WITH CASTER */
  /* REDUCER STRUCTURE */

  var defaultModel = {
    metas: {
      loaded: false,
      fetching: false,
      fetchRequested: false,
      valid: false,
      saving: false,
      deleting: false,
      saved: false,
      tries: 0,
      start: 0,
      end: 0
    },
    model: _extends({}, defaultModelObject)
  };

  var defaultState = {
    collection: {},
    temp: {
      metas: _extends({}, defaultModel.metas),
      model: _extends({}, defaultModel.model)
    },
    fetching: false,
    loaded: false,
    error: null
  };

  function mapModels(list) {
    return list.reduce(function (prev, current) {
      var tempKey = (0, _utils.interpolate)(null, (0, _utils.getParams)(extendedConfig, current));
      var key = tempKey || JSON.stringify(current);
      prev[key] = Object.assign({}, defaultModel, {
        model: current,
        metas: _extends({}, defaultModel.metas, { loaded: true, valid: true })
      });
      return prev;
    }, {});
  }

  function keyGen(params) {
    return params ? (0, _utils.interpolate)(null, params) : null;
  }

  return function reducer() {
    var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : defaultState;
    var action = arguments[1];

    function previousItem(key) {
      var collection = _extends({}, state.collection);
      return collection[key];
    }

    function update(item, key) {
      return _extends({}, state.collection, _defineProperty({}, key, item));
    }

    function decorate(str) {
      return (0, _utils.interpolate)(str, extendedConfig);
    }

    switch (action.type) {
      /*** FETCHING COLLECTION ***/

      case decorate("RESET_{uppercaseName}S"):
        {
          return _extends({}, defaultState, {
            collection: _extends({}, defaultState.collection),
            temp: {
              metas: _extends({}, defaultModel.metas, { loaded: false }),
              model: _extends({}, defaultModel.model)
            }
          });
        }

      case decorate("FETCH_{uppercaseName}S"):
        {
          return _extends({}, state, { fetching: true, error: null, start: time() });
        }

      case decorate("FETCH_{uppercaseName}S_FULFILLED"):
        {
          return _extends({}, state, {
            fetching: false,
            loaded: true,
            end: time(),
            collection: mapModels(action.payload.data)
          });
        }

      case decorate("FETCH_{uppercaseName}S_CANCELLED"):
        {
          return _extends({}, state, {
            fetching: false,
            end: time()
          });
        }

      case decorate("FETCH_{uppercaseName}S_REJECTED"):
        {
          return _extends({}, state, {
            fetching: false,
            loaded: false,
            end: time(),
            error: action.payload.error
          });
        }

      /*** END FETCHING COLLECTION ***/

      /*** FETCHING MODEL ***/

      // NEVER USED
      case decorate("INIT_{uppercaseName}"):
        {
          var collection = _extends({}, state.collection);
          var key = keyGen(action.payload.params);

          var previous = previousItem(key);
          collection[key] = Object.assign({}, {
            metas: _extends({}, defaultModel.metas, { loaded: false }),
            model: _extends({}, defaultModel.model)
          }, previous);

          return _extends({}, state, {
            collection: collection
          });
        }

      case decorate("FETCH_{uppercaseName}"):
        {
          var _collection = _extends({}, state.collection);
          var _key = keyGen(action.payload.params);

          var _previous = previousItem(_key);
          var tryNumber = typeof action.payload.tries === "number" ? action.payload.tries : 1;

          if (!_previous) {
            _collection[_key] = _extends({}, defaultModel, {
              metas: _extends({}, defaultModel.metas, {
                fetching: true,
                start: time(),
                tries: tryNumber
              })
            });
          } else {
            _collection[_key] = Object.assign({}, _previous, {
              metas: _extends({}, _collection[_key].metas, {
                fetching: true,
                saved: false,
                start: time(),
                tries: tryNumber
              })
            });
          }
          return _extends({}, state, {
            collection: _collection
          });
        }

      case decorate("FETCH_{uppercaseName}_REJECTED"):
        {
          var _collection2 = _extends({}, state.collection);
          var _key2 = keyGen(action.payload.params);
          _collection2[_key2] = {
            metas: _extends({}, _collection2[_key2].metas, {
              loaded: false,
              fetching: false,
              valid: false,
              end: time(),
              error: action.payload.error
            }),
            model: _extends({}, defaultModel.model)
          };
          return _extends({}, state, {
            collection: _collection2
          });
        }

      case decorate("FETCH_{uppercaseName}_CANCELLED"):
        {
          var _collection3 = _extends({}, state.collection);
          var _key3 = keyGen(action.payload.params);

          //HAS A PREVIOUS VALID STATE
          if (_collection3[_key3].metas.loaded === true) {
            // KEEP IT
            _collection3[_key3] = _extends({}, _collection3[_key3], {
              metas: _extends({}, _collection3[_key3].metas, {
                fetching: false,
                end: time()
              })
            });
            return _extends({}, state, {
              collection: _collection3
            });
          }

          //REMOVING IT FROM THE STORE
          return _extends({}, state, {
            collection: Object.keys(_collection3).reduce(function (s, i) {
              if (i === _key3) return s;
              return _extends({}, s, _defineProperty({}, i, _collection3[i]));
            }, {})
          });
        }

      case decorate("FETCH_{uppercaseName}_FULFILLED"):
        {
          var _collection4 = _extends({}, state.collection);
          var _key4 = keyGen(action.payload.params);
          _collection4[_key4] = {
            metas: _extends({}, _collection4[_key4].metas, {
              loaded: true,
              fetching: false,
              end: time(),
              valid: true
            }),
            model: action.payload.data
          };
          return _extends({}, state, {
            collection: _collection4
          });
        }

      /*** END FETCHING MODEL ***/

      case decorate("RESET_{uppercaseName}_TEMP"):
        {
          return _extends({}, state, {
            temp: {
              metas: _extends({}, defaultModel.metas, { loaded: true }),
              model: _extends({}, defaultModel.model)
            }
          });
        }

      case decorate("EDIT_{uppercaseName}"):
        {
          var _key5 = keyGen(action.payload.params);
          if (!_key5) {
            //model is new
            return _extends({}, state, {
              temp: _extends({}, state.temp, {
                model: Object.assign({}, state.temp.model, action.payload.data)
              })
            });
          } else {
            var _collection5 = _extends({}, state.collection);
            _collection5[_key5] = {
              metas: _extends({}, _collection5[_key5].metas),
              model: Object.assign({}, _collection5[_key5].model, action.payload.data)
            };
            return _extends({}, state, {
              collection: _collection5
            });
          }
        }

      case decorate("SAVE_{uppercaseName}"):
        {
          var _key6 = keyGen(action.payload.params);
          var prev = action.payload.create ? state.temp : previousItem(_key6);
          var updated = _extends({}, prev, {
            metas: _extends({}, prev.metas, {
              error: null,
              saving: true,
              start: time(),
              saved: false
            })
          });
          if (action.payload.create) {
            //model is new
            return _extends({}, state, { temp: updated });
          } else {
            var _collection6 = update(updated, _key6);
            return _extends({}, state, { collection: _collection6 });
          }
        }

      case decorate("SAVE_{uppercaseName}_REJECTED"):
        {
          var _key7 = keyGen(action.payload.params);
          var _prev = action.payload.create ? state.temp : previousItem(_key7);
          var _updated = _extends({}, _prev, {
            metas: _extends({}, _prev.metas, {
              error: action.payload.error,
              end: time(),
              saving: false,
              saved: false
            })
          });
          if (action.payload.create) {
            //model is new
            return _extends({}, state, { temp: _updated });
          } else {
            var _collection7 = update(_updated, _key7);
            return _extends({}, state, {
              collection: _collection7
            });
          }
        }

      case decorate("SAVE_{uppercaseName}_FULFILLED"):
        {
          var _key8 = keyGen(action.payload.params);
          var _prev2 = action.payload.create ? state.temp : previousItem(_key8);
          var _updated2 = _extends({}, _prev2, {
            metas: _extends({}, _prev2.metas, { saving: false, end: time(), saved: true }),
            model: action.payload.data
          });
          if (action.payload.create) {
            //model is new
            return _extends({}, state, { temp: _updated2 });
          } else {
            var _collection8 = update(_updated2, _key8);
            return _extends({}, state, {
              collection: _collection8
            });
          }
        }

      case decorate("DELETE_{uppercaseName}"):
        {
          var _key9 = keyGen(action.payload.params);
          var _prev3 = previousItem(_key9);
          var _updated3 = _extends({}, _prev3, {
            metas: _extends({}, _prev3.metas, {
              deleting: true,
              start: time(),
              fetching: true
            })
          });
          var _collection9 = update(_updated3, _key9);
          return _extends({}, state, { collection: _collection9 });
        }

      case decorate("DELETE_{uppercaseName}_REJECTED"):
        {
          var _key10 = keyGen(action.payload.params);
          var _prev4 = previousItem(_key10);
          var _updated4 = _extends({}, _prev4, {
            metas: _extends({}, _prev4.metas, {
              error: action.payload.error,
              end: time(),
              deleting: false,
              fetching: false
            })
          });
          var _collection10 = update(_updated4, _key10);
          return _extends({}, state, {
            collection: _collection10
          });
        }

      case decorate("DELETE_{uppercaseName}_FULFILLED"):
        {
          var _key11 = keyGen(action.payload.params);
          var _collection11 = _extends({}, state.collection);
          delete _collection11[_key11];
          return _extends({}, state, {
            collection: _collection11
          });
        }

      default:
        return state;
    }
  };
}

exports.default = mixerStore;