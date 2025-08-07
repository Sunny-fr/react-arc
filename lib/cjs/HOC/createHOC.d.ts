import React from 'react';
import { ARCConfig } from "../types/config.types";
import { ARCContainer } from "../types/components.types";
interface CreateHOCParams<R, Model, P extends object = {}> {
    Container?: React.ComponentType<R & ARCContainer<P, Model, R> & P>;
    ARCConfig: ARCConfig<Model, R>;
}
export declare function createHOC<R extends object, Model = any, P extends object = {}>({ Container, ARCConfig }: CreateHOCParams<R, Model, P>): <P_1>(Wrapped: React.ComponentType<ARCContainer<P_1, Model, R> & R & P_1>) => (props: R & P_1) => React.JSX.Element;
export {};
