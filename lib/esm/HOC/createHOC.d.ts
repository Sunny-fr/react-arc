import React from 'react';
import { ARCConfig } from "../types/config.types";
import { ARCContainer } from "../types/components.types";
interface CreateHOCParams<R, Model> {
    Container?: React.ComponentType<R & ARCContainer<Model, R>>;
    ARCConfig: ARCConfig<Model, R>;
}
export declare function createHOC<R extends object, Model = any>({ Container, ARCConfig }: CreateHOCParams<R, Model>): <P>(Wrapped: React.ComponentType<R & ARCContainer<Model, R> & P>) => (props: R & P) => React.JSX.Element;
export {};
