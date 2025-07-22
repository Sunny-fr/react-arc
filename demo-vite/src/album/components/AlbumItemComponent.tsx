import React from 'react';
import config from '../config.json';
import { connect } from 'react-redux';
import { mixerConnector }  from 'react-arc'
// import { useARCModel } from '../../lib/hooks/arc';
import { useARC }  from 'react-arc'

interface AlbumItemComponentProps {
  // Ajoutez ici les props spécifiques si besoin
}

export const AlbumItemComponent: React.FC<AlbumItemComponentProps> = (props) => {
  // Utilisation d'un hook personnalisé pour la logique du modèle
  const { model, isLoaded, error } = useARC(props, config);

  if (error) return (<label className="label label-danger">!</label>);
  if (!isLoaded) return (<label className="label label-default">...</label>);
  return (<label className="label label-default">{model?.title}</label>);
};

export const AlbumItem = mixerConnector(connect, config)(AlbumItemComponent);

