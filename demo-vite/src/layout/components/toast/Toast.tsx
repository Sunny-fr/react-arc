import React, { ReactNode } from 'react';

interface ToastProps {
  children: ReactNode;
}

export function Toast(props: ToastProps) {
  return <div className="toast">{props.children}</div>;
}

export default Toast;
