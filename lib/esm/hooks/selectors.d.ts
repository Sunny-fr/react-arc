import { ARCRootState } from "../types/connectors.types";
import { ARCConfig } from "../types/config.types";
export declare const metaModelSelector: ((state: any, __: any, key: string | number | null) => import("..").ARCMetaModel<any> | null) & {
    clearCache: () => void;
    resultsCount: () => number;
    resetResultsCount: () => void;
} & {
    resultFunc: (resultFuncArgs_0: import("../types/connectors.types").ARCStoreState<any>, resultFuncArgs_1: ARCConfig<any, {}>, resultFuncArgs_2: string | number | null) => import("..").ARCMetaModel<any> | null;
    memoizedResultFunc: ((resultFuncArgs_0: import("../types/connectors.types").ARCStoreState<any>, resultFuncArgs_1: ARCConfig<any, {}>, resultFuncArgs_2: string | number | null) => import("..").ARCMetaModel<any> | null) & {
        clearCache: () => void;
        resultsCount: () => number;
        resetResultsCount: () => void;
    };
    lastResult: () => import("..").ARCMetaModel<any> | null;
    dependencies: [(state: ARCRootState, ARCConfig: ARCConfig<any>) => import("../types/connectors.types").ARCStoreState<any>, (_: any, arcConfig: ARCConfig<any>) => ARCConfig<any, {}>, (_: any, __: any, key: string | number | null) => string | number | null];
    recomputations: () => number;
    resetRecomputations: () => void;
    dependencyRecomputations: () => number;
    resetDependencyRecomputations: () => void;
} & {
    argsMemoize: typeof import("reselect").weakMapMemoize;
    memoize: typeof import("reselect").weakMapMemoize;
};
export declare const fetchingCountSelector: ((state: any, ARCConfig: ARCConfig<any, {}>) => number) & {
    clearCache: () => void;
    resultsCount: () => number;
    resetResultsCount: () => void;
} & {
    resultFunc: (resultFuncArgs_0: import("../types/connectors.types").ARCStoreState<any>, resultFuncArgs_1: ARCConfig<any, {}>) => number;
    memoizedResultFunc: ((resultFuncArgs_0: import("../types/connectors.types").ARCStoreState<any>, resultFuncArgs_1: ARCConfig<any, {}>) => number) & {
        clearCache: () => void;
        resultsCount: () => number;
        resetResultsCount: () => void;
    };
    lastResult: () => number;
    dependencies: [(state: ARCRootState, ARCConfig: ARCConfig<any>) => import("../types/connectors.types").ARCStoreState<any>, (_: any, arcConfig: ARCConfig<any>) => ARCConfig<any, {}>];
    recomputations: () => number;
    resetRecomputations: () => void;
    dependencyRecomputations: () => number;
    resetDependencyRecomputations: () => void;
} & {
    argsMemoize: typeof import("reselect").weakMapMemoize;
    memoize: typeof import("reselect").weakMapMemoize;
};
