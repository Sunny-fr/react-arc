import React from 'react'
import AbstractContainer from './AbstractContainer'
import {changedProps} from '../utils/index'
import equal from 'deep-equal'



export class AbstractModelContainer extends AbstractContainer {

    /** PUBLIC ACTIONS METHODS **/

    /* public
     * if the component has not the required params it will be set as new */
    isNew(props) {
        return this.core.isNew(this.ARCConfig, props || this.props)
    }

    /* public
     * returns null or string
     * acts as unique identifier (based on required props) */
    getKey(props) {
        return this.core.getKey(this.ARCConfig, props || this.props)
    }

    /* public
     * retrieve params from props or model */
    /* CUSTOMIZE HERE FOR ADVANCED USAGE */
    getParams(props) {
        return this.core.getParams(this.ARCConfig, props || this.props)
    }

    /* private
     * checks if the component has the required params based on modelProps in config
     */
    hasRequiredParams(props) {
        return this.core.hasRequiredParams(this.ARCConfig, props || this.props)
    }

    /* private
     * get a model an its metas data
     */

    _getModel(props) {
        return this.core._getModel(this.ARCConfig, props || this.props)
    }

    /* public
     * Fetch a model */
    fetch = (params) => {
        this.props.dispatch(this.actions.fetchOne(params))
    }

    /* public
     * edit a model without sending it to the server */
    edit = (model) => {
        this.props.dispatch(this.actions.edit(model, this.getParams()))
    }

    /* public
     * save a model */
    save = () => {
        const isNew = this.isNew(this.props)
        const model = this.getModel()
        const params = isNew ? this.getParams(model) : this.getParams()
        this.props.dispatch(this.actions.save(model, params, isNew))
    }

    /* public
     * deletes a model */
    remove = () => {
        if (this.isNew()) this.resetTempModel()
        else {
            const params = this.getParams()
            this.props.dispatch(this.actions.remove(params))
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

    getModel(props) {
        return this.core.getModel(this.ARCConfig, props || this.props)
    }

    /* public
     * returns metas (loaded, error, etc.) */

    getMetas(prop, props) {
        return this.core.getMetas(this.ARCConfig, prop, props || this.props)
    }

    /* public
     * returns  error */

    getError(props) {
        return this.core.getError(this.ARCConfig, props || this.props)
    }

    /* public
     * returns bool if there's any activity */

    isSyncing(props) {
        return this.core.isSyncing(this.ARCConfig, props || this.props)
    }

    /* public
     * returns bool if the model has been loaded at least one time */

    isLoaded(props) {
        return this.core.isLoaded(this.ARCConfig, props || this.props)
    }

    /* private
     * performs a fetch if the flag fetchOnce is set to false
     */

    allowReFetch = (props) => {
        return this.core.allowReFetch(this.ARCConfig, props || this.props)
    }

    errorReFetch(props) {
        //can re fetch on error
        return this.core.errorReFetch(this.ARCConfig, props || this.props)
    }


    componentDidUpdate() {
        const props = this.getPropsFromTrueStoreState(this.props)
        if (this._fetchAuthorization(props, {skipReFetchStep: true})) {
            this.fetch(this.getParams())
        }
    }

    _fetchAuthorization(props, {skipReFetchStep = false}) {
        if (this.isNew(props)) {
            console.log('//model is new no data to be retrieved')
            return false
        }

        if (typeof this._getModel(props) === 'undefined') {
            console.log('//model has never been fetch, its ok to fetch')
            return true
        }

        if (this.isSyncing(props)) {
            console.log('//model seems to be loading we dont allow to fetch it again')
            return false
        }

        if (!skipReFetchStep && this.allowReFetch(props)) {
            console.log('//model seems to be loaded but its ok to re-fetch it')
            return true
        }

        if (!skipReFetchStep && this.errorReFetch(props)) {
            console.log('//model had an error previously, but its ok to refetch it')
            return true
        }

        return false
    }

    componentDidMount() {
        const props = this.getPropsFromTrueStoreState(this.props)
        if (this._fetchAuthorization(props, {})) {
            this.fetch(this.getParams())
        }
    }

    shouldComponentUpdate(nextProps, nextState) {

        if (typeof nextProps !== typeof this.props || typeof nextState !== typeof this.state) return true

        const propsThatChanged = changedProps(this.props, nextProps)
        const statesThatChanged = changedProps(this.state, nextState)


        if (statesThatChanged.length === 0 && propsThatChanged.length === 0) return false

        //if (!this.isCollectionLoaded(this.props) || !this._getModel(nextProps)) return true

        if (propsThatChanged.length === 1 && propsThatChanged.includes('collection')) {
            const prevModel = this._getModel(this.props)
            const nextModel = this._getModel(nextProps)
            return !equal(prevModel, nextModel)
        }


        return statesThatChanged.length > 0 || propsThatChanged.length > 0
    }
}

export default AbstractModelContainer
