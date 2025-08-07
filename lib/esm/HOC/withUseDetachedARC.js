import React from "react";
import { useARC } from "../hooks/useARC";
export function withUseDetachedARC(config) {
    return function HOC(Wrapped) {
        const displayName = Wrapped.displayName || Wrapped.name || "Component";
        const ComponentWithArc = (props) => {
            const arc = useARC({ ARCConfig: config, props });
            return React.createElement(Wrapped, { ...arc, ...props });
        };
        ComponentWithArc.displayName = `withARC(${displayName})`;
        return ComponentWithArc;
    };
}
