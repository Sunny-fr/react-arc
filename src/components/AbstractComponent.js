import React from 'react'
import {ReduxActionsList, flatten, interpolate} from '../actions/ReduxActionsList'


//EXAMPLE CONFIG
export const config = {
    name: 'something',
    uppercaseName: 'SOMETHING',
    paths: {
        item: '/some/url',
        list: '/some/other/url'
    }
}

export class AbstractComponent extends React.Component {
    constructor(props) {
        super(props)
        this.ARCConfig = {...props.ARCConfig}
        this.actions = new ReduxActionsList({config: this.ARCConfig})
    }

    render() {
        if (this.gotError()) return null
        if (!this.isLoaded()) return (<p>loading</p>)
        return (<div>loaded (you should do something with your view :) )</div>)
    }
}

export class AbstractCollectionComponent extends AbstractComponent {

    remove = (data) => {
        this.props.dispatch(this.actions.remove(data))
    }

    fetch = () => {
        this.props.dispatch(this.actions.fetchAll())
    }

    getCollection() {
        return flatten(this.props.collection)
    }

    gotError(_props) {
        const props = _props || this.props
        return props.error
    }

    isLoaded (){
        return this.props.collectionLoaded
    }

    componentWillMount (){
        if (!this.isLoaded()) this.fetch()
    }
    componentWillUnmount() {
        this.props.dispatch(this.actions.reset())
    }
}

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
        if (this.canUpdate()) this.fetch(this.getParams())
    }
}


export class AbstractFormModelComponent  extends AbstractModelComponent {

    componentDidUpdate() {
        /** CUSTOMIZE HERE **/
        if (this.props.forward) {
            this.resetTempModel()
            const {id} = this.getModel()
        }
    }

    constructor (props){
        super(props)
        this.silentState = {
            edited: {} // Not pristines :-)
        }
    }

    /* ACTIONS */

    edit = (model) => {
        this.props.dispatch(this.actions.update(model, this.getParams()))
    }

    submit = () => {
        const model = this.getModel()
        const params = this.isNew() ? this.getParams(model.id) : this.getParams()
        this.props.dispatch(this.actions.save(model, params))
    }

    resetTempModel = () => {
        this.props.dispatch(this.actions.resetTemp())
    }

    /* ACTIONS */

    setSilentState = (data) => {
        this.silentState = Object.assign({}, this.silentState, data)
    }

    changeProp = (prop, value) => {
        this.setPristine(prop)
        this.edit({[prop]: value})
    }

    setPristine(prop) {
        const edited = {
            ...this.silentState.edited,
            [prop]: true
        }
        this.setSilentState({edited})
    }

    getEditedStatus = (prop) => {
        return prop ? this.silentState.edited[prop] : this.silentState.edited
    }

}
