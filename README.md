#ARC 0.1.9

React Abstract Redux Component

Set of components to manage collection or model from a REST service

Live demo : http://sunny.fr/react-arc


## sample code

###config

```javascript

//EXAMPLE CONFIG
export const config = {
    name: 'something',
    //used in the reducers
    uppercaseName: 'SOMETHING',
    // useful to map objects in collection
    modelProps: ['id'],
    // can be an empty list (might be usefull if you need paging...)
    collectionProps: ['size','page'],
    // path to your rest server
    paths: {
        item: '/some/url',
        collection: '/some/other/url'
    },
    /** OPTIONAL **/
    //methods
    methods: {
        create: 'POST',
        update: 'PUT',
        delete: 'DELETE',
        read:   'GET'
    }
}

```

###component

```javascript

import React,{Component}  from 'react'
import config from './config.json'
import {connect} from 'react-redux'
import {AbstractCollectionComponent, mixerConnector} from 'react-arc'

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

```javascript

//DEMO COMPONENT ABSTRACT REDUX
import {mixerStore} from 'react-arc'
import configPortfolio from './somewhere/config.json'

const reducers = {
    portfolio: mixerStore({config:configPortfolio})
}

```
