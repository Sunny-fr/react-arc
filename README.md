#ARC 0.1.0

React Abstract Redux Component

Set of components to manage collection or model from a REST service

## sample code

###config

```
{
  "name": "portfolio",
  "uppercaseName": "PORTFOLIO",
  "paths": {
    "item": "http://api.sunny.fr/api/project/{id}",
    "list": "http://api.sunny.fr/api/project"
  }
}
```

###component

```

import React,{Component}  from 'react'
import config from './config.json'
import {connect} from 'react-redux'
import {AbstractCollectionComponent, mixerConnector} from 'unicorn/ARC'

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

```

###store

```

//DEMO COMPONENT ABSTRACT REDUX
import {mixerStore} from '../../lib/ARC'
import configPortfolio from './somewhere/config.json'

const reducers = {
    portfolio: mixerStore({config:configPortfolio})
}

```
