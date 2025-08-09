"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ModelContainer = void 0;
const utils_1 = require("../utils");
const commons_1 = __importDefault(require("../commons"));
const Container_1 = __importDefault(require("./Container"));
const react_1 = __importDefault(require("react"));
const ReduxActions_1 = require("../actions/ReduxActions");
class ModelContainer extends Container_1.default {
    // static propTypes = {
    //   dispatch: PropTypes.func.isRequired,
    //   ARCConfig: PropTypes.object.isRequired,
    // }
    /** PUBLIC ACTIONS METHODS **/
    /* public
     * if the component has not the required params it will be set as new */
    isNew(props = this.props) {
        return this.core.isNew(this.ARCConfig, props);
    }
    /* public
     * returns null or string
     * acts as unique identifier (based on required props) */
    getKey(props = this.props) {
        return this.core.getKey(this.ARCConfig, props);
    }
    /* public
     * retrieve params from props or model */
    /* CUSTOMIZE HERE FOR ADVANCED USAGE */
    getParams(props = this.props) {
        return this.core.getParams(this.ARCConfig, props);
    }
    /* private
     * checks if the component has the required params based on modelProps in config
     */
    hasRequiredParams(props = this.props) {
        return this.core.hasRequiredParams(this.ARCConfig, props);
    }
    /* private
     * get a model and its metas data
     */
    _getModel(props = this.props) {
        return (props).metaModel;
    }
    // checkDispatchAvailability() {
    //   const { dispatch } = this.props
    //   if (!dispatch) {
    //     return new Error("Component is missing dispatch")
    //   }
    //   return dispatch
    // }
    /* public
     * Fetch a model */
    fetch = (params) => {
        this.abortController = new AbortController();
        const axiosOptions = {
            abortController: this.abortController
        };
        const promise = this.props.dispatch(this.actions.fetchOne(params, this.props, axiosOptions));
        promise.catch((e) => {
            if (e.name === ReduxActions_1.AXIOS_CANCEL_PAYLOAD.name && e.code === ReduxActions_1.AXIOS_CANCEL_PAYLOAD.code) {
                return;
            }
            return;
        });
        return promise;
    };
    /** PUBLIC METHODS **/
    /* public
     * returns model (data retrieved from the server) */
    getFetchingCount = () => {
        const { collection } = this.getPropsFromTrueStoreState(this.props);
        return this.core.getFetchingCount(collection);
    };
    getModel(props = this.props) {
        return props.model;
    }
    /* public
     * returns metas (loaded, error, etc.) */
    getMetas(prop, props = this.props) {
        return this.core.getMetas(prop, props.metaModel);
    }
    /* public
     * returns  error */
    getError(props = this.props) {
        return props.error;
    }
    /* public
     * returns bool if there's any activity */
    isSyncing(props = this.props) {
        return props.loading;
    }
    /* public
     * returns bool if the model has been loaded at least one time */
    isLoaded(props = this.props) {
        return props.loaded;
    }
    /* private
     * performs a fetch if the flag fetchOnce is set to false
     */
    allowReFetch = (props = this.props) => {
        const metaModel = props.metaModel;
        return this.core.allowReFetch(this.ARCConfig, metaModel);
    };
    errorReFetch(props = this.props) {
        const metaModel = props.metaModel;
        //can re fetch on error
        return this.core.errorReFetch(this.ARCConfig, metaModel);
    }
    componentDidUpdate() {
        this.prepareFetch({ skipReFetchStep: true });
    }
    prepareFetch({ skipReFetchStep = false }) {
        const props = this.props; //this.getPropsFromTrueStoreState(this.props)
        if (this._fetchAuthorization(props, { skipReFetchStep })) {
            const max = this.ARCConfig.maxPendingRequestsPerReducer;
            if (max && max > -1) {
                const count = this.getFetchingCount();
                if (count > max) {
                    //console.log('too much pending requests', count, 'pending)
                    return this.delayedFetch({ skipReFetchStep });
                }
            }
            const params = this.getParams(props);
            if (!params) {
                console.error('params are missing');
                return;
            }
            this.fetch(params)
                .catch(() => {
                //console.error('fetch error')
                // this.props.dispatch(this.actions.resetTemp())
            });
        }
    }
    componentWillUnmount() {
        clearTimeout(this.delayedTimeout);
        this.delayedTimeout = undefined;
        if (this.abortController) {
            this.abortController.abort(commons_1.default.cancelRequestPayload({ ARCConfig: this.ARCConfig }));
        }
    }
    delayedFetch({ skipReFetchStep = false }) {
        this.delayedTimeout = setTimeout(() => {
            this.prepareFetch({ skipReFetchStep });
        }, this.ARCConfig.requestFetchDelay);
    }
    _fetchAuthorization(props, { skipReFetchStep = false }) {
        const metaModel = props.metaModel;
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
    }
    componentDidMount() {
        this.prepareFetch({ skipReFetchStep: false });
    }
    render() {
        const Component = this.props.component;
        const props = (0, utils_1.omit)(this.props, ['ARCConfig', 'component']);
        if (!Component) {
            console.error('ModelContainer: component prop is required');
            return null;
        }
        const params = this.getParams(this.props);
        if (!params) {
            console.error('ModelContainer: params are required');
            console.log('missing params for', this.ARCConfig.name);
            console.log(this.core.missingParams(this.ARCConfig, this.props));
            return null;
        }
        return (react_1.default.createElement(Component, { ...props, fetch: () => this.fetch(params) }));
    }
}
exports.ModelContainer = ModelContainer;
