import { ARCConfig } from "../types/config.types";
import { ComponentType } from "react";
import { ARCStoreState } from "../types/connectors.types";
/**
 * Store Connector
 * @param {ARCConfig} config

 */
export declare function connectFn<Model>(config: ARCConfig<Model>): (store: ARCStoreState<Model>, ownProps: object) => {
    ARCConfig: ARCConfig<Model>;
    loaded: boolean;
    metaModel: import("..").ARCMetaModel<Model> | null;
    model: Model | null;
    error: any;
    syncing: boolean;
    metas: any;
    isNew: boolean;
    dispatch?: import("redux-thunk").ThunkDispatch<any, any, any> | undefined;
};
/**
 *
 * @param {ARCConfig} config
 * @return {function(Component)<ARCWrappedComponent>}
 */
export declare function withARC<Model>(config: ARCConfig<Model>): <T>(Wrapped: ComponentType<T>) => import("react-redux").ConnectedComponent<import("react").JSXElementConstructor<import("react-redux").Matching<{
    ARCConfig: ARCConfig<Model>;
    loaded: boolean;
    metaModel: import("..").ARCMetaModel<Model> | null;
    model: Model | null;
    error: any;
    syncing: boolean;
    metas: any;
    isNew: boolean;
    dispatch?: import("redux-thunk").ThunkDispatch<any, any, any> | undefined;
} & import("react-redux").DispatchProp<import("redux").AnyAction>, (import("react").ClassAttributes<import("react").Component<T, any, any>> & T) | (T & {
    children?: import("react").ReactNode;
})>>, (import("react-redux").DistributiveOmit<import("react-redux").Matching<{
    ARCConfig: ARCConfig<Model>;
    loaded: boolean;
    metaModel: import("..").ARCMetaModel<Model> | null;
    model: Model | null;
    error: any;
    syncing: boolean;
    metas: any;
    isNew: boolean;
    dispatch?: import("redux-thunk").ThunkDispatch<any, any, any> | undefined;
} & import("react-redux").DispatchProp<import("redux").AnyAction>, import("react").ClassAttributes<import("react").Component<T, any, any>> & T>, Extract<"error", (keyof import("react").ClassAttributes<import("react").Component<T, any, any>> | keyof T) & ("children" | keyof T) & ("key" | "ref" | keyof T) & ("children" | keyof T | keyof import("react").ClassAttributes<import("react").Component<any, any, any>>)> | Extract<"loaded", (keyof import("react").ClassAttributes<import("react").Component<T, any, any>> | keyof T) & ("children" | keyof T) & ("key" | "ref" | keyof T) & ("children" | keyof T | keyof import("react").ClassAttributes<import("react").Component<any, any, any>>)> | Extract<"dispatch", (keyof import("react").ClassAttributes<import("react").Component<T, any, any>> | keyof T) & ("children" | keyof T) & ("key" | "ref" | keyof T) & ("children" | keyof T | keyof import("react").ClassAttributes<import("react").Component<any, any, any>>)> | Extract<"ARCConfig", (keyof import("react").ClassAttributes<import("react").Component<T, any, any>> | keyof T) & ("children" | keyof T) & ("key" | "ref" | keyof T) & ("children" | keyof T | keyof import("react").ClassAttributes<import("react").Component<any, any, any>>)> | Extract<"metaModel", (keyof import("react").ClassAttributes<import("react").Component<T, any, any>> | keyof T) & ("children" | keyof T) & ("key" | "ref" | keyof T) & ("children" | keyof T | keyof import("react").ClassAttributes<import("react").Component<any, any, any>>)> | Extract<"model", (keyof import("react").ClassAttributes<import("react").Component<T, any, any>> | keyof T) & ("children" | keyof T) & ("key" | "ref" | keyof T) & ("children" | keyof T | keyof import("react").ClassAttributes<import("react").Component<any, any, any>>)> | Extract<"syncing", (keyof import("react").ClassAttributes<import("react").Component<T, any, any>> | keyof T) & ("children" | keyof T) & ("key" | "ref" | keyof T) & ("children" | keyof T | keyof import("react").ClassAttributes<import("react").Component<any, any, any>>)> | Extract<"metas", (keyof import("react").ClassAttributes<import("react").Component<T, any, any>> | keyof T) & ("children" | keyof T) & ("key" | "ref" | keyof T) & ("children" | keyof T | keyof import("react").ClassAttributes<import("react").Component<any, any, any>>)> | Extract<"isNew", (keyof import("react").ClassAttributes<import("react").Component<T, any, any>> | keyof T) & ("children" | keyof T) & ("key" | "ref" | keyof T) & ("children" | keyof T | keyof import("react").ClassAttributes<import("react").Component<any, any, any>>)>> | import("react-redux").DistributiveOmit<import("react-redux").Matching<{
    ARCConfig: ARCConfig<Model>;
    loaded: boolean;
    metaModel: import("..").ARCMetaModel<Model> | null;
    model: Model | null;
    error: any;
    syncing: boolean;
    metas: any;
    isNew: boolean;
    dispatch?: import("redux-thunk").ThunkDispatch<any, any, any> | undefined;
} & import("react-redux").DispatchProp<import("redux").AnyAction>, T & {
    children?: import("react").ReactNode;
}>, Extract<"error", (keyof import("react").ClassAttributes<import("react").Component<T, any, any>> | keyof T) & ("children" | keyof T) & ("key" | "ref" | keyof T) & ("children" | keyof T | keyof import("react").ClassAttributes<import("react").Component<any, any, any>>)> | Extract<"loaded", (keyof import("react").ClassAttributes<import("react").Component<T, any, any>> | keyof T) & ("children" | keyof T) & ("key" | "ref" | keyof T) & ("children" | keyof T | keyof import("react").ClassAttributes<import("react").Component<any, any, any>>)> | Extract<"dispatch", (keyof import("react").ClassAttributes<import("react").Component<T, any, any>> | keyof T) & ("children" | keyof T) & ("key" | "ref" | keyof T) & ("children" | keyof T | keyof import("react").ClassAttributes<import("react").Component<any, any, any>>)> | Extract<"ARCConfig", (keyof import("react").ClassAttributes<import("react").Component<T, any, any>> | keyof T) & ("children" | keyof T) & ("key" | "ref" | keyof T) & ("children" | keyof T | keyof import("react").ClassAttributes<import("react").Component<any, any, any>>)> | Extract<"metaModel", (keyof import("react").ClassAttributes<import("react").Component<T, any, any>> | keyof T) & ("children" | keyof T) & ("key" | "ref" | keyof T) & ("children" | keyof T | keyof import("react").ClassAttributes<import("react").Component<any, any, any>>)> | Extract<"model", (keyof import("react").ClassAttributes<import("react").Component<T, any, any>> | keyof T) & ("children" | keyof T) & ("key" | "ref" | keyof T) & ("children" | keyof T | keyof import("react").ClassAttributes<import("react").Component<any, any, any>>)> | Extract<"syncing", (keyof import("react").ClassAttributes<import("react").Component<T, any, any>> | keyof T) & ("children" | keyof T) & ("key" | "ref" | keyof T) & ("children" | keyof T | keyof import("react").ClassAttributes<import("react").Component<any, any, any>>)> | Extract<"metas", (keyof import("react").ClassAttributes<import("react").Component<T, any, any>> | keyof T) & ("children" | keyof T) & ("key" | "ref" | keyof T) & ("children" | keyof T | keyof import("react").ClassAttributes<import("react").Component<any, any, any>>)> | Extract<"isNew", (keyof import("react").ClassAttributes<import("react").Component<T, any, any>> | keyof T) & ("children" | keyof T) & ("key" | "ref" | keyof T) & ("children" | keyof T | keyof import("react").ClassAttributes<import("react").Component<any, any, any>>)>> | import("react-redux").DistributiveOmit<import("react").ClassAttributes<import("react").Component<any, any, any>> & import("react-redux").Matching<{
    ARCConfig: ARCConfig<Model>;
    loaded: boolean;
    metaModel: import("..").ARCMetaModel<Model> | null;
    model: Model | null;
    error: any;
    syncing: boolean;
    metas: any;
    isNew: boolean;
    dispatch?: import("redux-thunk").ThunkDispatch<any, any, any> | undefined;
} & import("react-redux").DispatchProp<import("redux").AnyAction>, import("react").ClassAttributes<import("react").Component<T, any, any>> & T>, Extract<"error", (keyof import("react").ClassAttributes<import("react").Component<T, any, any>> | keyof T) & ("children" | keyof T) & ("key" | "ref" | keyof T) & ("children" | keyof T | keyof import("react").ClassAttributes<import("react").Component<any, any, any>>)> | Extract<"loaded", (keyof import("react").ClassAttributes<import("react").Component<T, any, any>> | keyof T) & ("children" | keyof T) & ("key" | "ref" | keyof T) & ("children" | keyof T | keyof import("react").ClassAttributes<import("react").Component<any, any, any>>)> | Extract<"dispatch", (keyof import("react").ClassAttributes<import("react").Component<T, any, any>> | keyof T) & ("children" | keyof T) & ("key" | "ref" | keyof T) & ("children" | keyof T | keyof import("react").ClassAttributes<import("react").Component<any, any, any>>)> | Extract<"ARCConfig", (keyof import("react").ClassAttributes<import("react").Component<T, any, any>> | keyof T) & ("children" | keyof T) & ("key" | "ref" | keyof T) & ("children" | keyof T | keyof import("react").ClassAttributes<import("react").Component<any, any, any>>)> | Extract<"metaModel", (keyof import("react").ClassAttributes<import("react").Component<T, any, any>> | keyof T) & ("children" | keyof T) & ("key" | "ref" | keyof T) & ("children" | keyof T | keyof import("react").ClassAttributes<import("react").Component<any, any, any>>)> | Extract<"model", (keyof import("react").ClassAttributes<import("react").Component<T, any, any>> | keyof T) & ("children" | keyof T) & ("key" | "ref" | keyof T) & ("children" | keyof T | keyof import("react").ClassAttributes<import("react").Component<any, any, any>>)> | Extract<"syncing", (keyof import("react").ClassAttributes<import("react").Component<T, any, any>> | keyof T) & ("children" | keyof T) & ("key" | "ref" | keyof T) & ("children" | keyof T | keyof import("react").ClassAttributes<import("react").Component<any, any, any>>)> | Extract<"metas", (keyof import("react").ClassAttributes<import("react").Component<T, any, any>> | keyof T) & ("children" | keyof T) & ("key" | "ref" | keyof T) & ("children" | keyof T | keyof import("react").ClassAttributes<import("react").Component<any, any, any>>)> | Extract<"isNew", (keyof import("react").ClassAttributes<import("react").Component<T, any, any>> | keyof T) & ("children" | keyof T) & ("key" | "ref" | keyof T) & ("children" | keyof T | keyof import("react").ClassAttributes<import("react").Component<any, any, any>>)>> | import("react-redux").DistributiveOmit<import("react").ClassAttributes<import("react").Component<any, any, any>> & import("react-redux").Matching<{
    ARCConfig: ARCConfig<Model>;
    loaded: boolean;
    metaModel: import("..").ARCMetaModel<Model> | null;
    model: Model | null;
    error: any;
    syncing: boolean;
    metas: any;
    isNew: boolean;
    dispatch?: import("redux-thunk").ThunkDispatch<any, any, any> | undefined;
} & import("react-redux").DispatchProp<import("redux").AnyAction>, T & {
    children?: import("react").ReactNode;
}>, Extract<"error", (keyof import("react").ClassAttributes<import("react").Component<T, any, any>> | keyof T) & ("children" | keyof T) & ("key" | "ref" | keyof T) & ("children" | keyof T | keyof import("react").ClassAttributes<import("react").Component<any, any, any>>)> | Extract<"loaded", (keyof import("react").ClassAttributes<import("react").Component<T, any, any>> | keyof T) & ("children" | keyof T) & ("key" | "ref" | keyof T) & ("children" | keyof T | keyof import("react").ClassAttributes<import("react").Component<any, any, any>>)> | Extract<"dispatch", (keyof import("react").ClassAttributes<import("react").Component<T, any, any>> | keyof T) & ("children" | keyof T) & ("key" | "ref" | keyof T) & ("children" | keyof T | keyof import("react").ClassAttributes<import("react").Component<any, any, any>>)> | Extract<"ARCConfig", (keyof import("react").ClassAttributes<import("react").Component<T, any, any>> | keyof T) & ("children" | keyof T) & ("key" | "ref" | keyof T) & ("children" | keyof T | keyof import("react").ClassAttributes<import("react").Component<any, any, any>>)> | Extract<"metaModel", (keyof import("react").ClassAttributes<import("react").Component<T, any, any>> | keyof T) & ("children" | keyof T) & ("key" | "ref" | keyof T) & ("children" | keyof T | keyof import("react").ClassAttributes<import("react").Component<any, any, any>>)> | Extract<"model", (keyof import("react").ClassAttributes<import("react").Component<T, any, any>> | keyof T) & ("children" | keyof T) & ("key" | "ref" | keyof T) & ("children" | keyof T | keyof import("react").ClassAttributes<import("react").Component<any, any, any>>)> | Extract<"syncing", (keyof import("react").ClassAttributes<import("react").Component<T, any, any>> | keyof T) & ("children" | keyof T) & ("key" | "ref" | keyof T) & ("children" | keyof T | keyof import("react").ClassAttributes<import("react").Component<any, any, any>>)> | Extract<"metas", (keyof import("react").ClassAttributes<import("react").Component<T, any, any>> | keyof T) & ("children" | keyof T) & ("key" | "ref" | keyof T) & ("children" | keyof T | keyof import("react").ClassAttributes<import("react").Component<any, any, any>>)> | Extract<"isNew", (keyof import("react").ClassAttributes<import("react").Component<T, any, any>> | keyof T) & ("children" | keyof T) & ("key" | "ref" | keyof T) & ("children" | keyof T | keyof import("react").ClassAttributes<import("react").Component<any, any, any>>)>>) & object>;
