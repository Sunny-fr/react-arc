import React from 'react'
import AbstractModelComponent from './AbstractModelComponent'

export class AbstractFormModelComponent extends AbstractModelComponent {

    constructor(props) {
        super(props)
        this.silentState = {
            edited: {} // Not pristines :-)
        }
    }

    /** PUBLIC ACTIONS METHODS **/
    /* private
     * changes props value */
    changeProp = (prop, value) => {
        this._setPristine(prop)
        this.edit({[prop]: value})
    }

    /* private
     * if a prop has been edited */
    getEditedStatus = (prop) => {
        return prop ? this.silentState.edited[prop] : this.silentState.edited
    }

    /** PUBLIC/MEANT TO BE OVERRIDDEN **/

    onSave() { }


    componentDidUpdate() {
        if (this.getMetas('saved')) {
            const created = this.getModel()
            this.resetTempModel()
            this.onSave(created)
        }
    }

    /* private
     * state data but not triggering rerender */
    _setSilentState = (data) => {
        this.silentState = Object.assign({}, this.silentState, data)
    }

    /* private
     * if a prop has been modified, it will be flagged */
    _setPristine(prop) {
        const edited = {
            ...this.silentState.edited,
            [prop]: true
        }
        this._setSilentState({edited})
    }


}

export default  AbstractFormModelComponent
