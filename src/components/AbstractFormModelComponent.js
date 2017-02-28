import React from 'react'
import AbstractModelComponent from './AbstractModelComponent'

export class AbstractFormModelComponent  extends AbstractModelComponent {

    componentDidUpdate() {
        /** CUSTOMIZE HERE **/
        if (this.getMetas('forward')) {
            this.resetTempModel()
            if (typeof this.onSave !== 'undefined') this.onSave()
            //const {id} = this.getModel()
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
        this.props.dispatch(this.actions.edit(model, this.getParams()))
    }

    submit = () => {
        const isNew = this.isNew()
        const model = this.getModel()
        const params = isNew ? this.getParams(model.id) : this.getParams()
        this.props.dispatch(this.actions.save(model, params, isNew ? 'post': 'put'))
        if (typeof this.onSubmit !== 'undefined') this.onSubmit()
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

export default  AbstractFormModelComponent
