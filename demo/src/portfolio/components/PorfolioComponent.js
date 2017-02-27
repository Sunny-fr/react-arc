import React, {Component}  from 'react'
import config from '../config.json'
import {connect} from 'react-redux'
import {Link} from 'react-router'
import {AbstractCollectionComponent, mixerConnector} from '../../../../lib'

const shorten = (str) => str.length > 12 ? str.substr(0,12) + '...' : str

class PorfolioItem extends Component {
    render() {
        const {item} = this.props
        return !item.images[0].path ? null : ( <div className="col-sm-4 col-md-3">
                <div className="thumbnail">
                    <img src={item.images[0].path} alt={item.title} style={{}}/>
                    <div className="caption">
                        <h3>{shorten(item.title)}</h3>
                        <p><Link to={'/' + item.id}>see more</Link> </p>
                        <p>
                            {item.tags.slice(0,3).map(tag=>(<span style={{marginRight:3}} key={tag.id} className="label label-primary">{tag.title}</span>))}
                        </p>
                    </div>
                </div>
            </div>)
    }
}
class PorfolioComponent extends AbstractCollectionComponent {
    static defaultProps = {
        ARCConfig: config
    }

    render() {
        if (this.gotError()) {
            console.log(this.getMetas('error'))
            return (<div className="alert alert-danger" role="alert">...mmm, something wrong happened...</div>)
        }
        if (!this.isLoaded()) return (<div>loading....</div>)
        const items = this.getCollection().map(item => <PorfolioItem key={item.id} item={item}/>)
        return (<div className="row">
            {items}
        </div>)
    }
}

export default mixerConnector(connect, config)(PorfolioComponent)
