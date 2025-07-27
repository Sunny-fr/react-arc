import {getParams, omit} from "../utils"
import commons from "../commons"
import Container from "./Container"
//import PropTypes from "prop-types"
import {
  ARCContainerProps,
  ARCWrappedComponentProps,
  ComponentProps,
  ComponentPropsWithRequiredModelParams,
  ComponentWithStoreProps,
} from "../types/components.types"
import { ARCAxiosOptions } from "../types/actions.types"
import {ARCMetas} from "../types/model.types";
import React from "react"

// import {changedProps} from '../utils/index'
// import equal from 'deep-equal'

type AnyArcComponentProps<Model> = ComponentWithStoreProps<Model> | ARCContainerProps<Model>

export class ModelContainer<P, S, Model> extends Container<P,S, Model> {

  // static propTypes = {
  //   dispatch: PropTypes.func.isRequired,
  //   ARCConfig: PropTypes.object.isRequired,
  // }

  /** PUBLIC ACTIONS METHODS **/

  /* public
   * if the component has not the required params it will be set as new */
  isNew(props?: ComponentProps) {
    //return (props || this.props).isNew
    return this.core.isNew(this.ARCConfig, props || this.props)
  }

  /* public
   * returns null or string
   * acts as unique identifier (based on required props) */
  getKey(props?: ComponentProps) {
    return this.core.getKey(this.ARCConfig, props || this.props)
  }

  /* public
   * retrieve params from props or model */
  /* CUSTOMIZE HERE FOR ADVANCED USAGE */
  getParams(props?: ComponentProps) {
    return this.core.getParams(this.ARCConfig, props || this.props)
  }

  /* private
   * checks if the component has the required params based on modelProps in config
   */
  hasRequiredParams(props?: ComponentProps) {
    return this.core.hasRequiredParams(this.ARCConfig, props || this.props)
  }

  /* private
   * get a model an its metas data
   */

  _getModel(props?: AnyArcComponentProps<Model>) {
    //return (props || this.props).metaModel
    return this.core._getModel(this.ARCConfig, props || this.props)
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
  fetch = (params: ComponentPropsWithRequiredModelParams) => {

    // const dispatch = this.checkDispatchAvailability()
    // if (!dispatch) return
    this.abortController = new AbortController()
    const axiosOptions: ARCAxiosOptions<Model> = {
      abortController: this.abortController
    }


    const promise = this.props.dispatch(
      this.actions.fetchOne(params, this.props, axiosOptions)
    )

    promise.catch((e:any) => {
      if (e.name === 'AbortError') {
        //console.warn('ModelContainer: fetch aborted', e)
        return Promise.reject({
          message: 'Fetch aborted',
          ARCConfig: this.ARCConfig,
        })
      }
      return Promise.reject({
        message: 'Fetch error',
        ARCConfig: this.ARCConfig,
        error: e,
      })
    })
    return promise
  }

  /* public
   * edit a model without sending it to the server */
  edit = (model: object) => {
    const params = this.getParams()
    if (!params) return
    this.props.dispatch(this.actions.edit(model, params))
  }

  /* public
   * save a model */
  save = () => {
    const isNew = this.isNew(this.props)
    const model = this.getModel()
    const extracted = getParams(this.ARCConfig, this.props)
    const params = {
      ...extracted,
      ...(isNew ? this.getParams(model || undefined) : this.getParams()),
    }
    this.props.dispatch(this.actions.save(model || {}, params, isNew, this.props))
  }

  /* public
   * deletes a model */
  remove = () => {
    if (this.isNew()) this.resetTempModel()
    else {
      const params = this.getParams()
      this.props.dispatch(this.actions.remove(params ||{}, this.props))
    }
  }

  /* public
   * resets the temp model (clearing forms etc..) */
  resetTempModel = () => {
    this.props.dispatch(this.actions.resetTemp())
  }

  /** PUBLIC METHODS **/

  /* public
   * returns model (data retrieved from the server) */

  getFetchingCount = () => {
    //props || this.props
    const { collection } = this.getPropsFromTrueStoreState(this.props)
    return this.core.getFetchingCount({ ...this.props, collection })
  }

  getModel(props?:  ARCWrappedComponentProps<Model>) {
    return (props || this.props).model
  }

  /* public
   * returns metas (loaded, error, etc.) */

  getMetas(prop:keyof ARCMetas, props?: ARCWrappedComponentProps<Model>) {
    const metas = (props || this.props).metas
    if(!metas) {
      return metas
    }
    return !!prop ? metas[prop] : metas
  }

  /* public
   * returns  error */

  getError(props?: ARCWrappedComponentProps<Model>) {
    return (props || this.props).error
  }

  /* public
   * returns bool if there's any activity */

  isSyncing(props?: ARCWrappedComponentProps<Model>) {
    return (props || this.props).syncing
  }

  /* public
   * returns bool if the model has been loaded at least one time */

  isLoaded(props?: ARCWrappedComponentProps<Model>) {
    return (props || this.props).loaded
  }

  /* private
   * performs a fetch if the flag fetchOnce is set to false
   */

  allowReFetch = (props?: ComponentWithStoreProps<Model>) => {
    return this.core.allowReFetch(this.ARCConfig, props || this.props)
  }

  errorReFetch(props?: ComponentWithStoreProps<Model>) {
    //can re fetch on error
    return this.core.errorReFetch(this.ARCConfig, props || this.props)
  }

  componentDidUpdate() {
    this.prepareFetch({ skipReFetchStep: true })
  }

  prepareFetch({ skipReFetchStep = false }) {
    const props = this.getPropsFromTrueStoreState(this.props)
    if (this._fetchAuthorization(props, { skipReFetchStep })) {
      const max = this.ARCConfig.maxPendingRequestsPerReducer
      if (max && max > -1) {
        const count = this.getFetchingCount()
        if (count > max) {
          //console.log('too much pending requests', count, 'pending)
          return this.delayedFetch({ skipReFetchStep })
        }
      }
      const params = this.getParams(props)
      if(!params) {
        console.error('params are missing')
        return
      }
      this.fetch(params)
    }
  }

  componentWillUnmount() {
    clearTimeout(this.delayedTimeout)
    this.delayedTimeout = undefined
    if (this.abortController) {
      this.abortController.abort(commons.cancelRequestPayload({ ARCConfig: this.ARCConfig }))
    }
  }

  delayedFetch({ skipReFetchStep = false }) {
    this.delayedTimeout = setTimeout(() => {
      this.prepareFetch({ skipReFetchStep })
    }, this.ARCConfig.requestFetchDelay)
  }

  _fetchAuthorization(props:ComponentWithStoreProps<Model>, { skipReFetchStep = false }) {
    if (this.isNew(props)) {
      //console.log('//model is new no data to be retrieved')
      return false
    }

    if (!this.hasRequiredParams(props)) {
      // console.log("// model has not the required params, we don't fetch it")
      return false
    }

    if (typeof this.core._getModel(this.ARCConfig, props) === "undefined") {
      // console.log('//model has never been fetch, its ok to fetch')
      return true
    }

    if (this.core.isSyncing(this.ARCConfig, props)) {
      // console.log('//model seems to be loading we dont allow to fetch it again')
      return false
    }

    if (
      !skipReFetchStep &&
      this.core.isLoaded(this.ARCConfig, props) &&
      this.allowReFetch(props)
    ) {
      // console.log('//model seems to be loaded but its ok to re-fetch it')
      return true
    }

    if (
      !skipReFetchStep &&
      !!this.core.getError(this.ARCConfig, props) &&
      this.errorReFetch(props)
    ) {
      // console.log('//model had an error previously, but its ok to refetch it')
      return true
    }

    return false
  }

  componentDidMount() {
    this.prepareFetch({ skipReFetchStep: false })
  }


  getModelDataTyped() {
    const loaded = this.isLoaded()
    const error = this.getError()
    return !error && loaded && !this.isNew() ? this.getModel() : this.ARCConfig.defaultModel
  }
  render() {

    const Component = this.props.component as React.ComponentType<any>
    const props = { ...omit(this.props, ['ARCConfig', 'component']) }
    const loaded = this.isLoaded()
    const loading = this.isSyncing()
    const error = this.getError()

    const data = this.getModelDataTyped()
    if( !Component ) {
      console.error('ModelContainer: component prop is required')
      return null
    }
    const params = this.getParams(props)
    if(!params){
      console.error('ModelContainer: params are required')
      return null
    }

    return (
      <Component
        {...props}
        loading={loading}
        loaded={loaded}
        model={data}
        error={error}
        fetch={() => this.fetch(params)}
      />
    )
  }

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


