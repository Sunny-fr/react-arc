import { applyMiddleware, createStore, compose, combineReducers } from "redux"
import thunk from "redux-thunk"
import promise from "redux-promise-middleware"
import {routerReducer} from 'react-router-redux'

//DEMO COMPONENT ABSTRACT REDUX
import {mixerStore} from '../../lib'
import configPortfolio from './portfolio/config.json'
import configAlbum from './album/config.json'

const middleware = applyMiddleware(
    promise(),
    thunk
)

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const enhancer = composeEnhancers(middleware)

const reducers = {
    portfolio: mixerStore({config:configPortfolio}),
    album: mixerStore({config:configAlbum}),
    routing: routerReducer
}

const store = Object.keys(reducers).length > 0 ? createStore(combineReducers(reducers), enhancer) : createStore(enhancer)

export default store
