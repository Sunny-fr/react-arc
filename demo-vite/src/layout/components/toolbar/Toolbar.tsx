
import { cn } from '@/lib/utils.ts';

interface ToolbarProps {
  children: React.ReactNode;
  className?: string;
}

export function Toolbar({ children, className }: ToolbarProps) {
  return (
    <div className={cn(
      "py-5",
      className
    )}>
      {children}
    </div>
  );
}

export default Toolbar;
