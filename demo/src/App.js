import React from 'react';

/** REDUX **/
import {Provider} from 'react-redux'
import store from './store'

/** ROUTES DEPENDENCIES **/
import {Router, Route, hashHistory, IndexRoute} from 'react-router'
import {syncHistoryWithStore} from 'react-router-redux'
const history = syncHistoryWithStore(hashHistory, store)


import Application from './layout/ApplicationLayout'
import Portfolio from './portfolio/containers/Portfolio'
import PortfolioItem from './portfolio/containers/PortfolioItem'
import PortfolioEditItem from './portfolio/containers/PortfolioEditItem'


function App() {
    return (
        <Provider store={store}>
            <Router history={history}>
                <Route path="/" component={Application}>
                    <IndexRoute name="Home" component={Portfolio}/>
                    <Route path=":id" name="Portfolio Item" component={PortfolioItem}/>
                    <Route path=":id/edit" name="Edit Portfolio Item" component={PortfolioEditItem}/>
                </Route>
            </Router>
        </Provider>
    );
}

export default App;
