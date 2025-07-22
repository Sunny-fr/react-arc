import {applyMiddleware, createStore, compose, combineReducers} from "redux"
import thunk from "redux-thunk"
// import promise from "redux-promise-middleware"
//import {routerReducer} from 'react-router-redux'

//DEMO COMPONENT ABSTRACT REDUX
import {mixerStore} from 'react-arc'
import configPortfolio from './portfolio/portfolio.json'
import configPortfolioList from './portfolio/portfolio-list.json'
import configAlbum from './album/config.json'
import {connectRouter, routerMiddleware} from 'connected-react-router'
import {createHashHistory} from 'history'


export const history = createHashHistory()
const _routerMiddleWare = routerMiddleware(history);

const middleware = applyMiddleware(
  //promise(),
  thunk,
  _routerMiddleWare
)

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const enhancer = composeEnhancers(middleware)

const reducers = {
  portfolio: mixerStore({config: configPortfolio}),
  portfolioList: mixerStore({config: configPortfolioList}),
  album: mixerStore({config: configAlbum}),
  router: connectRouter(history)
}

const store = Object.keys(reducers).length > 0 ? createStore(combineReducers(reducers), enhancer) : createStore(enhancer)

export default store
