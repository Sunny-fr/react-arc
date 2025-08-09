import { ARCConfig } from "../types/config.types";
import { ARCContainer, ARCContainerProps, ConnectorProps } from "../types/components.types";
import { ARCRootState } from "../types/connectors.types";
/**
 * Store Connector
 * @param {ARCConfig} config

 */
export declare function connectFn<Model, RequiredProps, OwnProps = {}>(config: ARCConfig<Model, RequiredProps>): (store: ARCRootState, ownProps: OwnProps) => ConnectorProps<Model, RequiredProps, OwnProps>;
export declare function withARC<Model, RequiredProps = {}, OwnProps = {}>(config: ARCConfig<Model, RequiredProps>): (Wrapped: ARCContainer<Model, RequiredProps, OwnProps>) => import("react-redux").ConnectedComponent<ARCContainer<Model, RequiredProps, OwnProps>, (import("react-redux").DistributiveOmit<ARCContainerProps<Model, RequiredProps, OwnProps>, Extract<string, ("error" | "loaded" | "loading" | "dispatch" | "modelKey" | "metaModel" | "metas" | "model" | "isNew" | keyof RequiredProps | keyof OwnProps | keyof import("../types/components.types").ContainerVitalProps<Model, RequiredProps, OwnProps>) & ("error" | "loaded" | "loading" | "dispatch" | "modelKey" | "metaModel" | "metas" | "model" | "isNew" | keyof RequiredProps | keyof OwnProps | keyof import("../types/components.types").ContainerVitalProps<Model, RequiredProps, OwnProps> | keyof import("react").ClassAttributes<import("react").Component<ARCContainerProps<Model, RequiredProps, OwnProps>, any, any>>)> | Extract<number, ("error" | "loaded" | "loading" | "dispatch" | "modelKey" | "metaModel" | "metas" | "model" | "isNew" | keyof RequiredProps | keyof OwnProps | keyof import("../types/components.types").ContainerVitalProps<Model, RequiredProps, OwnProps>) & ("error" | "loaded" | "loading" | "dispatch" | "modelKey" | "metaModel" | "metas" | "model" | "isNew" | keyof RequiredProps | keyof OwnProps | keyof import("../types/components.types").ContainerVitalProps<Model, RequiredProps, OwnProps> | keyof import("react").ClassAttributes<import("react").Component<ARCContainerProps<Model, RequiredProps, OwnProps>, any, any>>)> | Extract<symbol, ("error" | "loaded" | "loading" | "dispatch" | "modelKey" | "metaModel" | "metas" | "model" | "isNew" | keyof RequiredProps | keyof OwnProps | keyof import("../types/components.types").ContainerVitalProps<Model, RequiredProps, OwnProps>) & ("error" | "loaded" | "loading" | "dispatch" | "modelKey" | "metaModel" | "metas" | "model" | "isNew" | keyof RequiredProps | keyof OwnProps | keyof import("../types/components.types").ContainerVitalProps<Model, RequiredProps, OwnProps> | keyof import("react").ClassAttributes<import("react").Component<ARCContainerProps<Model, RequiredProps, OwnProps>, any, any>>)>> & RequiredProps & OwnProps & import("react-redux").ConnectPropsMaybeWithoutContext<RequiredProps & OwnProps & {
    modelKey: string | null;
    metaModel: import("..").ARCMetaModel<Model>;
    metas: import("..").ARCMetas;
    model: Model | null;
    loaded: boolean;
    error: any;
    loading: boolean;
    isNew: boolean;
} & {
    dispatch: import("redux-thunk").ThunkDispatch<any, any, any>;
} & import("../types/components.types").ContainerVitalProps<Model, RequiredProps, OwnProps>> extends infer T ? { [k in keyof T]: (import("react-redux").DistributiveOmit<ARCContainerProps<Model, RequiredProps, OwnProps>, Extract<string, ("error" | "loaded" | "loading" | "dispatch" | "modelKey" | "metaModel" | "metas" | "model" | "isNew" | keyof RequiredProps | keyof OwnProps | keyof import("../types/components.types").ContainerVitalProps<Model, RequiredProps, OwnProps>) & ("error" | "loaded" | "loading" | "dispatch" | "modelKey" | "metaModel" | "metas" | "model" | "isNew" | keyof RequiredProps | keyof OwnProps | keyof import("../types/components.types").ContainerVitalProps<Model, RequiredProps, OwnProps> | keyof import("react").ClassAttributes<import("react").Component<ARCContainerProps<Model, RequiredProps, OwnProps>, any, any>>)> | Extract<number, ("error" | "loaded" | "loading" | "dispatch" | "modelKey" | "metaModel" | "metas" | "model" | "isNew" | keyof RequiredProps | keyof OwnProps | keyof import("../types/components.types").ContainerVitalProps<Model, RequiredProps, OwnProps>) & ("error" | "loaded" | "loading" | "dispatch" | "modelKey" | "metaModel" | "metas" | "model" | "isNew" | keyof RequiredProps | keyof OwnProps | keyof import("../types/components.types").ContainerVitalProps<Model, RequiredProps, OwnProps> | keyof import("react").ClassAttributes<import("react").Component<ARCContainerProps<Model, RequiredProps, OwnProps>, any, any>>)> | Extract<symbol, ("error" | "loaded" | "loading" | "dispatch" | "modelKey" | "metaModel" | "metas" | "model" | "isNew" | keyof RequiredProps | keyof OwnProps | keyof import("../types/components.types").ContainerVitalProps<Model, RequiredProps, OwnProps>) & ("error" | "loaded" | "loading" | "dispatch" | "modelKey" | "metaModel" | "metas" | "model" | "isNew" | keyof RequiredProps | keyof OwnProps | keyof import("../types/components.types").ContainerVitalProps<Model, RequiredProps, OwnProps> | keyof import("react").ClassAttributes<import("react").Component<ARCContainerProps<Model, RequiredProps, OwnProps>, any, any>>)>> & RequiredProps & OwnProps & import("react-redux").ConnectPropsMaybeWithoutContext<RequiredProps & OwnProps & {
    modelKey: string | null;
    metaModel: import("..").ARCMetaModel<Model>;
    metas: import("..").ARCMetas;
    model: Model | null;
    loaded: boolean;
    error: any;
    loading: boolean;
    isNew: boolean;
} & {
    dispatch: import("redux-thunk").ThunkDispatch<any, any, any>;
} & import("../types/components.types").ContainerVitalProps<Model, RequiredProps, OwnProps>>)[k]; } : never) | (import("react-redux").DistributiveOmit<ARCContainerProps<Model, RequiredProps, OwnProps>, Extract<string, ("error" | "loaded" | "loading" | "dispatch" | "modelKey" | "metaModel" | "metas" | "model" | "isNew" | keyof RequiredProps | keyof OwnProps | keyof import("../types/components.types").ContainerVitalProps<Model, RequiredProps, OwnProps>) & ("error" | "loaded" | "loading" | "dispatch" | "modelKey" | "metaModel" | "metas" | "model" | "isNew" | keyof RequiredProps | keyof OwnProps | keyof import("../types/components.types").ContainerVitalProps<Model, RequiredProps, OwnProps> | keyof import("react").ClassAttributes<import("react").Component<ARCContainerProps<Model, RequiredProps, OwnProps>, any, any>>)> | Extract<number, ("error" | "loaded" | "loading" | "dispatch" | "modelKey" | "metaModel" | "metas" | "model" | "isNew" | keyof RequiredProps | keyof OwnProps | keyof import("../types/components.types").ContainerVitalProps<Model, RequiredProps, OwnProps>) & ("error" | "loaded" | "loading" | "dispatch" | "modelKey" | "metaModel" | "metas" | "model" | "isNew" | keyof RequiredProps | keyof OwnProps | keyof import("../types/components.types").ContainerVitalProps<Model, RequiredProps, OwnProps> | keyof import("react").ClassAttributes<import("react").Component<ARCContainerProps<Model, RequiredProps, OwnProps>, any, any>>)> | Extract<symbol, ("error" | "loaded" | "loading" | "dispatch" | "modelKey" | "metaModel" | "metas" | "model" | "isNew" | keyof RequiredProps | keyof OwnProps | keyof import("../types/components.types").ContainerVitalProps<Model, RequiredProps, OwnProps>) & ("error" | "loaded" | "loading" | "dispatch" | "modelKey" | "metaModel" | "metas" | "model" | "isNew" | keyof RequiredProps | keyof OwnProps | keyof import("../types/components.types").ContainerVitalProps<Model, RequiredProps, OwnProps> | keyof import("react").ClassAttributes<import("react").Component<ARCContainerProps<Model, RequiredProps, OwnProps>, any, any>>)>> & RequiredProps & OwnProps & import("react-redux").ConnectPropsMaybeWithoutContext<RequiredProps & OwnProps & import("react").ClassAttributes<import("react").Component<ARCContainerProps<Model, RequiredProps, OwnProps>, any, any>> & {
    modelKey: string | null;
    metaModel: import("..").ARCMetaModel<Model>;
    metas: import("..").ARCMetas;
    model: Model | null;
    loaded: boolean;
    error: any;
    loading: boolean;
    isNew: boolean;
} & {
    dispatch: import("redux-thunk").ThunkDispatch<any, any, any>;
} & import("../types/components.types").ContainerVitalProps<Model, RequiredProps, OwnProps>> extends infer T_1 ? { [k_1 in keyof T_1]: (import("react-redux").DistributiveOmit<ARCContainerProps<Model, RequiredProps, OwnProps>, Extract<string, ("error" | "loaded" | "loading" | "dispatch" | "modelKey" | "metaModel" | "metas" | "model" | "isNew" | keyof RequiredProps | keyof OwnProps | keyof import("../types/components.types").ContainerVitalProps<Model, RequiredProps, OwnProps>) & ("error" | "loaded" | "loading" | "dispatch" | "modelKey" | "metaModel" | "metas" | "model" | "isNew" | keyof RequiredProps | keyof OwnProps | keyof import("../types/components.types").ContainerVitalProps<Model, RequiredProps, OwnProps> | keyof import("react").ClassAttributes<import("react").Component<ARCContainerProps<Model, RequiredProps, OwnProps>, any, any>>)> | Extract<number, ("error" | "loaded" | "loading" | "dispatch" | "modelKey" | "metaModel" | "metas" | "model" | "isNew" | keyof RequiredProps | keyof OwnProps | keyof import("../types/components.types").ContainerVitalProps<Model, RequiredProps, OwnProps>) & ("error" | "loaded" | "loading" | "dispatch" | "modelKey" | "metaModel" | "metas" | "model" | "isNew" | keyof RequiredProps | keyof OwnProps | keyof import("../types/components.types").ContainerVitalProps<Model, RequiredProps, OwnProps> | keyof import("react").ClassAttributes<import("react").Component<ARCContainerProps<Model, RequiredProps, OwnProps>, any, any>>)> | Extract<symbol, ("error" | "loaded" | "loading" | "dispatch" | "modelKey" | "metaModel" | "metas" | "model" | "isNew" | keyof RequiredProps | keyof OwnProps | keyof import("../types/components.types").ContainerVitalProps<Model, RequiredProps, OwnProps>) & ("error" | "loaded" | "loading" | "dispatch" | "modelKey" | "metaModel" | "metas" | "model" | "isNew" | keyof RequiredProps | keyof OwnProps | keyof import("../types/components.types").ContainerVitalProps<Model, RequiredProps, OwnProps> | keyof import("react").ClassAttributes<import("react").Component<ARCContainerProps<Model, RequiredProps, OwnProps>, any, any>>)>> & RequiredProps & OwnProps & import("react-redux").ConnectPropsMaybeWithoutContext<RequiredProps & OwnProps & import("react").ClassAttributes<import("react").Component<ARCContainerProps<Model, RequiredProps, OwnProps>, any, any>> & {
    modelKey: string | null;
    metaModel: import("..").ARCMetaModel<Model>;
    metas: import("..").ARCMetas;
    model: Model | null;
    loaded: boolean;
    error: any;
    loading: boolean;
    isNew: boolean;
} & {
    dispatch: import("redux-thunk").ThunkDispatch<any, any, any>;
} & import("../types/components.types").ContainerVitalProps<Model, RequiredProps, OwnProps>>)[k_1]; } : never) | (import("react-redux").DistributiveOmit<import("react").ClassAttributes<import("react").Component<ARCContainerProps<Model, RequiredProps, OwnProps>, any, any>> & {
    modelKey: string | null;
    metaModel: import("..").ARCMetaModel<Model>;
    metas: import("..").ARCMetas;
    model: Model | null;
    loaded: boolean;
    error: any;
    loading: boolean;
    isNew: boolean;
} & {
    dispatch: import("redux-thunk").ThunkDispatch<any, any, any>;
} & RequiredProps & OwnProps & import("../types/components.types").ContainerVitalProps<Model, RequiredProps, OwnProps>, Extract<string, ("error" | "loaded" | "loading" | "dispatch" | "modelKey" | "metaModel" | "metas" | "model" | "isNew" | keyof RequiredProps | keyof OwnProps | keyof import("../types/components.types").ContainerVitalProps<Model, RequiredProps, OwnProps>) & ("error" | "loaded" | "loading" | "dispatch" | "modelKey" | "metaModel" | "metas" | "model" | "isNew" | keyof RequiredProps | keyof OwnProps | keyof import("../types/components.types").ContainerVitalProps<Model, RequiredProps, OwnProps> | keyof import("react").ClassAttributes<import("react").Component<ARCContainerProps<Model, RequiredProps, OwnProps>, any, any>>)> | Extract<number, ("error" | "loaded" | "loading" | "dispatch" | "modelKey" | "metaModel" | "metas" | "model" | "isNew" | keyof RequiredProps | keyof OwnProps | keyof import("../types/components.types").ContainerVitalProps<Model, RequiredProps, OwnProps>) & ("error" | "loaded" | "loading" | "dispatch" | "modelKey" | "metaModel" | "metas" | "model" | "isNew" | keyof RequiredProps | keyof OwnProps | keyof import("../types/components.types").ContainerVitalProps<Model, RequiredProps, OwnProps> | keyof import("react").ClassAttributes<import("react").Component<ARCContainerProps<Model, RequiredProps, OwnProps>, any, any>>)> | Extract<symbol, ("error" | "loaded" | "loading" | "dispatch" | "modelKey" | "metaModel" | "metas" | "model" | "isNew" | keyof RequiredProps | keyof OwnProps | keyof import("../types/components.types").ContainerVitalProps<Model, RequiredProps, OwnProps>) & ("error" | "loaded" | "loading" | "dispatch" | "modelKey" | "metaModel" | "metas" | "model" | "isNew" | keyof RequiredProps | keyof OwnProps | keyof import("../types/components.types").ContainerVitalProps<Model, RequiredProps, OwnProps> | keyof import("react").ClassAttributes<import("react").Component<ARCContainerProps<Model, RequiredProps, OwnProps>, any, any>>)>> & RequiredProps & OwnProps & import("react-redux").ConnectPropsMaybeWithoutContext<RequiredProps & OwnProps & {
    modelKey: string | null;
    metaModel: import("..").ARCMetaModel<Model>;
    metas: import("..").ARCMetas;
    model: Model | null;
    loaded: boolean;
    error: any;
    loading: boolean;
    isNew: boolean;
} & {
    dispatch: import("redux-thunk").ThunkDispatch<any, any, any>;
} & import("../types/components.types").ContainerVitalProps<Model, RequiredProps, OwnProps>> extends infer T_2 ? { [k_2 in keyof T_2]: (import("react-redux").DistributiveOmit<import("react").ClassAttributes<import("react").Component<ARCContainerProps<Model, RequiredProps, OwnProps>, any, any>> & {
    modelKey: string | null;
    metaModel: import("..").ARCMetaModel<Model>;
    metas: import("..").ARCMetas;
    model: Model | null;
    loaded: boolean;
    error: any;
    loading: boolean;
    isNew: boolean;
} & {
    dispatch: import("redux-thunk").ThunkDispatch<any, any, any>;
} & RequiredProps & OwnProps & import("../types/components.types").ContainerVitalProps<Model, RequiredProps, OwnProps>, Extract<string, ("error" | "loaded" | "loading" | "dispatch" | "modelKey" | "metaModel" | "metas" | "model" | "isNew" | keyof RequiredProps | keyof OwnProps | keyof import("../types/components.types").ContainerVitalProps<Model, RequiredProps, OwnProps>) & ("error" | "loaded" | "loading" | "dispatch" | "modelKey" | "metaModel" | "metas" | "model" | "isNew" | keyof RequiredProps | keyof OwnProps | keyof import("../types/components.types").ContainerVitalProps<Model, RequiredProps, OwnProps> | keyof import("react").ClassAttributes<import("react").Component<ARCContainerProps<Model, RequiredProps, OwnProps>, any, any>>)> | Extract<number, ("error" | "loaded" | "loading" | "dispatch" | "modelKey" | "metaModel" | "metas" | "model" | "isNew" | keyof RequiredProps | keyof OwnProps | keyof import("../types/components.types").ContainerVitalProps<Model, RequiredProps, OwnProps>) & ("error" | "loaded" | "loading" | "dispatch" | "modelKey" | "metaModel" | "metas" | "model" | "isNew" | keyof RequiredProps | keyof OwnProps | keyof import("../types/components.types").ContainerVitalProps<Model, RequiredProps, OwnProps> | keyof import("react").ClassAttributes<import("react").Component<ARCContainerProps<Model, RequiredProps, OwnProps>, any, any>>)> | Extract<symbol, ("error" | "loaded" | "loading" | "dispatch" | "modelKey" | "metaModel" | "metas" | "model" | "isNew" | keyof RequiredProps | keyof OwnProps | keyof import("../types/components.types").ContainerVitalProps<Model, RequiredProps, OwnProps>) & ("error" | "loaded" | "loading" | "dispatch" | "modelKey" | "metaModel" | "metas" | "model" | "isNew" | keyof RequiredProps | keyof OwnProps | keyof import("../types/components.types").ContainerVitalProps<Model, RequiredProps, OwnProps> | keyof import("react").ClassAttributes<import("react").Component<ARCContainerProps<Model, RequiredProps, OwnProps>, any, any>>)>> & RequiredProps & OwnProps & import("react-redux").ConnectPropsMaybeWithoutContext<RequiredProps & OwnProps & {
    modelKey: string | null;
    metaModel: import("..").ARCMetaModel<Model>;
    metas: import("..").ARCMetas;
    model: Model | null;
    loaded: boolean;
    error: any;
    loading: boolean;
    isNew: boolean;
} & {
    dispatch: import("redux-thunk").ThunkDispatch<any, any, any>;
} & import("../types/components.types").ContainerVitalProps<Model, RequiredProps, OwnProps>>)[k_2]; } : never) | (import("react-redux").DistributiveOmit<import("react").ClassAttributes<import("react").Component<ARCContainerProps<Model, RequiredProps, OwnProps>, any, any>> & {
    modelKey: string | null;
    metaModel: import("..").ARCMetaModel<Model>;
    metas: import("..").ARCMetas;
    model: Model | null;
    loaded: boolean;
    error: any;
    loading: boolean;
    isNew: boolean;
} & {
    dispatch: import("redux-thunk").ThunkDispatch<any, any, any>;
} & RequiredProps & OwnProps & import("../types/components.types").ContainerVitalProps<Model, RequiredProps, OwnProps>, Extract<string, ("error" | "loaded" | "loading" | "dispatch" | "modelKey" | "metaModel" | "metas" | "model" | "isNew" | keyof RequiredProps | keyof OwnProps | keyof import("../types/components.types").ContainerVitalProps<Model, RequiredProps, OwnProps>) & ("error" | "loaded" | "loading" | "dispatch" | "modelKey" | "metaModel" | "metas" | "model" | "isNew" | keyof RequiredProps | keyof OwnProps | keyof import("../types/components.types").ContainerVitalProps<Model, RequiredProps, OwnProps> | keyof import("react").ClassAttributes<import("react").Component<ARCContainerProps<Model, RequiredProps, OwnProps>, any, any>>)> | Extract<number, ("error" | "loaded" | "loading" | "dispatch" | "modelKey" | "metaModel" | "metas" | "model" | "isNew" | keyof RequiredProps | keyof OwnProps | keyof import("../types/components.types").ContainerVitalProps<Model, RequiredProps, OwnProps>) & ("error" | "loaded" | "loading" | "dispatch" | "modelKey" | "metaModel" | "metas" | "model" | "isNew" | keyof RequiredProps | keyof OwnProps | keyof import("../types/components.types").ContainerVitalProps<Model, RequiredProps, OwnProps> | keyof import("react").ClassAttributes<import("react").Component<ARCContainerProps<Model, RequiredProps, OwnProps>, any, any>>)> | Extract<symbol, ("error" | "loaded" | "loading" | "dispatch" | "modelKey" | "metaModel" | "metas" | "model" | "isNew" | keyof RequiredProps | keyof OwnProps | keyof import("../types/components.types").ContainerVitalProps<Model, RequiredProps, OwnProps>) & ("error" | "loaded" | "loading" | "dispatch" | "modelKey" | "metaModel" | "metas" | "model" | "isNew" | keyof RequiredProps | keyof OwnProps | keyof import("../types/components.types").ContainerVitalProps<Model, RequiredProps, OwnProps> | keyof import("react").ClassAttributes<import("react").Component<ARCContainerProps<Model, RequiredProps, OwnProps>, any, any>>)>> & RequiredProps & OwnProps & import("react-redux").ConnectPropsMaybeWithoutContext<RequiredProps & OwnProps & import("react").ClassAttributes<import("react").Component<ARCContainerProps<Model, RequiredProps, OwnProps>, any, any>> & {
    modelKey: string | null;
    metaModel: import("..").ARCMetaModel<Model>;
    metas: import("..").ARCMetas;
    model: Model | null;
    loaded: boolean;
    error: any;
    loading: boolean;
    isNew: boolean;
} & {
    dispatch: import("redux-thunk").ThunkDispatch<any, any, any>;
} & import("../types/components.types").ContainerVitalProps<Model, RequiredProps, OwnProps>> extends infer T_3 ? { [k_3 in keyof T_3]: (import("react-redux").DistributiveOmit<import("react").ClassAttributes<import("react").Component<ARCContainerProps<Model, RequiredProps, OwnProps>, any, any>> & {
    modelKey: string | null;
    metaModel: import("..").ARCMetaModel<Model>;
    metas: import("..").ARCMetas;
    model: Model | null;
    loaded: boolean;
    error: any;
    loading: boolean;
    isNew: boolean;
} & {
    dispatch: import("redux-thunk").ThunkDispatch<any, any, any>;
} & RequiredProps & OwnProps & import("../types/components.types").ContainerVitalProps<Model, RequiredProps, OwnProps>, Extract<string, ("error" | "loaded" | "loading" | "dispatch" | "modelKey" | "metaModel" | "metas" | "model" | "isNew" | keyof RequiredProps | keyof OwnProps | keyof import("../types/components.types").ContainerVitalProps<Model, RequiredProps, OwnProps>) & ("error" | "loaded" | "loading" | "dispatch" | "modelKey" | "metaModel" | "metas" | "model" | "isNew" | keyof RequiredProps | keyof OwnProps | keyof import("../types/components.types").ContainerVitalProps<Model, RequiredProps, OwnProps> | keyof import("react").ClassAttributes<import("react").Component<ARCContainerProps<Model, RequiredProps, OwnProps>, any, any>>)> | Extract<number, ("error" | "loaded" | "loading" | "dispatch" | "modelKey" | "metaModel" | "metas" | "model" | "isNew" | keyof RequiredProps | keyof OwnProps | keyof import("../types/components.types").ContainerVitalProps<Model, RequiredProps, OwnProps>) & ("error" | "loaded" | "loading" | "dispatch" | "modelKey" | "metaModel" | "metas" | "model" | "isNew" | keyof RequiredProps | keyof OwnProps | keyof import("../types/components.types").ContainerVitalProps<Model, RequiredProps, OwnProps> | keyof import("react").ClassAttributes<import("react").Component<ARCContainerProps<Model, RequiredProps, OwnProps>, any, any>>)> | Extract<symbol, ("error" | "loaded" | "loading" | "dispatch" | "modelKey" | "metaModel" | "metas" | "model" | "isNew" | keyof RequiredProps | keyof OwnProps | keyof import("../types/components.types").ContainerVitalProps<Model, RequiredProps, OwnProps>) & ("error" | "loaded" | "loading" | "dispatch" | "modelKey" | "metaModel" | "metas" | "model" | "isNew" | keyof RequiredProps | keyof OwnProps | keyof import("../types/components.types").ContainerVitalProps<Model, RequiredProps, OwnProps> | keyof import("react").ClassAttributes<import("react").Component<ARCContainerProps<Model, RequiredProps, OwnProps>, any, any>>)>> & RequiredProps & OwnProps & import("react-redux").ConnectPropsMaybeWithoutContext<RequiredProps & OwnProps & import("react").ClassAttributes<import("react").Component<ARCContainerProps<Model, RequiredProps, OwnProps>, any, any>> & {
    modelKey: string | null;
    metaModel: import("..").ARCMetaModel<Model>;
    metas: import("..").ARCMetas;
    model: Model | null;
    loaded: boolean;
    error: any;
    loading: boolean;
    isNew: boolean;
} & {
    dispatch: import("redux-thunk").ThunkDispatch<any, any, any>;
} & import("../types/components.types").ContainerVitalProps<Model, RequiredProps, OwnProps>>)[k_3]; } : never)>;
