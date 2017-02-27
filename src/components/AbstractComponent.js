import React from 'react'
import {ReduxActionsList} from '../actions/ReduxActionsList'

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

export default AbstractComponent