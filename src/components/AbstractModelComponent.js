import React from 'react'
import {interpolate, extractParams} from '../utils'
import AbstractComponent from './AbstractComponent'

export class AbstractModelComponent extends AbstractComponent {

    /** PUBLIC ACTIONS METHODS **/

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
        const isNew = this.isNew()
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
     * retrieve params from props or model */
    /* CUSTOMIZE HERE FOR ADVANCED USAGE */
    getParams = (props) => {
        const source = props || this.props
        if (!this._hasRequiredParams(source)) return null
        return extractParams(this.ARCConfig.modelProps, source)
    }

    /* public
     * if the component has not the required params it will be set as new */
    isNew(props) {
        return !this.getKey(props)
    }

    /* public
     * returns null or string
     * acts as unique identifier (based on required props) */
    getKey(props) {
        const params = this.getParams(props || this.props)
        return !params ? null : interpolate(null, params)
    }

    /* public
     * returns model (data retrieved from the server) */
    getModel(props) {
        return this._getModel(props).model
    }

    /* public
     * returns metas (loaded, error, etc.) */
    getMetas(prop, newProps) {
        if (!this._getModel(newProps)) return null;
        return prop ? this._getModel(newProps).metas[prop] : this._getModel(newProps).metas
    }

    /* public
     * returns  error */
    getError(props) {
        return this.getMetas('error', props || this.props)
    }

    /* public
     * returns bool if there's any activity */
    isSyncing(props) {
        return this.getMetas('fetching', props || this.props)
    }

    /* public
     * returns bool if the model has been loaded at least one time */
    isLoaded(props) {
        if (this.isNew(props)) return true;
        return !(!this._getModel(props) || !this.getMetas('loaded', props))
    }

    /* private
     * get a model an its metas data
     */
    _getModel(newProps) {
        const props = newProps || this.props
        return this.isNew(props) ? props.tempModel : props.collection[this.getKey(props)]
    }

    /* private
     * performs a fetch if the flag fetchOnce is set to false
     */
    _allowRefetch = (_props) => {
        const props = _props || this.props
        return !(this.ARCConfig.fetchOnce && this.isLoaded(props))
    }

    /* private
     * checks if the component has the required params based on modelProps in config
     */
    _hasRequiredParams = (props) => {
        const requiredProps = this.ARCConfig.modelProps
        return requiredProps.reduce((valid, prop) => (valid === true && props[prop] ? valid : false)
            , true)
    }

    /* private
     * detects if we need to fetch again
     */
    _canUpdate(_props) {
        const props = _props || this.props
        //console.log(this.getKey(props),'is new',this.isNew(props), 'is loaded',this.isLoaded(props), 'is fetching', this.isSyncing(props), 'issued',  this.getError(props))
        return !this.isNew(props) && !this.isLoaded(props) && !this.isSyncing(props) && !this.getError(props)
    }

    componentWillReceiveProps(props) {
        if (this._canUpdate(props)) this.fetch(this.getParams(props))
    }

    _errorRefetch() {
        return !(this.ARCConfig.refetchOnError && this.getError())
    }

    componentWillMount() {
        if (!this.isNew(this.props) && this._allowRefetch() && this._errorRefetch()) this.fetch(this.getParams())
    }
}

export default AbstractModelComponent
