import React from 'react'
import AbstractModelComponent from './AbstractModelComponent'

export class AbstractFormModelComponent extends AbstractModelComponent {

    componentDidUpdate() {
        if (this.getMetas('forward')) {
            this.resetTempModel()
            this.onSave()
        }
    }

    constructor(props) {
        super(props)
        this.silentState = {
            edited: {} // Not pristines :-)
        }
    }

    /** PUBLIC/MEANT TO BE OVERRIDDEN **/

    onSubmit() { }

    onSave() { }

    /** ACTIONS **/

    edit = (model) => {
        this.props.dispatch(this.actions.edit(model, this.getParams()))
    }

    submit = () => {
        const isNew = this.isNew()
        const model = this.getModel()
        const params = isNew ? this.getParams(model) : this.getParams()
        this.props.dispatch(this.actions.save(model, params, isNew ? 'post' : 'put'))
        this.onSubmit()
    }

    resetTempModel = () => {
        this.props.dispatch(this.actions.resetTemp())
    }

    /** END ACTIONS **/

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
