import React,{Component}  from 'react'
import config from './config.json'
import {connect} from 'react-redux'
import {AbstractCollectionComponent, mixerConnector} from '../../../lib/ARC'

class PorfolioItem extends Component {
    render(){
        const {item} = this.props
        const style = {maxHeight: 80}
        return (<div>
            <h3>{item.title}</h3>
            <div>
                {item.images.map(image => <img key={image.id} src={image.path} style={style} />)}
            </div>
        </div>)
    }
}
class PorfolioComponent extends AbstractCollectionComponent {
    static defaultProps = {
        ARCConfig: config
    }
    render(){
        if (!this.isLoaded()) return (<div>loading....</div>)
        const items = this.getCollection().map(item=><PorfolioItem key={item.id} item={item} />)
        return(<ul>
            {items}
        </ul>)
    }
}

export default mixerConnector(connect, config)(PorfolioComponent)
