import React from 'react'
import {ReduxActionsList} from '../actions/ReduxActionsList'
import defaultConfig from '../defaultConfig'

export class AbstractComponent extends React.Component {
    constructor(props) {
        super(props)
        this.ARCConfig = {...defaultConfig, ...props.ARCConfig}
        this.actions = new ReduxActionsList({config: props.ARCConfig})
    }
    render() {
        if (this.gotError()) return null
        if (!this.isLoaded()) return (<p>loading</p>)
        return (<div>loaded (you should do something with your view :) )</div>)
    }
}

export default AbstractComponent