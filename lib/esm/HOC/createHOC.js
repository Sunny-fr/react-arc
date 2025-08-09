import React from 'react';
import { ModelContainer } from "../containers-next/ModelContainer";
import { withARC } from "./withARC";
export function createHOC({ Container = ModelContainer, ARCConfig }) {
    return function GeneratedHOC(Wrapped) {
        const GeneratedARCContainer = withARC(ARCConfig)(Container);
        return function Component(props) {
            const extendedProps = {
                ...props,
                component: Wrapped
            };
            //@ts-ignore
            return React.createElement(GeneratedARCContainer, { ...extendedProps });
        };
    };
}
