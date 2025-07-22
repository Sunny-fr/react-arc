import React, { AnchorHTMLAttributes } from 'react';
import { navigateTo } from './navigate';

interface LinkProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  to?: string;
}

export const Link: React.FC<LinkProps> = ({ to = '/', ...props }) => (
  <a
    onClick={e => {
      e.preventDefault();
      navigateTo(to);
    }}
    href={to}
    {...props}
  />
);

export default Link;
