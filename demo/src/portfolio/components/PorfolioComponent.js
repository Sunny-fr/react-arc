import React, {Component}  from 'react'
import config from '../config.json'
import {connect} from 'react-redux'
import {Link} from 'react-router'
import {AbstractCollectionComponent, mixerConnector} from '../../../../lib'
import Loader from '../containers/Loader'

const shorten = (str) => str.length > 25 ? str.substr(0,25) + '...' : str

class PorfolioItem extends Component {
    render() {
        const {item} = this.props
        return !item.images[0].path ? null : (
                <div className="thumbnail paper animated fadeIn">
                    <Link to={'/' + item.id}><img src={item.images[0].path} alt={item.title} style={{}}/></Link>
                    <div className="caption">
                        <h3>{shorten(item.title)}</h3>
                        <p>
                            {item.tags.slice(0,3).map(tag=>(<span style={{marginRight:3}} key={tag.id} className="label label-primary">{tag.title}</span>))}
                        </p>
                    </div>
                </div>
            )
    }
}
class PorfolioComponent extends AbstractCollectionComponent {
    static defaultProps = {
        ARCConfig: config
    }

    render() {
        if (this.gotError()) {
            console.error(this.gotError())
            return (<div className="alert alert-danger" role="alert">...mmm, something wrong happened...</div>)
        }
        if (!this.isLoaded()) return (<Loader />)
        const items = this.getCollection().map(item => <PorfolioItem key={item.id} item={item}/>)
        return (<div>
            {items}
        </div>)
    }
}

export default mixerConnector(connect, config)(PorfolioComponent)
