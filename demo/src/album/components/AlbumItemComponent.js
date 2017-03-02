import React  from 'react'
import config from '../config.json'
import {connect} from 'react-redux'
import {AbstractModelComponent, mixerConnector} from '../../../../lib'

class AlbumItemComponent extends AbstractModelComponent {
    static defaultProps = {
        ARCConfig: config
    }
    render() {
        if (this.getError()) return (<label className="label label-danger">!</label>)
        if (!this.isLoaded()) return (<label className="label label-default">...</label>)
        return ( <label className="label label-default">{this.getModel().title}</label>)
    }
}

export const AlbumItem = mixerConnector(connect, config)(AlbumItemComponent)

export default AlbumItem
