import './toast.css'

interface ToastProps {
  children: React.ReactNode;
}

export function Toast(props: ToastProps) {
  return <div className="toast animated fadeInUp">{props.children}</div>;
}

export default Toast;
