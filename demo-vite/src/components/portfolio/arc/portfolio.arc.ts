import {type ARCConfig, createHOC} from "../../../../../src";


export interface Portfolio {
  id: number | string;
  title: string;
  url: string;
  thumbnailUrl: string;
  albumId: number;
  description: string;
}


export interface PortfolioProps {
  id: number | string;
}


export const portfolio: ARCConfig<Portfolio> = {
  "name": "portfolio",
  "actionNamespace": "PORTFOLIO",
  "modelProps": [
    "id"
  ],
  "paths": {
    "item": "https://jsonplaceholder.typicode.com/photos/{id}"
  },
  "maxTries": 3,
  fetchOnce: true,
}

export const withPortfolio = createHOC<PortfolioProps, Portfolio>({
  ARCConfig: portfolio
})