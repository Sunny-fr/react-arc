import React from 'react'
import {flatten, extractParams} from '../actions/ReduxActionsList'
import AbstractComponent from './AbstractComponent'


export class AbstractCollectionComponent extends AbstractComponent {

    remove = (data) => {
        this.props.dispatch(this.actions.remove(data))
    }

    fetch = () => {
        this.props.dispatch(this.actions.fetchAll(extractParams(this.ARCConfig.collectionProps, this.props)))
    }

    getCollection() {
        return flatten(this.props.collection)
    }

    gotError(_props) {
        const props = _props || this.props
        return props.error
    }

    isLoaded (){
        return this.props.loaded
    }

    componentWillMount (){
        if (!this.isLoaded()) this.fetch()
    }
    componentWillUnmount() {
        this.props.dispatch(this.actions.reset())
    }
}
export default AbstractCollectionComponent