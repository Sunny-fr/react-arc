import {type Portfolio} from "./portfolio.arc.ts";
import {type ARCConfig, createHOC} from "../../../../src";


export type Portfolios = Portfolio[]

interface PortfolioListProps {
  start: number;
  limit: number;
}



export const portfolioList: ARCConfig<Portfolios> = {
  "name": "portfolioList",
  "uppercaseName": "PORTFOLIO_LIST",
  "modelProps": [
    "start",
    "limit"
  ],
  "paths": {
    "item": "https://jsonplaceholder.typicode.com/photos?_start={start}&_limit={limit}"
  },
  "maxTries": 3,
  requestFetchDelay: 3000
}


export const withPortfolioList = createHOC<PortfolioListProps, Portfolios>({
  ARCConfig: portfolioList,
})