import React from 'react'
import {interpolate, extractParams} from '../utils'
import AbstractContainer from './AbstractContainer'
import {changedProps} from '../utils/index'
import equal from 'deep-equal'


export class AbstractModelContainer extends AbstractContainer {

    /** PUBLIC ACTIONS METHODS **/

    /* public
     * if the component has not the required params it will be set as new */
    static isNew(ARCConfig, props) {
        return !AbstractModelContainer.getKey(ARCConfig, props)
    }

    isNew(props) {
        return AbstractModelContainer.isNew(this.ARCConfig, props || this.props)
    }

    /* public
     * returns null or string
     * acts as unique identifier (based on required props) */
    static getKey(ARCConfig, props) {
        const params = AbstractModelContainer.getParams(ARCConfig, props)
        return !params ? null : interpolate(null, params)
    }

    getKey(props) {
        return AbstractModelContainer.getKey(this.ARCConfig, props || this.props)
    }

    /* public
     * retrieve params from props or model */

    /* CUSTOMIZE HERE FOR ADVANCED USAGE */
    static getParams(ARCConfig, props) {
        if (!AbstractModelContainer._hasRequiredParams(ARCConfig, props)) return null
        return extractParams(ARCConfig.modelProps, props)
    }

    getParams(props) {
        return AbstractModelContainer.getParams(this.ARCConfig, props || this.props)
    }


    /* private
     * checks if the component has the required params based on modelProps in config
     */
    static _hasRequiredParams(ARCConfig, props) {
        const result = ARCConfig.modelProps.reduce((valid, prop) => (valid === true && typeof props[prop] !== 'undefined' ? valid : false)
            , true)
        //if (!result) console.log('missing required params', ARCConfig.modelProps, props)
        return result
    }

    _hasRequiredParams(ARCConfig, props) {
        return AbstractModelContainer._hasRequiredParams(this.ARCConfig, props || this.props)
    }


    /* private
     * get a model an its metas data
     */
    static _getModel(ARCConfig, props) {
        return AbstractModelContainer.isNew(ARCConfig, props) ? props.tempModel : props.collection[AbstractModelContainer.getKey(ARCConfig, props)]
    }

    _getModel(props) {
        return AbstractModelContainer._getModel(this.ARCConfig, props || this.props)
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
        const isNew = AbstractModelContainer.isNew(this.props)
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
    static getModel(ARCConfig, props) {
        return AbstractModelContainer._getModel(ARCConfig, props).model
    }

    getModel(props) {
        return AbstractModelContainer.getModel(this.ARCConfig, props || this.props)
    }

    /* public
     * returns metas (loaded, error, etc.) */
    static getMetas(ARCConfig, prop, props) {
        if (!AbstractModelContainer._getModel(ARCConfig, props)) return null
        return prop ? AbstractModelContainer._getModel(ARCConfig, props).metas[prop] : AbstractModelContainer._getModel(ARCConfig, props).metas
    }

    getMetas(prop, props) {
        return AbstractModelContainer.getMetas(this.ARCConfig, prop, props || this.props)
    }

    /* public
     * returns  error */
    static getError(ARCConfig, props) {
        return AbstractModelContainer.getMetas(ARCConfig, 'error', props)
    }

    getError(props) {
        return AbstractModelContainer.getError(this.ARCConfig, props || this.props)
    }

    /* public
     * returns bool if there's any activity */
    static isSyncing(ARCConfig, props) {
        return AbstractModelContainer.getMetas(ARCConfig, 'fetching', props)
    }

    isSyncing(props) {
        return AbstractModelContainer.isSyncing(this.ARCConfig, props || this.props)
    }

    /* public
     * returns bool if the model has been loaded at least one time */
    static isLoaded(ARCConfig, props) {
        if (AbstractModelContainer.isNew(ARCConfig, props)) return true
        return !(!AbstractModelContainer._getModel(ARCConfig, props) || !AbstractModelContainer.getMetas(ARCConfig, 'loaded', props))
    }

    isLoaded(props) {
        return AbstractModelContainer.isLoaded(this.ARCConfig, props || this.props)
    }

    /* private
     * performs a fetch if the flag fetchOnce is set to false
     */
    static _allowReFetch(ARCConfig, props) {
        return !(ARCConfig.fetchOnce && AbstractModelContainer.isLoaded(ARCConfig, props))
    }

    _allowReFetch = (props) => {
        return AbstractModelContainer._allowReFetch(this.ARCConfig, props || this.props)
    }

    static _errorReFetch(ARCConfig, props) {
        //canReFetchOnerror
        if (ARCConfig.refetchOnError === true && !AbstractModelContainer.isSyncing(ARCConfig, props) && !AbstractModelContainer.isLoaded(ARCConfig, props) && !!AbstractModelContainer.getError(ARCConfig, props)) return true
        return !AbstractModelContainer.getError(ARCConfig, props)
    }

    _errorReFetch(props) {
        //can re fetch on error
        return AbstractModelContainer._errorReFetch(this.ARCConfig, props || this.props)
    }



    componentDidUpdate(){
        const props = this._getPropsFromTrueStoreState(this.props)
        if (this._fetchAuthorization(props, {skipReFetchStep: true})){
            this.fetch(this.getParams())
        }
    }

    _fetchAuthorization(props, {skipReFetchStep = false}){
        if (this.isNew(props)) {
            //console.log('//model is new no data to be retrieved')
            return false
        }

        if (typeof this._getModel(props) ==='undefined') {
            //console.log('//model has never been fetch, its ok to fetch')
            return true
        }

        if (this.isSyncing(props)) {
            //console.log('//model seems to be loading we dont allow to fetch it again')
            return false
        }

        if (!skipReFetchStep && this._allowReFetch(props)) {
            //console.log('//model seems to be loaded but its ok to re-fetch it')
            return true
        }

        if (!skipReFetchStep && this._errorReFetch(props)) {
            //console.log('//model had an error previously, but its ok to refetch it')
            return true
        }
    }

    componentDidMount() {
        const props = this._getPropsFromTrueStoreState(this.props)
        if (this._fetchAuthorization(props, {})){
            this.fetch(this.getParams())
        }
    }

    shouldComponentUpdate(nextProps, nextState) {

        if (typeof nextProps !== typeof this.props || typeof nextState !== typeof this.state) return true

        const propsThatChanged = changedProps(this.props, nextProps)
        const statesThatChanged = changedProps(this.state, nextState)


        if (statesThatChanged.length === 0 && propsThatChanged.length === 0) return false

        //if (!this.isLoaded(this.props) || !this._getModel(nextProps)) return true

        if (propsThatChanged.length === 1 && propsThatChanged.includes('collection')) {
            const prevModel = this._getModel(this.props)
            const nextModel = this._getModel(nextProps)
            return !equal(prevModel, nextModel)
        }


        return statesThatChanged.length > 0 || propsThatChanged.length > 0
    }
}

export default AbstractModelContainer
