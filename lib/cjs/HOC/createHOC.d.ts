import React from 'react';
import { ARCConfig } from "../types/config.types";
import { ARCContainer } from "../types/components.types";
interface CreateHOCParams<Model, P extends object> {
    Container?: React.ComponentType<P & ARCContainer<Model, P>>;
    ARCConfig: ARCConfig<Model>;
}
export declare function createHOC<Model, R extends object>({ Container, ARCConfig }: CreateHOCParams<Model, R>): (Wrapped: React.ComponentType<R & ARCContainer<Model, R>>) => (props: R) => React.JSX.Element;
export {};
