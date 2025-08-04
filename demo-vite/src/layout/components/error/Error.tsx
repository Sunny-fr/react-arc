import {cn} from '@/lib/utils.ts';

interface ErrorProps {
  children: React.ReactNode;
  className?: string;
}

export function Error({ children, className }: ErrorProps) {
  return (
    <div className={cn(
      "bg-yellow-200 p-4 rounded text-left text-sm",
      className
    )}>
      {children}
    </div>
  );
}

export default Error;
