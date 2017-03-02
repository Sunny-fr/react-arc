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

const shorten = (str) => str.length > 33 ? str.substr(0, 33) + '...' : str

class PorfolioItem extends Component {
    render() {
        const {item} = this.props
        return (<div className="polaroid animated fadeIn">
            <Link to={'/view/' + item.id}>
                <div className="image-canvas" style={{backgroundImage: 'url(images/image-' + item.id + '.png)'}}/>
            </Link>
            <div className="caption">
                <h3>{shorten(item.title)}</h3>
                <AlbumItemComponent id={item.albumId}/>
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
            return (<LargeError title={error} children={'...mmm, something wrong happened...'}/>)
        }
        if (!this.isLoaded()) return (<Loader />)

        const items = this.getCollection().map(item => <PorfolioItem key={item.id} item={item}/>)

        return (<div className="portfolio">
            <Link to={'/create'} className="btn-float create"/>
            {this.isSyncing() ? <Toast>syncing...</Toast> : null}
            {items}
        </div>)
    }
}

export default mixerConnector(connect, config)(PorfolioComponent)
