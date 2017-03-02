import React from 'react'
import {flatten, extractParams} from '../utils'
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

    getError(_props) {
        const props = _props || this.props
        return props.error
    }

    isLoaded (){
        return this.props.loaded
    }

    isSyncing () {
        return this.props.fetching
    }

    allowRefetch = (_props) => {
        const props = _props || this.props
        return !(this.ARCConfig.fetchOnce && this.isLoaded(props))
    }

    componentWillMount (){
        if (this.allowRefetch()) this.fetch()
    }
}
export default AbstractCollectionComponent