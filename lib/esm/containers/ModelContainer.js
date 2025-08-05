var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
import { omit } from "../utils";
import commons from "../commons";
import Container from "./Container";
import React from "react";
import { AXIOS_CANCEL_PAYLOAD } from "../actions/ReduxActions";
var ModelContainer = /** @class */ (function (_super) {
    __extends(ModelContainer, _super);
    function ModelContainer() {
        // static propTypes = {
        //   dispatch: PropTypes.func.isRequired,
        //   ARCConfig: PropTypes.object.isRequired,
        // }
        var _this = _super !== null && _super.apply(this, arguments) || this;
        // checkDispatchAvailability() {
        //   const { dispatch } = this.props
        //   if (!dispatch) {
        //     return new Error("Component is missing dispatch")
        //   }
        //   return dispatch
        // }
        /* public
         * Fetch a model */
        _this.fetch = function (params) {
            _this.abortController = new AbortController();
            var axiosOptions = {
                abortController: _this.abortController
            };
            var promise = _this.props.dispatch(_this.actions.fetchOne(params, _this.props, axiosOptions));
            promise.catch(function (e) {
                if (e.name === AXIOS_CANCEL_PAYLOAD.name && e.code === AXIOS_CANCEL_PAYLOAD.code) {
                    return;
                }
                return;
            });
            return promise;
        };
        /* public
         * deletes a model */
        _this.remove = function () {
            var params = _this.getParams();
            _this.props.dispatch(_this.actions.remove(params || {}, _this.props));
        };
        /** PUBLIC METHODS **/
        /* public
         * returns model (data retrieved from the server) */
        _this.getFetchingCount = function () {
            var collection = _this.getPropsFromTrueStoreState(_this.props).collection;
            return _this.core.getFetchingCount(collection);
        };
        /* private
         * performs a fetch if the flag fetchOnce is set to false
         */
        _this.allowReFetch = function (props) {
            var metaModel = (props || _this.props).metaModel;
            return _this.core.allowReFetch(_this.ARCConfig, metaModel);
        };
        return _this;
        // shouldComponentUpdate(nextProps, nextState) {
        //
        //     if (typeof nextProps !== typeof this.props || typeof nextState !== typeof this.state) return true
        //
        //     const propsThatChanged = changedProps(this.props, nextProps)
        //     const statesThatChanged = changedProps(this.state, nextState)
        //
        //
        //     if (statesThatChanged.length === 0 && propsThatChanged.length === 0) return false
        //
        //     //if (!this.isCollectionLoaded(this.props) || !this._getModel(nextProps)) return true
        //
        //     if (propsThatChanged.length === 1 && propsThatChanged.includes('collection')) {
        //         const prevModel = this._getModel(this.props)
        //         const nextModel = this._getModel(nextProps)
        //         return !equal(prevModel, nextModel)
        //     }
        //
        //
        //     return statesThatChanged.length > 0 || propsThatChanged.length > 0
        // }
    }
    /** PUBLIC ACTIONS METHODS **/
    /* public
     * if the component has not the required params it will be set as new */
    ModelContainer.prototype.isNew = function (props) {
        //return (props || this.props).isNew
        return this.core.isNew(this.ARCConfig, props || this.props);
    };
    /* public
     * returns null or string
     * acts as unique identifier (based on required props) */
    ModelContainer.prototype.getKey = function (props) {
        return this.core.getKey(this.ARCConfig, props || this.props);
    };
    /* public
     * retrieve params from props or model */
    /* CUSTOMIZE HERE FOR ADVANCED USAGE */
    ModelContainer.prototype.getParams = function (props) {
        return this.core.getParams(this.ARCConfig, props || this.props);
    };
    /* private
     * checks if the component has the required params based on modelProps in config
     */
    ModelContainer.prototype.hasRequiredParams = function (props) {
        return this.core.hasRequiredParams(this.ARCConfig, props || this.props);
    };
    /* private
     * get a model and its metas data
     */
    ModelContainer.prototype._getModel = function (props) {
        return (props || this.props).metaModel;
    };
    ModelContainer.prototype.getModel = function (props) {
        return (props || this.props).model;
    };
    /* public
     * returns metas (loaded, error, etc.) */
    ModelContainer.prototype.getMetas = function (prop, props) {
        return this.core.getMetas(prop, (props || this.props).metaModel);
    };
    /* public
     * returns  error */
    ModelContainer.prototype.getError = function (props) {
        return (props || this.props).error;
    };
    /* public
     * returns bool if there's any activity */
    ModelContainer.prototype.isSyncing = function (props) {
        return (props || this.props).syncing;
    };
    /* public
     * returns bool if the model has been loaded at least one time */
    ModelContainer.prototype.isLoaded = function (props) {
        return (props || this.props).loaded;
    };
    ModelContainer.prototype.errorReFetch = function (props) {
        var metaModel = (props || this.props).metaModel;
        //can re fetch on error
        return this.core.errorReFetch(this.ARCConfig, metaModel);
    };
    ModelContainer.prototype.componentDidUpdate = function () {
        this.prepareFetch({ skipReFetchStep: true });
    };
    ModelContainer.prototype.prepareFetch = function (_a) {
        var _b = _a.skipReFetchStep, skipReFetchStep = _b === void 0 ? false : _b;
        var props = this.props; //this.getPropsFromTrueStoreState(this.props)
        if (this._fetchAuthorization(props, { skipReFetchStep: skipReFetchStep })) {
            var max = this.ARCConfig.maxPendingRequestsPerReducer;
            if (max && max > -1) {
                var count = this.getFetchingCount();
                if (count > max) {
                    //console.log('too much pending requests', count, 'pending)
                    return this.delayedFetch({ skipReFetchStep: skipReFetchStep });
                }
            }
            var params = this.getParams(props);
            if (!params) {
                console.error('params are missing');
                return;
            }
            this.fetch(params)
                .catch(function () {
                //console.error('fetch error')
                // this.props.dispatch(this.actions.resetTemp())
            });
        }
    };
    ModelContainer.prototype.componentWillUnmount = function () {
        clearTimeout(this.delayedTimeout);
        this.delayedTimeout = undefined;
        if (this.abortController) {
            this.abortController.abort(commons.cancelRequestPayload({ ARCConfig: this.ARCConfig }));
        }
    };
    ModelContainer.prototype.delayedFetch = function (_a) {
        var _this = this;
        var _b = _a.skipReFetchStep, skipReFetchStep = _b === void 0 ? false : _b;
        this.delayedTimeout = setTimeout(function () {
            _this.prepareFetch({ skipReFetchStep: skipReFetchStep });
        }, this.ARCConfig.requestFetchDelay);
    };
    ModelContainer.prototype._fetchAuthorization = function (props, _a) {
        var _b = _a.skipReFetchStep, skipReFetchStep = _b === void 0 ? false : _b;
        var metaModel = props.metaModel;
        if (this.isNew(props)) {
            //console.log('//model is new no data to be retrieved')
            return false;
        }
        if (!this.hasRequiredParams(props)) {
            // console.log("// model has not the required params, we don't fetch it")
            return false;
        }
        if (typeof this.core._getModel(metaModel) === "undefined" || !metaModel) {
            // console.log('//model has never been fetch, its ok to fetch')
            return true;
        }
        if (this.core.isSyncing(metaModel)) {
            // console.log('//model seems to be loading we dont allow to fetch it again')
            return false;
        }
        if (!skipReFetchStep &&
            this.core.isLoaded(metaModel) &&
            this.allowReFetch(props)) {
            // console.log('//model seems to be loaded but its ok to re-fetch it')
            return true;
        }
        if (!skipReFetchStep &&
            !!this.core.getError(metaModel) &&
            this.errorReFetch(props)) {
            // console.log('//model had an error previously, but its ok to refetch it')
            return true;
        }
        return false;
    };
    ModelContainer.prototype.componentDidMount = function () {
        this.prepareFetch({ skipReFetchStep: false });
    };
    ModelContainer.prototype.getModelDataTyped = function () {
        var loaded = this.isLoaded();
        var error = this.getError();
        return !error && loaded && !this.isNew() ? this.getModel() : this.ARCConfig.defaultModel;
    };
    ModelContainer.prototype.render = function () {
        var _this = this;
        var _a;
        var props = __assign({}, omit(this.props, ['ARCConfig', 'ARCReducerState', 'component']));
        var loaded = this.isLoaded();
        var loading = this.isSyncing();
        var error = this.getError();
        var data = this.getModelDataTyped();
        var Component = (_a = this.props) === null || _a === void 0 ? void 0 : _a.component;
        if (!Component) {
            console.error('ModelContainer: component prop is required');
            return null;
        }
        var params = this.getParams(props);
        if (!params) {
            console.error('ModelContainer: params are required');
            console.log('missing params for', this.ARCConfig.name);
            console.log(this.core.missingParams(this.ARCConfig, props));
            return null;
        }
        return (React.createElement(Component, __assign({}, props, { loading: loading, loaded: loaded, model: data, error: error, fetch: function () { return _this.fetch(params); } })));
    };
    return ModelContainer;
}(Container));
export { ModelContainer };
