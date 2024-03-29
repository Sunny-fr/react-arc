import React from "react"
import { flatten, extractParams } from "../utils"
import AbstractContainer from "./AbstractContainer"
import commons from "../commons"

export class AbstractCollectionContainer extends AbstractContainer {
  /** PUBLIC ACTIONS METHODS **/

  /* Collection related actions */

  /* public
   * Fetch a collection */
  fetch = (props) => {
    const axiosOptions = {}
    const promise = this.props.dispatch(
      this.actions.fetchAll(
        extractParams(this.ARCConfig.collectionProps, props || this.props),
        props || this.props,
        axiosOptions
      )
    )
    this.arcCancelPendingRequest = axiosOptions.cancel
    promise.catch((e) => {
      /* do something */
    })
    return promise
  }

  /* Models related actions */

  removeModel = (model) => {
    const params = extractParams(this.ARCConfig.modelProps, model)
    this.props.dispatch(this.actions.remove(params, this.props))
  }

  editModel = (model) => {
    const params = extractParams(this.ARCConfig.modelProps, model)
    this.props.dispatch(this.actions.edit(model, params))
  }

  /** PUBLIC METHODS **/

  /* public
   * returns a list of models */
  getCollection() {
    return flatten(this.props.collection)
  }

  /* public
   * returns a list of models and their metas */
  getFullCollection() {
    return flatten(this.props.collection, true)
  }

  /*  public
   * no errors returns null/false
   * or it will return this axios response */

  getError(props) {
    return this.core.getCollectionError(this.ARCConfig, props || this.props)
  }

  /* public
   * is the collection loaded at least one time ? */
  isLoaded(props) {
    return this.core.isCollectionLoaded(this.ARCConfig, props || this.props)
  }

  /* public
   * is there any activity ? loading
   * or syncing (~means that the collection has been loaded once and we're refetching it) */

  isSyncing(props) {
    return this.core.isCollectionSyncing(this.ARCConfig, props || this.props)
  }

  errorReFetch(props) {
    //can re fetch on error
    return this.core.errorReFetch(this.ARCConfig, props || this.props)
  }

  /* private
   * performs a fetch if the flag fetchOnce is set to false
   */

  _allowReFetch = (props) => {
    return this.core.allowCollectionReFetch(this.ARCConfig, props || this.props)
  }

  _fetchAuthorization(props, { skipReFetchStep = false }) {
    if (this.isSyncing(props)) {
      //console.log('//collection seems to be loading we dont allow to fetch it again')
      return false
    }

    if (!this.isLoaded(props)) {
      //console.log('//collection has never been fetch, its ok to fetch')
      return true
    }

    if (!skipReFetchStep && this._allowReFetch(props)) {
      //console.log('//collection seems to be loaded but its ok to re-fetch it')
      return true
    }

    if (!skipReFetchStep && this.errorReFetch(props)) {
      //console.log('//collection had an error previously, but its ok to re-fetch it')
      return true
    }
  }

  componentDidUpdate() {
    const props = this.getPropsFromTrueStoreState()
    if (this._fetchAuthorization(props, { skipReFetchStep: true })) this.fetch()
  }

  componentDidMount() {
    const props = this.getPropsFromTrueStoreState()
    if (this._fetchAuthorization(props, {})) this.fetch()
  }
  componentWillUnmount() {
    if (this.arcCancelPendingRequest) {
      this.arcCancelPendingRequest(
        commons.cancelRequestPayload({ ARCConfig: this.ARCConfig })
      )
    }
  }
}

export default AbstractCollectionContainer
