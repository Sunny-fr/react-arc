import {applyMiddleware, createStore, compose, combineReducers} from "redux"
import thunk from "redux-thunk"

import {mixerStore} from '../../src'


import {portfolio} from "./portfolio/arc/portfolio.arc";
import {portfolioList} from "./portfolio/arc/portfolio-list.arc";
import {album} from "./album/arc/album.arc";

import {connectRouter, routerMiddleware} from 'connected-react-router'
import {createHashHistory} from 'history'
import promise from "redux-promise-middleware";


export const history = createHashHistory()
const _routerMiddleWare = routerMiddleware(history);

const middleware = applyMiddleware(
  promise,
  thunk,
  _routerMiddleWare
)

const composeEnhancers =(window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__|| compose;

const enhancer = composeEnhancers(middleware)

const reducers = {
  portfolio: mixerStore({config: portfolio}),
  portfolioList: mixerStore({config: portfolioList}),
  album: mixerStore({config: album}),
  router: connectRouter(history)
}

const store = Object.keys(reducers).length > 0 ? createStore(combineReducers(reducers), enhancer) : createStore(enhancer)

export default store
