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


const ApplicationLayoutWrapper = (props:any) => {
  return (<Application {...props}>
    <Switch>
      <Route exact path="/" component={Portfolio}/>
      <Route path="/view/:id" component={PortfolioItem}/>
      <Route path="/create" component={PortfolioEditItem}/>
      <Route path="/edit/:id" component={PortfolioEditItem}/>
      <Route path="/contact" component={Contact}/>
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