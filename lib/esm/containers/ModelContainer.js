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
import { getParams, omit } from "../utils";
import commons from "../commons";
import Container from "./Container";
import React from "react";
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
            // const dispatch = this.checkDispatchAvailability()
            // if (!dispatch) return
            _this.abortController = new AbortController();
            var axiosOptions = {
                abortController: _this.abortController
            };
            var promise = _this.props.dispatch(_this.actions.fetchOne(params, _this.props, axiosOptions));
            // promise.catch((e) => {
            //   /* */
            // })
            return promise;
        };
        /* public
         * edit a model without sending it to the server */
        _this.edit = function (model) {
            var params = _this.getParams();
            if (!params)
                return;
            _this.props.dispatch(_this.actions.edit(model, params));
        };
        /* public
         * save a model */
        _this.save = function () {
            var isNew = _this.isNew(_this.props);
            var model = _this.getModel();
            var extracted = getParams(_this.ARCConfig, _this.props);
            var params = __assign(__assign({}, extracted), (isNew ? _this.getParams(model || undefined) : _this.getParams()));
            _this.props.dispatch(_this.actions.save(model || {}, params, isNew, _this.props));
        };
        /* public
         * deletes a model */
        _this.remove = function () {
            if (_this.isNew())
                _this.resetTempModel();
            else {
                var params = _this.getParams();
                _this.props.dispatch(_this.actions.remove(params || {}, _this.props));
            }
        };
        /* public
         * resets the temp model (clearing forms etc..) */
        _this.resetTempModel = function () {
            _this.props.dispatch(_this.actions.resetTemp());
        };
        /** PUBLIC METHODS **/
        /* public
         * returns model (data retrieved from the server) */
        _this.getFetchingCount = function () {
            //props || this.props
            var collection = _this.getPropsFromTrueStoreState(_this.props).collection;
            return _this.core.getFetchingCount(__assign(__assign({}, _this.props), { collection: collection }));
        };
        /* private
         * performs a fetch if the flag fetchOnce is set to false
         */
        _this.allowReFetch = function (props) {
            return _this.core.allowReFetch(_this.ARCConfig, props || _this.props);
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
     * get a model an its metas data
     */
    ModelContainer.prototype._getModel = function (props) {
        //return (props || this.props).metaModel
        return this.core._getModel(this.ARCConfig, props || this.props);
    };
    ModelContainer.prototype.getModel = function (props) {
        return (props || this.props).model;
    };
    /* public
     * returns metas (loaded, error, etc.) */
    ModelContainer.prototype.getMetas = function (prop, props) {
        var metas = (props || this.props).metas;
        if (!metas) {
            return metas;
        }
        return !!prop ? metas[prop] : metas;
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
        //can re fetch on error
        return this.core.errorReFetch(this.ARCConfig, props || this.props);
    };
    ModelContainer.prototype.componentDidUpdate = function () {
        this.prepareFetch({ skipReFetchStep: true });
    };
    ModelContainer.prototype.prepareFetch = function (_a) {
        var _b = _a.skipReFetchStep, skipReFetchStep = _b === void 0 ? false : _b;
        var props = this.getPropsFromTrueStoreState(this.props);
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
            this.fetch(params);
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
        if (this.isNew(props)) {
            //console.log('//model is new no data to be retrieved')
            return false;
        }
        if (!this.hasRequiredParams(props)) {
            // console.log("// model has not the required params, we don't fetch it")
            return false;
        }
        if (typeof this.core._getModel(this.ARCConfig, props) === "undefined") {
            // console.log('//model has never been fetch, its ok to fetch')
            return true;
        }
        if (this.core.isSyncing(this.ARCConfig, props)) {
            // console.log('//model seems to be loading we dont allow to fetch it again')
            return false;
        }
        if (!skipReFetchStep &&
            this.core.isLoaded(this.ARCConfig, props) &&
            this.allowReFetch(props)) {
            // console.log('//model seems to be loaded but its ok to re-fetch it')
            return true;
        }
        if (!skipReFetchStep &&
            !!this.core.getError(this.ARCConfig, props) &&
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
        var Component = this.props.component;
        var props = __assign({}, omit(this.props, ['ARCConfig', 'component']));
        var loaded = this.isLoaded();
        var loading = this.isSyncing();
        var error = this.getError();
        var data = this.getModelDataTyped();
        if (!Component) {
            console.error('ModelContainer: component prop is required');
            return null;
        }
        var params = this.getParams(props);
        if (!params) {
            console.error('ModelContainer: params are required');
            return null;
        }
        return (React.createElement(Component, __assign({}, props, { loading: loading, loaded: loaded, model: data, error: error, fetch: function () { return _this.fetch(params); } })));
    };
    return ModelContainer;
}(Container));
export { ModelContainer };
