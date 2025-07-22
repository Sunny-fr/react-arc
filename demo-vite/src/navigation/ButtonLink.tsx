import React from 'react';
import { navigateTo } from './navigate';

interface ButtonLinkProps {
  to?: string;
  className?: string;
  iconClassName?: string;
}

export const ButtonLink: React.FC<ButtonLinkProps> = ({
  to = '/',
  className = 'btn-float create animated fadeIn',
  iconClassName = 'glyphicon glyphicon-remove',
}) => (
  <button
    onClick={() => navigateTo(to)}
    type="button"
    className={className}
  >
    <i className={iconClassName} />
  </button>
);

export default ButtonLink;
