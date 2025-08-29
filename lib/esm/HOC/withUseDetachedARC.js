import React from "react";
import { useDetachedARC } from "../hooks/useDetachedARC";
export function withUseDetachedARC(config) {
    return function HOC(Wrapped) {
        const displayName = Wrapped.displayName || Wrapped.name || "Component";
        const ComponentWithArc = (props) => {
            const arc = useDetachedARC({ ARCConfig: config, props });
            return React.createElement(Wrapped, { ...arc, ...(props) });
        };
        ComponentWithArc.displayName = `withUseDetachedARC(${displayName})`;
        return ComponentWithArc;
    };
}
