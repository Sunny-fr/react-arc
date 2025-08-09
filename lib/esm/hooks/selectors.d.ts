import { ARCRootState } from "../types/connectors.types";
export declare const metaModelSelector: ((state: ARCRootState, __: any, key: string | number | null) => import("..").ARCMetaModel<any> | null) & {
    clearCache: () => void;
    resultsCount: () => number;
    resetResultsCount: () => void;
} & {
    resultFunc: (resultFuncArgs_0: import("../types/connectors.types").ARCStoreState<any>, resultFuncArgs_1: string, resultFuncArgs_2: string | number | null) => import("..").ARCMetaModel<any> | null;
    memoizedResultFunc: ((resultFuncArgs_0: import("../types/connectors.types").ARCStoreState<any>, resultFuncArgs_1: string, resultFuncArgs_2: string | number | null) => import("..").ARCMetaModel<any> | null) & {
        clearCache: () => void;
        resultsCount: () => number;
        resetResultsCount: () => void;
    };
    lastResult: () => import("..").ARCMetaModel<any> | null;
    dependencies: [(state: ARCRootState, ARCReducerName: string) => import("../types/connectors.types").ARCStoreState<any>, (_: ARCRootState, ARCReducerName: string) => string, (_: ARCRootState, __: any, key: string | number | null) => string | number | null];
    recomputations: () => number;
    resetRecomputations: () => void;
    dependencyRecomputations: () => number;
    resetDependencyRecomputations: () => void;
} & {
    argsMemoize: typeof import("reselect").weakMapMemoize;
    memoize: typeof import("reselect").weakMapMemoize;
};
export declare const fetchingCountSelector: ((state: ARCRootState, ARCReducerName: string) => number) & {
    clearCache: () => void;
    resultsCount: () => number;
    resetResultsCount: () => void;
} & {
    resultFunc: (resultFuncArgs_0: import("../types/connectors.types").ARCStoreState<any>) => number;
    memoizedResultFunc: ((resultFuncArgs_0: import("../types/connectors.types").ARCStoreState<any>) => number) & {
        clearCache: () => void;
        resultsCount: () => number;
        resetResultsCount: () => void;
    };
    lastResult: () => number;
    dependencies: [(state: ARCRootState, ARCReducerName: string) => import("../types/connectors.types").ARCStoreState<any>];
    recomputations: () => number;
    resetRecomputations: () => void;
    dependencyRecomputations: () => number;
    resetDependencyRecomputations: () => void;
} & {
    argsMemoize: typeof import("reselect").weakMapMemoize;
    memoize: typeof import("reselect").weakMapMemoize;
};
