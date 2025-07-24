import {type ARCConfig, createHOC} from "../../../../src";


export interface Album {
  id: number;
  title: string;
  userId: number;
}

export interface AlbumProps {
  id: number;
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
  "fetchOnce": true
}


export const withAlbum = createHOC<AlbumProps, Album>({
  ARCConfig: album,
})