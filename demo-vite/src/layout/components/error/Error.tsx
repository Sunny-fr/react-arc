import React, { ReactNode } from 'react';

interface ErrorProps {
  children: ReactNode;
}

export function Error(props: ErrorProps) {
  return (
    <div className="error small">
      <p>{props.children}</p>
    </div>
  );
}

export default Error;
