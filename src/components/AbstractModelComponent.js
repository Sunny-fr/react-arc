import React from 'react'
import {interpolate, extractParams} from '../utils'
import AbstractComponent from './AbstractComponent'

export class AbstractModelComponent extends AbstractComponent {

    _hasRequiredParams = (props) => {
        const requiredProps = this.ARCConfig.modelProps
        return requiredProps.reduce((valid, prop) => (valid === true && props[prop] ? valid : false)
            , true)
    }

    /** CUSTOMIZE HERE FOR ADVANCED USAGE **/
    getParams = (props) => {
        const source = props || this.props
        if (!this._hasRequiredParams(source)) return null
        return extractParams(this.ARCConfig.modelProps, source)
    }

    /* ACTIONS */

    fetch = (params) => {
        this.props.dispatch(this.actions.fetchOne(params))
    }

    /* ACTIONS */

    _getModel(newProps) {
        const props = newProps || this.props
        return this.isNew(props) ? props.tempModel : props.collection[this.getKey(props)]
    }

    isNew(props) {
        return !this.getKey(props)
    }

    getKey(props) {
        const params = this.getParams(props || this.props)
        return !params ? null : interpolate(null, params)
    }

    getModel(props) {
        return this._getModel(props).model
    }

    getMetas(prop, newProps) {
        if (!this._getModel(newProps)) return null;
        return prop ? this._getModel(newProps).metas[prop] : this._getModel(newProps).metas
    }

    gotError(props) {
        return !!this.getMetas('error', props || this.props)
    }

    isFetching(props) {
        return this.getMetas('fetching', props)
    }

    isLoaded(props) {
        if (this.isNew(props)) return true;
        return !(!this._getModel(props) || !this.getMetas('loaded', props))
    }

    canUpdate(_props) {
        const props = _props || this.props
        //console.log(this.getKey(props),'is new',this.isNew(props), 'is loaded',this.isLoaded(props), 'is fetching', this.isFetching(props), 'issued',  this.gotError(props))
        return !this.isNew(props) && !this.isLoaded(props) && !this.isFetching(props) && !this.gotError(props)
    }

    componentWillReceiveProps(props) {
        if (this.canUpdate(props)) this.fetch(this.getParams(props))
    }

    componentWillMount() {
        //fetch once :
        //if (this.canUpdate()) this.fetch(this.getParams())
        //always refetch
        if (!this.isNew(this.props)) this.fetch(this.getParams())
    }
}

export default AbstractModelComponent
