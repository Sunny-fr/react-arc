import React, { ReactNode } from 'react';

interface ToolbarProps {
  children: ReactNode;
}

export function Toolbar(props: ToolbarProps) {
  return <div className="toolbar sizing">{props.children}</div>;
}

export default Toolbar;
