import type {ARCConfig} from "../../../../src";


export interface Album {
  id: number;
  title: string;
  userId: number;
}



export const album: ARCConfig<Album> = {
  "name": "album",
  "uppercaseName": "ALBUM",
  "modelProps": [
    "id"
  ],
  "paths": {
    "item": "https://jsonplaceholder.typicode.com/albums/{id}",
  },
  "fetchOnce": false
}