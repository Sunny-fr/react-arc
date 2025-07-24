import {type ARCConfig, createHOC} from "../../../../src";


export interface Portfolio {
  id: number;
  title: string;
  url: string;
  thumbnailUrl: string;
  albumId: number;
  description: string;
}


interface PortfolioProps {
  id: number
}


export const portfolio: ARCConfig<Portfolio> = {
  "name": "portfolio",
  "uppercaseName": "PORTFOLIO",
  "modelProps": [
    "id"
  ],
  "paths": {
    "item": "https://jsonplaceholder.typicode.com/photos/{id}"
  },
  "maxTries": 3
}

export const withPortfolio = createHOC<PortfolioProps, Portfolio>({
  ARCConfig: portfolio
})