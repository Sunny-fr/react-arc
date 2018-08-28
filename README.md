# ARC 1.0.2

React Abstract Redux Component

Set of components to manage collections/models from a REST service

Live demo : https://toolbox.sunny.fr/react-arc/


## sample code

### config

```javascript

//EXAMPLE CONFIG
export const config = {
    // reducer name
    name: 'something',
    // will be used to decorate every action (singular prefered)
    uppercaseName: 'SOMETHING',
    // useful to map objects in collection
    modelProps: ['id'],
    // can be an empty list (might be usefull if you need paging...)
    collectionProps: ['size','page'],
    // path to your rest server
    paths: {
        item: '/some/url/{id}',
        collection: '/some/url?page={page}&size={size}'
    }
}

```

### component

```javascript

import React,{Component}  from 'react'
import config from './somewhere/config.json'
import {connect} from 'react-redux'
import {AbstractCollectionComponent, mixerConnector} from 'react-arc'

class PorfolioItem extends Component {
    render(){
        const {item} = this.props
        return (<li>
            <h3>{item.title}</h3>
            <p>{item.description}</p>
        </li>)
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

### store

```javascript
import {mixerStore} from 'react-arc'
import configPortfolio from './somewhere/config.json'

const reducers = {
    portfolio: mixerStore({config:configPortfolio})
}

```
