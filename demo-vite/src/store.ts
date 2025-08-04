import {combineReducers} from "redux"
import {configureStore} from '@reduxjs/toolkit'

import {createReducer} from '../../src'


import {portfolio} from "./components/portfolio/arc/portfolio.arc";
import {portfolioList} from "./components/portfolio/arc/portfolio-list.arc";
import {album} from "./components/album/arc/album.arc";

import {connectRouter} from 'connected-react-router'
import { createBrowserHistory } from 'history'


export const history = createBrowserHistory({ basename:  '/' })




const reducers = {
  portfolio: createReducer({config: portfolio}),
  portfolioList: createReducer({config: portfolioList}),
  album: createReducer({config: album}),
  router: connectRouter(history)
}


const store = configureStore({
  reducer: combineReducers(reducers),
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({

  }),
})


export default store
