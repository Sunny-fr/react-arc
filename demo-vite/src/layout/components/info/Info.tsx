

interface InfoProps {
  children: React.ReactNode;
}

export function Info(props: InfoProps) {
  return <div className="sizing info">{props.children}</div>;
}

export default Info;
