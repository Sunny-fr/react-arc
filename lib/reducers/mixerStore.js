'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

exports.mixerStore = mixerStore;

var _utils = require('../utils');

var _AbstractComponent = require('../components/AbstractComponent');

var _defaultConfig = require('../defaultConfig');

var _defaultConfig2 = _interopRequireDefault(_defaultConfig);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

// MIXER
// returns a reducer

function mixerStore(options) {
    var config = options && options.config ? options.config : _AbstractComponent.config;
    var extendedConfig = _extends({}, _defaultConfig2.default, config);

    /* GENERATED WITH CASTER */
    /* REDUCER STRUCTURE */

    var defaultModel = extendedConfig.defaultModel || {
        metas: { loaded: false, fetching: false, valid: false, saving: false, deleting: false, forward: false },
        model: {}
    };

    var defaultState = extendedConfig.defaultState || {
        collection: {},
        temp: { metas: _extends({}, defaultModel.metas, { loaded: false }), model: _extends({}, defaultModel.model) },
        fetching: false,
        loaded: false,
        error: null
    };

    function mapModels(list) {
        return list.reduce(function (prev, current) {
            var key = (0, _utils.interpolate)(null, (0, _utils.extractParams)(extendedConfig.modelProps, current));
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

            case decorate('RESET_{uppercaseName}S'):
                {
                    return _extends({}, defaultState, {
                        collection: _extends({}, defaultState.collection),
                        temp: { metas: _extends({}, defaultModel.metas, { loaded: false }), model: _extends({}, defaultModel.model) }
                    });
                }

            case decorate('FETCH_{uppercaseName}S'):
                {
                    return _extends({}, state, { loaded: false, fetching: true });
                }

            case decorate('FETCH_{uppercaseName}S_FULFILLED'):
                {
                    return _extends({}, state, { fetching: false, loaded: true, collection: mapModels(action.payload.data) });
                }

            case decorate('FETCH_{uppercaseName}S_REJECTED'):
                {
                    return _extends({}, state, { fetching: false, loaded: false, error: action.payload.error });
                }

            case decorate('FETCH_{uppercaseName}'):
                {
                    var collection = _extends({}, state.collection);
                    var key = keyGen(action.payload.params);
                    if (!collection[key]) {
                        collection[key] = _extends({}, defaultModel, { metas: _extends({}, defaultModel.metas, { fetching: true }) });
                    } else {
                        collection[key] = Object.assign({}, collection[key], {
                            metas: _extends({}, defaultModel.metas, {
                                fetching: true
                            })
                        });
                    }
                    return _extends({}, state, {
                        collection: collection
                    });
                }

            case decorate('FETCH_{uppercaseName}_REJECTED'):
                {
                    var _collection = _extends({}, state.collection);
                    var _key = keyGen(action.payload.params);
                    _collection[_key] = {
                        metas: { loaded: false, fetching: false, valid: false, error: action.payload.error },
                        model: _extends({}, defaultModel.model)
                    };
                    return _extends({}, state, {
                        collection: _collection
                    });
                }

            case decorate('FETCH_{uppercaseName}_FULFILLED'):
                {
                    var _collection2 = _extends({}, state.collection);
                    var _key2 = keyGen(action.payload.params);
                    _collection2[_key2] = { metas: { loaded: true, fetching: false, valid: true }, model: action.payload.data };
                    return _extends({}, state, {
                        collection: _collection2
                    });
                }

            case decorate('RESET_TEMP'):
                {
                    return _extends({}, state, {
                        temp: { metas: _extends({}, defaultModel.metas, { loaded: true }), model: _extends({}, defaultModel.model) }
                    });
                }

            case decorate('EDIT_{uppercaseName}'):
                {
                    var _key3 = keyGen(action.payload.params);
                    if (!_key3) {
                        //model is new
                        return _extends({}, state, {
                            temp: _extends({}, state.temp, { model: Object.assign({}, state.temp.model, action.payload.data) })
                        });
                    } else {
                        var _collection3 = _extends({}, state.collection);
                        _collection3[_key3].model = Object.assign({}, _collection3[_key3].model, action.payload.data);
                        return _extends({}, state, {
                            collection: _collection3
                        });
                    }
                }

            case decorate('SAVE_{uppercaseName}'):
                {
                    var _key4 = keyGen(action.payload.params);
                    var prev = !_key4 ? state.temp : previousItem(_key4);
                    var updated = _extends({}, prev, { metas: _extends({}, prev.metas, { error: null, saving: true }) });
                    if (!_key4) {
                        //model is new
                        return _extends({}, state, { temp: updated });
                    } else {
                        var _collection4 = update(updated, _key4);
                        return _extends({}, state, { collection: _collection4 });
                    }
                }

            case decorate('SAVE_{uppercaseName}_REJECTED'):
                {
                    var _key5 = keyGen(action.payload.params);
                    var _prev = !_key5 ? state.temp : previousItem(_key5);
                    var _updated = _extends({}, _prev, { metas: _extends({}, _prev.metas, { error: action.payload.error, saving: false }) });
                    if (!_key5) {
                        //model is new
                        return _extends({}, state, { temp: _updated });
                    } else {
                        var _collection5 = update(_updated, _key5);
                        return _extends({}, state, {
                            collection: _collection5
                        });
                    }
                }

            case decorate('SAVE_{uppercaseName}_FULFILLED'):
                {
                    var _key6 = keyGen(action.payload.params);
                    var _prev2 = !_key6 ? state.temp : previousItem(_key6);
                    var _updated2 = _extends({}, _prev2, {
                        metas: _extends({}, _prev2.metas, { saving: false, forward: !_key6 }),
                        model: action.payload.data
                    });
                    if (!_key6) {
                        //model is new
                        return _extends({}, state, { temp: _updated2 });
                    } else {
                        var _collection6 = update(_updated2, _key6);
                        return _extends({}, state, {
                            collection: _collection6
                        });
                    }
                }

            case decorate('DELETE_{uppercaseName}'):
                {
                    var _key7 = keyGen(action.payload.params);
                    var _prev3 = previousItem(_key7);
                    var _updated3 = _extends({}, _prev3, { metas: _extends({}, _prev3.metas, { deleting: true }) });
                    var _collection7 = update(_updated3, _key7);
                    return _extends({}, state, { collection: _collection7 });
                }

            case decorate('DELETE_{uppercaseName}_REJECTED'):
                {
                    var _key8 = keyGen(action.payload.params);
                    var _prev4 = previousItem(_key8);
                    var _updated4 = _extends({}, _prev4, { metas: _extends({}, _prev4.metas, { error: action.payload.error, deleting: false }) });
                    var _collection8 = update(_updated4, _key8);
                    return _extends({}, state, {
                        collection: _collection8
                    });
                }

            case decorate('DELETE_{uppercaseName}_FULFILLED'):
                {
                    var _key9 = keyGen(action.payload.params);
                    var _collection9 = _extends({}, state.collection);
                    delete _collection9[_key9];
                    return _extends({}, state, {
                        collection: _collection9
                    });
                }

            default:
                return state;

        }
    };
}

exports.default = mixerStore;