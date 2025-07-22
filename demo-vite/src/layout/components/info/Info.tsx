import React, { ReactNode } from 'react';

interface InfoProps {
  children: ReactNode;
}

export function Info(props: InfoProps) {
  return <div className="sizing info">{props.children}</div>;
}

export default Info;
