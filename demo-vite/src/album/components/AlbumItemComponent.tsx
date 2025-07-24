import React from 'react';
import {album} from "../arc/album.arc";
import {useARC} from "../../../../src";


interface AlbumItemComponentProps {
  id: string;
}

export const AlbumItemComponent: React.FC<AlbumItemComponentProps> = (props) => {

  const { response, loaded, error } = useARC({
    ARCConfig: album,
    props
  });

  if (error) return (<label className="label label-danger">!</label>);
  if (!loaded) return (<label className="label label-default">...</label>);
  return (<label className="label label-default">{response?.title}</label>);
};

export const AlbumItem = AlbumItemComponent;

