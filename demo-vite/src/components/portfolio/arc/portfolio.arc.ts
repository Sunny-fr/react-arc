import {
  type ARCAxiosOptions,
  type ARCConfig,
  type ComponentPropsWithRequiredModelParams,
  createHOC,
  ReduxActions
} from "../../../../../src";
import axios from "axios";
import type {ComponentProps} from "react-arc";


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
  "modelProps": [
    "id"
  ],
  "paths": {
    "item": "https://jsonplaceholder.typicode.com/photos/{id}"
  },

  fetchOnce: true,
  fetchers: {
    'fetch':(_params: ComponentPropsWithRequiredModelParams,
             config: ARCConfig<Portfolio>,
             _props: ComponentProps,
             axiosOptions: ARCAxiosOptions<Portfolio>) => {
      return axios({
        method: 'GET',
        url: config.paths.item,
        headers: config.headers,
        signal: axiosOptions ? ReduxActions.GenerateAbortSignal(axiosOptions) : undefined,
      })
    },
  }
}

export const withPortfolio = createHOC<PortfolioProps, Portfolio>({
  ARCConfig: portfolio
})