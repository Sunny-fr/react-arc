import React from "react";
/** REDUX **/
import {Provider} from 'react-redux'
import store, {history} from './store'

import Application from './layout/ApplicationLayout'
//import {Portfolio, PortfolioItem, PortfolioEditItem} from './portfolio'
import Portfolio from './portfolio/containers/Portfolio'
import PortfolioItem from './portfolio/containers/PortfolioItem'
import PortfolioEditItem from './portfolio/containers/PortfolioEditItem'
import {Contact} from './contact/components/Contact'


/** ROUTES DEPENDENCIES **/
import {Router, Route, Switch} from 'react-router'
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
    <React.StrictMode>
      <Provider store={store}>
        <ConnectedRouter history={history}>
          <Router history={history}>
            <Route path="/" component={ApplicationLayoutWrapper}/>
          </Router>
        </ConnectedRouter>
      </Provider>
    </React.StrictMode>
  )
}

export default App