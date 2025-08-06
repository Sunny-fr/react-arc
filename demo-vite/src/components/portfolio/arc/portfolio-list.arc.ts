import {type Portfolio} from "./portfolio.arc.ts";
import {type ARCConfig, createHOC} from "../../../../../src";


export type Portfolios = Portfolio[]

export interface PortfolioListProps {
  start: number;
  limit: number;
}



export const portfolioList: ARCConfig<Portfolios> = {
  "name": "portfolioList",
  "actionNamespace": "PORTFOLIO_LIST",
  "modelProps": [
    "start",
    "limit"
  ],
  "paths": {
    "item": "https://jsonplaceholder.typicode.com/photos?_start={start}&_limit={limit}"
  },
  "maxTries": 3,

  fetchOnce: true,
}


export const withPortfolioList = createHOC<Portfolios, PortfolioListProps>({
  ARCConfig: portfolioList,
})