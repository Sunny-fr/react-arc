import React from 'react';
import { ModelContainer } from "../containers-next/ModelContainer";
import { withARC } from "./withARC";
export function createHOC({ Container = ModelContainer, ARCConfig }) {
    return function GeneratedHOC(Wrapped) {
        const GeneratedARCContainer = withARC(ARCConfig)(Container);
        return function Component(visibleProps) {
            const actualProps = visibleProps;
            // const extendedProps = {
            //   ...actualProps,
            //   component: Wrapped
            // }
            //{...extendedProps}
            return React.createElement(GeneratedARCContainer, { ...actualProps, ARCConfig: ARCConfig, model: actualProps.model, modelKey: actualProps.modelKey, metaModel: actualProps.metaModel, metas: actualProps.metas, loaded: actualProps.loaded, error: actualProps.error, loading: actualProps.loading, isNew: actualProps.isNew, component: Wrapped, dispatch: actualProps.dispatch });
        };
    };
}
