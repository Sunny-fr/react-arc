import React, { ReactNode } from 'react';

interface LoaderProps {
  children?: ReactNode;
}

export function Loader(props: LoaderProps) {
  return <div className="loader">{props.children || 'loading'}</div>;
}

export default Loader;
