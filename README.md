![react-arc version](https://img.shields.io/npm/v/react-arc.svg) ![react-arc downloads](https://img.shields.io/npm/dm/react-arc.svg)
# ARC

React Abstract Redux Containers

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

import React  from 'react'
import config from './somewhere/config.json'
import {AbstractModelContainer, withARC} from 'react-arc'

const PortfolioItem = ({item}) =>{
    return (<li>
        <h3>{item.title}</h3>
        <p>{item.description}</p>
    </li>)
}
class PortfolioComponent extends AbstractModelContainer {
    render(){
        if (!this.isLoaded()) return (<div>loading....</div>)
        const items = this.getCollection().map(item=><PortfolioItem key={item.id} item={item} />)
        return(<ul>
            {items}
        </ul>)
    }
}

export default withARC(config)(PortfolioComponent)

```


### App.js
```javascript

function App() {
    return (
        <Provider store={store}>
            <ARCProvider store={store}>
                {/* ... */} 
            </ARCProvider>
        </Provider>
    )    
}

```



### store

```javascript
import {mixerStore} from 'react-arc'
import configPortfolio from './somewhere/config.json'

const reducers = {
    portfolio: mixerStore({config:configPortfolio})
}

```
