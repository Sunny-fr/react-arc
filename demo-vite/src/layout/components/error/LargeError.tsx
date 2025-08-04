import React from 'react';
import { cn } from '@/lib/utils.ts';

interface LargeErrorProps {
    title: string;
    children: React.ReactNode;
    className?: string;
}

export function LargeError({ title, children, className }: LargeErrorProps): React.ReactElement {
    return (
        <div className={cn(
            "w-full max-w-[600px] mx-auto my-8 overflow-hidden bg-white rounded shadow transition-shadow duration-300",
            className
        )}>
            <div className="py-24 bg-gray-600 text-center text-white text-6xl shadow-inner">
                {title}
            </div>
            <div className="p-6 text-center">
                {children}
            </div>
        </div>
    );
}

export default LargeError;
