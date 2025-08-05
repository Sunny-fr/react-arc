import React from 'react';
import { ARCConfig } from "../types/config.types";
import { ARCMetaModel } from "../types/model.types";
export interface HOCBootstrapped<M> {
    loaded: boolean;
    metaModel: ARCMetaModel<M>;
    model: M;
    error: any;
    syncing: boolean;
    loading?: boolean;
    metas: object;
    isNew: boolean;
}
interface CreateHOCParams<P extends object, M> {
    Container?: React.ComponentType<P>;
    ARCConfig: ARCConfig<M>;
}
export declare function createHOC<P extends object, M>({ Container, ARCConfig }: CreateHOCParams<P, M>): (Wrapped: React.ComponentType<P & HOCBootstrapped<M>>) => (props: P) => React.JSX.Element;
export {};
