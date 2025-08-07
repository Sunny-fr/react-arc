import { omit } from "../utils";
import commons from "../commons";
import Container from "./Container";
import React from "react";
import { AXIOS_CANCEL_PAYLOAD } from "../actions/ReduxActions";
export class ModelContainer extends Container {
    // static propTypes = {
    //   dispatch: PropTypes.func.isRequired,
    //   ARCConfig: PropTypes.object.isRequired,
    // }
    /** PUBLIC ACTIONS METHODS **/
    /* public
     * if the component has not the required params it will be set as new */
    isNew(props) {
        //return (props || this.props).isNew
        return this.core.isNew(this.ARCConfig, props || this.props);
    }
    /* public
     * returns null or string
     * acts as unique identifier (based on required props) */
    getKey(props) {
        return this.core.getKey(this.ARCConfig, props || this.props);
    }
    /* public
     * retrieve params from props or model */
    /* CUSTOMIZE HERE FOR ADVANCED USAGE */
    getParams(props) {
        return this.core.getParams(this.ARCConfig, props || this.props);
    }
    /* private
     * checks if the component has the required params based on modelProps in config
     */
    hasRequiredParams(props) {
        return this.core.hasRequiredParams(this.ARCConfig, props || this.props);
    }
    /* private
     * get a model and its metas data
     */
    _getModel(props) {
        return (props || this.props).metaModel;
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
            if (e.name === AXIOS_CANCEL_PAYLOAD.name && e.code === AXIOS_CANCEL_PAYLOAD.code) {
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
    getModel(props) {
        return (props || this.props).model;
    }
    /* public
     * returns metas (loaded, error, etc.) */
    getMetas(prop, props) {
        return this.core.getMetas(prop, (props || this.props).metaModel);
    }
    /* public
     * returns  error */
    getError(props) {
        return (props || this.props).error;
    }
    /* public
     * returns bool if there's any activity */
    isSyncing(props) {
        return (props || this.props).loading;
    }
    /* public
     * returns bool if the model has been loaded at least one time */
    isLoaded(props) {
        return (props || this.props).loaded;
    }
    /* private
     * performs a fetch if the flag fetchOnce is set to false
     */
    allowReFetch = (props) => {
        const metaModel = (props || this.props).metaModel;
        return this.core.allowReFetch(this.ARCConfig, metaModel);
    };
    errorReFetch(props) {
        const metaModel = (props || this.props).metaModel;
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
            this.abortController.abort(commons.cancelRequestPayload({ ARCConfig: this.ARCConfig }));
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
    getModelDataTyped() {
        const loaded = this.isLoaded();
        const error = this.getError();
        return !error && loaded && !this.isNew() ? this.getModel() : (this.ARCConfig.defaultModel || null);
    }
    render() {
        const props = { ...omit(this.props, ['ARCConfig', 'component']) };
        const loaded = this.isLoaded();
        const loading = this.isSyncing();
        const error = this.getError();
        const data = this.getModelDataTyped();
        const Component = this.props?.component;
        if (!Component) {
            console.error('ModelContainer: component prop is required');
            return null;
        }
        const params = this.getParams(props);
        if (!params) {
            console.error('ModelContainer: params are required');
            console.log('missing params for', this.ARCConfig.name);
            console.log(this.core.missingParams(this.ARCConfig, props));
            return null;
        }
        return (React.createElement(Component, { ...props, loading: loading, loaded: loaded, model: data, error: error, fetch: () => this.fetch(params) }));
    }
}
