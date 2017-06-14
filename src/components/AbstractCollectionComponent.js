import React from 'react'
import {flatten, extractParams} from '../utils'
import AbstractComponent from './AbstractComponent'


export class AbstractCollectionComponent extends AbstractComponent {

    /** PUBLIC ACTIONS METHODS **/

    /* Collection related actions */

    /* public
     * Fetch a collection */
    fetch = (newProps) => {
        const props = newProps || this.props
        this.props.dispatch(this.actions.fetchAll(extractParams(this.ARCConfig.collectionProps, props)))
    }

    /* Models related actions */

    removeModel = (model) => {
        const params = extractParams(this.ARCConfig.modelProps, model)
        this.props.dispatch(this.actions.remove(params))
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
    getError(_props) {
        const props = _props || this.props
        return props.error
    }

    /* public
     * is the collection loaded at least one time ? */
    isLoaded (){
        return this.props.loaded
    }

    /* public
     * is there any activity ? loading
     * or syncing (~means that the collection has been loaded once and we're refetching it) */
    isSyncing () {
        return this.props.fetching
    }

    /* private
     * performs a fetch if the flag fetchOnce is set to false
     */

    //TODO ADD isFetching check
    _allowRefetch = (_props) => {
        const props = _props || this.props
        return !(this.ARCConfig.fetchOnce && this.isLoaded(props))
    }

    componentWillMount (){
        if (this._allowRefetch()) this.fetch()
    }
}
export default AbstractCollectionComponent