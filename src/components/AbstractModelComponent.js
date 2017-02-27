import React from 'react'
import {interpolate} from '../actions/ReduxActionsList'
import AbstractComponent from './AbstractComponent'

export class AbstractModelComponent extends AbstractComponent {

    /** CUSTOMIZE HERE **/
    getParams = (props) => {
        const source = props || this.props
        //if (!source.id) return null
        const {id} = source
        return !id ? null : { id }
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

    getKey(props){
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

    isFetching(props){
        return this.getMetas('fetching', props)
    }

    isLoaded(props) {
        return !(!this._getModel(props) || !this.getMetas('loaded', props))
    }

    canUpdate(_props){
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
        this.fetch(this.getParams())
    }
}

export default AbstractModelComponent
