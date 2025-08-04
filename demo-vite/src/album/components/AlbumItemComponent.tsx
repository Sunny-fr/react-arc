import React from 'react';
import {type AlbumProps, withAlbum} from "../arc/album.arc";


export const AlbumItemComponent: React.FC<AlbumProps> = withAlbum(({model, error, loaded}) => {
  if (error) return (<label className="label label-danger">!</label>);
  if (!loaded) return (<label className="label label-default">...</label>);
  return (<label className="label label-default">{model?.title}</label>);
});

export const AlbumItem = AlbumItemComponent;

