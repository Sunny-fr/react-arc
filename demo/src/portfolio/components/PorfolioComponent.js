import React, {Component}  from 'react'
import config from '../config.json'
import {connect} from 'react-redux'
import {Link} from 'react-router'
import {AbstractCollectionComponent, mixerConnector} from '../../../../lib'

import {AlbumItemComponent} from '../../album'

/** UI ASSETS **/
import {Loader} from '../../layout/components/loader'
import {Toast} from '../../layout/components/toast'
import {LargeError} from '../../layout/components/error'


class PorfolioItem extends Component {
    render() {
        const {model, remove} = this.props
        const className = "polaroid animated fadeIn"

        // Alternative
        // if we want to provide any visual feedback while we're deleting
        // const className = "polaroid animated fadeIn" +  (this.props.metas.fetching ? ' disabled': '')

        return (<div className={className}>
            <Link to={'/view/' + model.id}>
                <div className="image-canvas" style={{backgroundImage: 'url(images/image-' + model.id + '.png)'}}/>
            </Link>
            <div className="caption">
                <h3>{(model.title)}</h3>
                <button onClick={()=>{remove(model)}} type="button" className="btn btn-remove animated fadeIn"><i className="glyphicon glyphicon-remove" /></button>
                <AlbumItemComponent id={model.albumId}/>
            </div>
        </div>)
    }
}
class PorfolioComponent extends AbstractCollectionComponent {
    static defaultProps = {
        ARCConfig: config,
        start: 0,
        limit: 20
    }

    render() {
        if (this.getError()) {
            const error = this.getError()
            return (<LargeError title={'!'} children={error.message}/>)
        }
        if (!this.isLoaded()) return (<Loader />)

        const items = this.getCollection().map(model => <PorfolioItem remove={this.removeModel} key={model.id} model={model}/>)

        // Alternative
        // if we want to provide any visual feedback while we're deleting
        // const items = this.getFullCollection().map(metaModel => <PorfolioItem fetching={metaModel.metas.fetching} remove={this.remove} key={metaModel.model.id} model={metaModel.model}/>)

        return (<div className="portfolio">
            <Link to={'/create'} className="btn-float create"/>
            {this.isSyncing() ? <Toast>syncing...</Toast> : null}
            {items}
        </div>)
    }
}

export default mixerConnector(connect, config)(PorfolioComponent)
