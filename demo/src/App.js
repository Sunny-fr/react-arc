import React from 'react'

/** REDUX **/
import {connect, Provider} from 'react-redux'
import store, {history} from './store'
import {ARCProvider} from '../../lib'

import Application from './layout/ApplicationLayout'
import {Portfolio, PortfolioItem, PortfolioEditItem} from './portfolio'
import {Contact} from './contact/components/Contact'


/** ROUTES DEPENDENCIES **/
import {Router, Route,Switch} from 'react-router'
import {ConnectedRouter} from 'connected-react-router'


const ApplicationLayoutWrapper = (props) => {
    return (<Application {...props}>
        <Switch>
            <Route exact path="/" name="Home" component={Portfolio}/>
            <Route path="/view/:id" name="Portfolio Item" component={PortfolioItem}/>
            <Route path="/create" name="Create Item" component={PortfolioEditItem}/>
            <Route path="/edit/:id" name="Edit Portfolio Item" component={PortfolioEditItem}/>
            <Route path="/contact" name="Contact" component={Contact}/>
        </Switch>
    </Application>)
}

function App() {
    return (
        <Provider store={store}>
            <ARCProvider store={store} connect={connect}>
                <ConnectedRouter history={history}>
                    <Router history={history}>
                        <Route path="/" component={ApplicationLayoutWrapper}/>
                    </Router>
                </ConnectedRouter>
            </ARCProvider>
        </Provider>
    )
}

export default App
