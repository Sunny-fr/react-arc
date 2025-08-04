import {cn} from "@/lib/utils.ts";


interface LoaderProps {
  className?: string;
}
export function Loader({className}: LoaderProps) {
  return (
    <div className={cn(
      "flex items-center justify-center w-full h-full",
      className
    )}>
      <div className="flex space-x-2">
        {[0, 1, 2].map((index) => (
          <div
            key={index}
            className="h-4 w-4 rounded-full bg-primary animate-pulse"
            style={{
              animationDelay: `${index * 0.15}s`,
              backgroundColor: 'var(--primary, #3b82f6)'
            }}
          />
        ))}
      </div>
    </div>
  );
}

export default Loader;
