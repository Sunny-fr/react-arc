import { ARCConfig } from "../types/config.types";
import { ComponentType } from "react";
import { ARCRootState, ARCStoreState } from "../types/connectors.types";
import { ThunkDispatch } from "redux-thunk";
interface ARCConnected<Model> {
    ARCConfig: ARCConfig<Model>;
    ARCReducerState: ARCStoreState<Model>;
    loaded: boolean;
    metaModel: any;
    model: any;
    error: any;
    syncing: boolean;
    metas: object;
    isNew: boolean;
    dispatch?: ThunkDispatch<any, any, any>;
}
/**
 * Store Connector
 * @param {ARCConfig} config

 */
export declare function connectFn<Model, P extends object = {}>(config: ARCConfig<Model>): (store: ARCRootState, ownProps: P) => ARCConnected<Model> & P;
/**
 *
 * @param {ARCConfig} config
 * @return {function(Component)<ARCWrappedComponent>}
 */
export declare function withARC<Model>(config: ARCConfig<Model>): <P extends object = {}>(Wrapped: ComponentType<P & ARCConnected<Model> & {
    ARCConfig: ARCConfig<Model>;
} & {
    ARCReducerState: ARCStoreState<Model>;
}>) => import("react-redux").ConnectedComponent<ComponentType<P & ARCConnected<Model> & {
    ARCConfig: ARCConfig<Model>;
} & {
    ARCReducerState: ARCStoreState<Model>;
}>, (import("react-redux").DistributiveOmit<P & ARCConnected<Model> & {
    ARCConfig: ARCConfig<Model>;
} & {
    ARCReducerState: ARCStoreState<Model>;
}, Extract<"error", (keyof ARCConnected<Model> | keyof P) & (keyof ARCConnected<Model> | keyof P | keyof import("react").ClassAttributes<import("react").Component<P & ARCConnected<Model> & {
    ARCConfig: ARCConfig<Model>;
} & {
    ARCReducerState: ARCStoreState<Model>;
}, any, any>>)> | Extract<"loaded", (keyof ARCConnected<Model> | keyof P) & (keyof ARCConnected<Model> | keyof P | keyof import("react").ClassAttributes<import("react").Component<P & ARCConnected<Model> & {
    ARCConfig: ARCConfig<Model>;
} & {
    ARCReducerState: ARCStoreState<Model>;
}, any, any>>)> | Extract<"dispatch", (keyof ARCConnected<Model> | keyof P) & (keyof ARCConnected<Model> | keyof P | keyof import("react").ClassAttributes<import("react").Component<P & ARCConnected<Model> & {
    ARCConfig: ARCConfig<Model>;
} & {
    ARCReducerState: ARCStoreState<Model>;
}, any, any>>)> | Extract<"ARCConfig", (keyof ARCConnected<Model> | keyof P) & (keyof ARCConnected<Model> | keyof P | keyof import("react").ClassAttributes<import("react").Component<P & ARCConnected<Model> & {
    ARCConfig: ARCConfig<Model>;
} & {
    ARCReducerState: ARCStoreState<Model>;
}, any, any>>)> | Extract<"ARCReducerState", (keyof ARCConnected<Model> | keyof P) & (keyof ARCConnected<Model> | keyof P | keyof import("react").ClassAttributes<import("react").Component<P & ARCConnected<Model> & {
    ARCConfig: ARCConfig<Model>;
} & {
    ARCReducerState: ARCStoreState<Model>;
}, any, any>>)> | Extract<"model", (keyof ARCConnected<Model> | keyof P) & (keyof ARCConnected<Model> | keyof P | keyof import("react").ClassAttributes<import("react").Component<P & ARCConnected<Model> & {
    ARCConfig: ARCConfig<Model>;
} & {
    ARCReducerState: ARCStoreState<Model>;
}, any, any>>)> | Extract<"metas", (keyof ARCConnected<Model> | keyof P) & (keyof ARCConnected<Model> | keyof P | keyof import("react").ClassAttributes<import("react").Component<P & ARCConnected<Model> & {
    ARCConfig: ARCConfig<Model>;
} & {
    ARCReducerState: ARCStoreState<Model>;
}, any, any>>)> | Extract<"syncing", (keyof ARCConnected<Model> | keyof P) & (keyof ARCConnected<Model> | keyof P | keyof import("react").ClassAttributes<import("react").Component<P & ARCConnected<Model> & {
    ARCConfig: ARCConfig<Model>;
} & {
    ARCReducerState: ARCStoreState<Model>;
}, any, any>>)> | Extract<"metaModel", (keyof ARCConnected<Model> | keyof P) & (keyof ARCConnected<Model> | keyof P | keyof import("react").ClassAttributes<import("react").Component<P & ARCConnected<Model> & {
    ARCConfig: ARCConfig<Model>;
} & {
    ARCReducerState: ARCStoreState<Model>;
}, any, any>>)> | Extract<"isNew", (keyof ARCConnected<Model> | keyof P) & (keyof ARCConnected<Model> | keyof P | keyof import("react").ClassAttributes<import("react").Component<P & ARCConnected<Model> & {
    ARCConfig: ARCConfig<Model>;
} & {
    ARCReducerState: ARCStoreState<Model>;
}, any, any>>)> | Extract<keyof P, (keyof ARCConnected<Model> | keyof P) & (keyof ARCConnected<Model> | keyof P | keyof import("react").ClassAttributes<import("react").Component<P & ARCConnected<Model> & {
    ARCConfig: ARCConfig<Model>;
} & {
    ARCReducerState: ARCStoreState<Model>;
}, any, any>>)>> & P & import("react-redux").ConnectPropsMaybeWithoutContext<P & ARCConnected<Model> & {
    ARCConfig: ARCConfig<Model>;
} & {
    ARCReducerState: ARCStoreState<Model>;
}> extends infer T ? { [k in keyof T]: (import("react-redux").DistributiveOmit<P & ARCConnected<Model> & {
    ARCConfig: ARCConfig<Model>;
} & {
    ARCReducerState: ARCStoreState<Model>;
}, Extract<"error", (keyof ARCConnected<Model> | keyof P) & (keyof ARCConnected<Model> | keyof P | keyof import("react").ClassAttributes<import("react").Component<P & ARCConnected<Model> & {
    ARCConfig: ARCConfig<Model>;
} & {
    ARCReducerState: ARCStoreState<Model>;
}, any, any>>)> | Extract<"loaded", (keyof ARCConnected<Model> | keyof P) & (keyof ARCConnected<Model> | keyof P | keyof import("react").ClassAttributes<import("react").Component<P & ARCConnected<Model> & {
    ARCConfig: ARCConfig<Model>;
} & {
    ARCReducerState: ARCStoreState<Model>;
}, any, any>>)> | Extract<"dispatch", (keyof ARCConnected<Model> | keyof P) & (keyof ARCConnected<Model> | keyof P | keyof import("react").ClassAttributes<import("react").Component<P & ARCConnected<Model> & {
    ARCConfig: ARCConfig<Model>;
} & {
    ARCReducerState: ARCStoreState<Model>;
}, any, any>>)> | Extract<"ARCConfig", (keyof ARCConnected<Model> | keyof P) & (keyof ARCConnected<Model> | keyof P | keyof import("react").ClassAttributes<import("react").Component<P & ARCConnected<Model> & {
    ARCConfig: ARCConfig<Model>;
} & {
    ARCReducerState: ARCStoreState<Model>;
}, any, any>>)> | Extract<"ARCReducerState", (keyof ARCConnected<Model> | keyof P) & (keyof ARCConnected<Model> | keyof P | keyof import("react").ClassAttributes<import("react").Component<P & ARCConnected<Model> & {
    ARCConfig: ARCConfig<Model>;
} & {
    ARCReducerState: ARCStoreState<Model>;
}, any, any>>)> | Extract<"model", (keyof ARCConnected<Model> | keyof P) & (keyof ARCConnected<Model> | keyof P | keyof import("react").ClassAttributes<import("react").Component<P & ARCConnected<Model> & {
    ARCConfig: ARCConfig<Model>;
} & {
    ARCReducerState: ARCStoreState<Model>;
}, any, any>>)> | Extract<"metas", (keyof ARCConnected<Model> | keyof P) & (keyof ARCConnected<Model> | keyof P | keyof import("react").ClassAttributes<import("react").Component<P & ARCConnected<Model> & {
    ARCConfig: ARCConfig<Model>;
} & {
    ARCReducerState: ARCStoreState<Model>;
}, any, any>>)> | Extract<"syncing", (keyof ARCConnected<Model> | keyof P) & (keyof ARCConnected<Model> | keyof P | keyof import("react").ClassAttributes<import("react").Component<P & ARCConnected<Model> & {
    ARCConfig: ARCConfig<Model>;
} & {
    ARCReducerState: ARCStoreState<Model>;
}, any, any>>)> | Extract<"metaModel", (keyof ARCConnected<Model> | keyof P) & (keyof ARCConnected<Model> | keyof P | keyof import("react").ClassAttributes<import("react").Component<P & ARCConnected<Model> & {
    ARCConfig: ARCConfig<Model>;
} & {
    ARCReducerState: ARCStoreState<Model>;
}, any, any>>)> | Extract<"isNew", (keyof ARCConnected<Model> | keyof P) & (keyof ARCConnected<Model> | keyof P | keyof import("react").ClassAttributes<import("react").Component<P & ARCConnected<Model> & {
    ARCConfig: ARCConfig<Model>;
} & {
    ARCReducerState: ARCStoreState<Model>;
}, any, any>>)> | Extract<keyof P, (keyof ARCConnected<Model> | keyof P) & (keyof ARCConnected<Model> | keyof P | keyof import("react").ClassAttributes<import("react").Component<P & ARCConnected<Model> & {
    ARCConfig: ARCConfig<Model>;
} & {
    ARCReducerState: ARCStoreState<Model>;
}, any, any>>)>> & P & import("react-redux").ConnectPropsMaybeWithoutContext<P & ARCConnected<Model> & {
    ARCConfig: ARCConfig<Model>;
} & {
    ARCReducerState: ARCStoreState<Model>;
}>)[k]; } : never) | (import("react-redux").DistributiveOmit<P & ARCConnected<Model> & {
    ARCConfig: ARCConfig<Model>;
} & {
    ARCReducerState: ARCStoreState<Model>;
}, Extract<"error", (keyof ARCConnected<Model> | keyof P) & (keyof ARCConnected<Model> | keyof P | keyof import("react").ClassAttributes<import("react").Component<P & ARCConnected<Model> & {
    ARCConfig: ARCConfig<Model>;
} & {
    ARCReducerState: ARCStoreState<Model>;
}, any, any>>)> | Extract<"loaded", (keyof ARCConnected<Model> | keyof P) & (keyof ARCConnected<Model> | keyof P | keyof import("react").ClassAttributes<import("react").Component<P & ARCConnected<Model> & {
    ARCConfig: ARCConfig<Model>;
} & {
    ARCReducerState: ARCStoreState<Model>;
}, any, any>>)> | Extract<"dispatch", (keyof ARCConnected<Model> | keyof P) & (keyof ARCConnected<Model> | keyof P | keyof import("react").ClassAttributes<import("react").Component<P & ARCConnected<Model> & {
    ARCConfig: ARCConfig<Model>;
} & {
    ARCReducerState: ARCStoreState<Model>;
}, any, any>>)> | Extract<"ARCConfig", (keyof ARCConnected<Model> | keyof P) & (keyof ARCConnected<Model> | keyof P | keyof import("react").ClassAttributes<import("react").Component<P & ARCConnected<Model> & {
    ARCConfig: ARCConfig<Model>;
} & {
    ARCReducerState: ARCStoreState<Model>;
}, any, any>>)> | Extract<"ARCReducerState", (keyof ARCConnected<Model> | keyof P) & (keyof ARCConnected<Model> | keyof P | keyof import("react").ClassAttributes<import("react").Component<P & ARCConnected<Model> & {
    ARCConfig: ARCConfig<Model>;
} & {
    ARCReducerState: ARCStoreState<Model>;
}, any, any>>)> | Extract<"model", (keyof ARCConnected<Model> | keyof P) & (keyof ARCConnected<Model> | keyof P | keyof import("react").ClassAttributes<import("react").Component<P & ARCConnected<Model> & {
    ARCConfig: ARCConfig<Model>;
} & {
    ARCReducerState: ARCStoreState<Model>;
}, any, any>>)> | Extract<"metas", (keyof ARCConnected<Model> | keyof P) & (keyof ARCConnected<Model> | keyof P | keyof import("react").ClassAttributes<import("react").Component<P & ARCConnected<Model> & {
    ARCConfig: ARCConfig<Model>;
} & {
    ARCReducerState: ARCStoreState<Model>;
}, any, any>>)> | Extract<"syncing", (keyof ARCConnected<Model> | keyof P) & (keyof ARCConnected<Model> | keyof P | keyof import("react").ClassAttributes<import("react").Component<P & ARCConnected<Model> & {
    ARCConfig: ARCConfig<Model>;
} & {
    ARCReducerState: ARCStoreState<Model>;
}, any, any>>)> | Extract<"metaModel", (keyof ARCConnected<Model> | keyof P) & (keyof ARCConnected<Model> | keyof P | keyof import("react").ClassAttributes<import("react").Component<P & ARCConnected<Model> & {
    ARCConfig: ARCConfig<Model>;
} & {
    ARCReducerState: ARCStoreState<Model>;
}, any, any>>)> | Extract<"isNew", (keyof ARCConnected<Model> | keyof P) & (keyof ARCConnected<Model> | keyof P | keyof import("react").ClassAttributes<import("react").Component<P & ARCConnected<Model> & {
    ARCConfig: ARCConfig<Model>;
} & {
    ARCReducerState: ARCStoreState<Model>;
}, any, any>>)> | Extract<keyof P, (keyof ARCConnected<Model> | keyof P) & (keyof ARCConnected<Model> | keyof P | keyof import("react").ClassAttributes<import("react").Component<P & ARCConnected<Model> & {
    ARCConfig: ARCConfig<Model>;
} & {
    ARCReducerState: ARCStoreState<Model>;
}, any, any>>)>> & P & import("react-redux").ConnectPropsMaybeWithoutContext<P & import("react").ClassAttributes<import("react").Component<P & ARCConnected<Model> & {
    ARCConfig: ARCConfig<Model>;
} & {
    ARCReducerState: ARCStoreState<Model>;
}, any, any>> & ARCConnected<Model> & {
    ARCConfig: ARCConfig<Model>;
} & {
    ARCReducerState: ARCStoreState<Model>;
}> extends infer T_1 ? { [k_1 in keyof T_1]: (import("react-redux").DistributiveOmit<P & ARCConnected<Model> & {
    ARCConfig: ARCConfig<Model>;
} & {
    ARCReducerState: ARCStoreState<Model>;
}, Extract<"error", (keyof ARCConnected<Model> | keyof P) & (keyof ARCConnected<Model> | keyof P | keyof import("react").ClassAttributes<import("react").Component<P & ARCConnected<Model> & {
    ARCConfig: ARCConfig<Model>;
} & {
    ARCReducerState: ARCStoreState<Model>;
}, any, any>>)> | Extract<"loaded", (keyof ARCConnected<Model> | keyof P) & (keyof ARCConnected<Model> | keyof P | keyof import("react").ClassAttributes<import("react").Component<P & ARCConnected<Model> & {
    ARCConfig: ARCConfig<Model>;
} & {
    ARCReducerState: ARCStoreState<Model>;
}, any, any>>)> | Extract<"dispatch", (keyof ARCConnected<Model> | keyof P) & (keyof ARCConnected<Model> | keyof P | keyof import("react").ClassAttributes<import("react").Component<P & ARCConnected<Model> & {
    ARCConfig: ARCConfig<Model>;
} & {
    ARCReducerState: ARCStoreState<Model>;
}, any, any>>)> | Extract<"ARCConfig", (keyof ARCConnected<Model> | keyof P) & (keyof ARCConnected<Model> | keyof P | keyof import("react").ClassAttributes<import("react").Component<P & ARCConnected<Model> & {
    ARCConfig: ARCConfig<Model>;
} & {
    ARCReducerState: ARCStoreState<Model>;
}, any, any>>)> | Extract<"ARCReducerState", (keyof ARCConnected<Model> | keyof P) & (keyof ARCConnected<Model> | keyof P | keyof import("react").ClassAttributes<import("react").Component<P & ARCConnected<Model> & {
    ARCConfig: ARCConfig<Model>;
} & {
    ARCReducerState: ARCStoreState<Model>;
}, any, any>>)> | Extract<"model", (keyof ARCConnected<Model> | keyof P) & (keyof ARCConnected<Model> | keyof P | keyof import("react").ClassAttributes<import("react").Component<P & ARCConnected<Model> & {
    ARCConfig: ARCConfig<Model>;
} & {
    ARCReducerState: ARCStoreState<Model>;
}, any, any>>)> | Extract<"metas", (keyof ARCConnected<Model> | keyof P) & (keyof ARCConnected<Model> | keyof P | keyof import("react").ClassAttributes<import("react").Component<P & ARCConnected<Model> & {
    ARCConfig: ARCConfig<Model>;
} & {
    ARCReducerState: ARCStoreState<Model>;
}, any, any>>)> | Extract<"syncing", (keyof ARCConnected<Model> | keyof P) & (keyof ARCConnected<Model> | keyof P | keyof import("react").ClassAttributes<import("react").Component<P & ARCConnected<Model> & {
    ARCConfig: ARCConfig<Model>;
} & {
    ARCReducerState: ARCStoreState<Model>;
}, any, any>>)> | Extract<"metaModel", (keyof ARCConnected<Model> | keyof P) & (keyof ARCConnected<Model> | keyof P | keyof import("react").ClassAttributes<import("react").Component<P & ARCConnected<Model> & {
    ARCConfig: ARCConfig<Model>;
} & {
    ARCReducerState: ARCStoreState<Model>;
}, any, any>>)> | Extract<"isNew", (keyof ARCConnected<Model> | keyof P) & (keyof ARCConnected<Model> | keyof P | keyof import("react").ClassAttributes<import("react").Component<P & ARCConnected<Model> & {
    ARCConfig: ARCConfig<Model>;
} & {
    ARCReducerState: ARCStoreState<Model>;
}, any, any>>)> | Extract<keyof P, (keyof ARCConnected<Model> | keyof P) & (keyof ARCConnected<Model> | keyof P | keyof import("react").ClassAttributes<import("react").Component<P & ARCConnected<Model> & {
    ARCConfig: ARCConfig<Model>;
} & {
    ARCReducerState: ARCStoreState<Model>;
}, any, any>>)>> & P & import("react-redux").ConnectPropsMaybeWithoutContext<P & import("react").ClassAttributes<import("react").Component<P & ARCConnected<Model> & {
    ARCConfig: ARCConfig<Model>;
} & {
    ARCReducerState: ARCStoreState<Model>;
}, any, any>> & ARCConnected<Model> & {
    ARCConfig: ARCConfig<Model>;
} & {
    ARCReducerState: ARCStoreState<Model>;
}>)[k_1]; } : never) | (import("react-redux").DistributiveOmit<import("react").ClassAttributes<import("react").Component<P & ARCConnected<Model> & {
    ARCConfig: ARCConfig<Model>;
} & {
    ARCReducerState: ARCStoreState<Model>;
}, any, any>> & P & ARCConnected<Model> & {
    ARCConfig: ARCConfig<Model>;
} & {
    ARCReducerState: ARCStoreState<Model>;
}, Extract<"error", (keyof ARCConnected<Model> | keyof P) & (keyof ARCConnected<Model> | keyof P | keyof import("react").ClassAttributes<import("react").Component<P & ARCConnected<Model> & {
    ARCConfig: ARCConfig<Model>;
} & {
    ARCReducerState: ARCStoreState<Model>;
}, any, any>>)> | Extract<"loaded", (keyof ARCConnected<Model> | keyof P) & (keyof ARCConnected<Model> | keyof P | keyof import("react").ClassAttributes<import("react").Component<P & ARCConnected<Model> & {
    ARCConfig: ARCConfig<Model>;
} & {
    ARCReducerState: ARCStoreState<Model>;
}, any, any>>)> | Extract<"dispatch", (keyof ARCConnected<Model> | keyof P) & (keyof ARCConnected<Model> | keyof P | keyof import("react").ClassAttributes<import("react").Component<P & ARCConnected<Model> & {
    ARCConfig: ARCConfig<Model>;
} & {
    ARCReducerState: ARCStoreState<Model>;
}, any, any>>)> | Extract<"ARCConfig", (keyof ARCConnected<Model> | keyof P) & (keyof ARCConnected<Model> | keyof P | keyof import("react").ClassAttributes<import("react").Component<P & ARCConnected<Model> & {
    ARCConfig: ARCConfig<Model>;
} & {
    ARCReducerState: ARCStoreState<Model>;
}, any, any>>)> | Extract<"ARCReducerState", (keyof ARCConnected<Model> | keyof P) & (keyof ARCConnected<Model> | keyof P | keyof import("react").ClassAttributes<import("react").Component<P & ARCConnected<Model> & {
    ARCConfig: ARCConfig<Model>;
} & {
    ARCReducerState: ARCStoreState<Model>;
}, any, any>>)> | Extract<"model", (keyof ARCConnected<Model> | keyof P) & (keyof ARCConnected<Model> | keyof P | keyof import("react").ClassAttributes<import("react").Component<P & ARCConnected<Model> & {
    ARCConfig: ARCConfig<Model>;
} & {
    ARCReducerState: ARCStoreState<Model>;
}, any, any>>)> | Extract<"metas", (keyof ARCConnected<Model> | keyof P) & (keyof ARCConnected<Model> | keyof P | keyof import("react").ClassAttributes<import("react").Component<P & ARCConnected<Model> & {
    ARCConfig: ARCConfig<Model>;
} & {
    ARCReducerState: ARCStoreState<Model>;
}, any, any>>)> | Extract<"syncing", (keyof ARCConnected<Model> | keyof P) & (keyof ARCConnected<Model> | keyof P | keyof import("react").ClassAttributes<import("react").Component<P & ARCConnected<Model> & {
    ARCConfig: ARCConfig<Model>;
} & {
    ARCReducerState: ARCStoreState<Model>;
}, any, any>>)> | Extract<"metaModel", (keyof ARCConnected<Model> | keyof P) & (keyof ARCConnected<Model> | keyof P | keyof import("react").ClassAttributes<import("react").Component<P & ARCConnected<Model> & {
    ARCConfig: ARCConfig<Model>;
} & {
    ARCReducerState: ARCStoreState<Model>;
}, any, any>>)> | Extract<"isNew", (keyof ARCConnected<Model> | keyof P) & (keyof ARCConnected<Model> | keyof P | keyof import("react").ClassAttributes<import("react").Component<P & ARCConnected<Model> & {
    ARCConfig: ARCConfig<Model>;
} & {
    ARCReducerState: ARCStoreState<Model>;
}, any, any>>)> | Extract<keyof P, (keyof ARCConnected<Model> | keyof P) & (keyof ARCConnected<Model> | keyof P | keyof import("react").ClassAttributes<import("react").Component<P & ARCConnected<Model> & {
    ARCConfig: ARCConfig<Model>;
} & {
    ARCReducerState: ARCStoreState<Model>;
}, any, any>>)>> & P & import("react-redux").ConnectPropsMaybeWithoutContext<P & ARCConnected<Model> & {
    ARCConfig: ARCConfig<Model>;
} & {
    ARCReducerState: ARCStoreState<Model>;
}> extends infer T_2 ? { [k_2 in keyof T_2]: (import("react-redux").DistributiveOmit<import("react").ClassAttributes<import("react").Component<P & ARCConnected<Model> & {
    ARCConfig: ARCConfig<Model>;
} & {
    ARCReducerState: ARCStoreState<Model>;
}, any, any>> & P & ARCConnected<Model> & {
    ARCConfig: ARCConfig<Model>;
} & {
    ARCReducerState: ARCStoreState<Model>;
}, Extract<"error", (keyof ARCConnected<Model> | keyof P) & (keyof ARCConnected<Model> | keyof P | keyof import("react").ClassAttributes<import("react").Component<P & ARCConnected<Model> & {
    ARCConfig: ARCConfig<Model>;
} & {
    ARCReducerState: ARCStoreState<Model>;
}, any, any>>)> | Extract<"loaded", (keyof ARCConnected<Model> | keyof P) & (keyof ARCConnected<Model> | keyof P | keyof import("react").ClassAttributes<import("react").Component<P & ARCConnected<Model> & {
    ARCConfig: ARCConfig<Model>;
} & {
    ARCReducerState: ARCStoreState<Model>;
}, any, any>>)> | Extract<"dispatch", (keyof ARCConnected<Model> | keyof P) & (keyof ARCConnected<Model> | keyof P | keyof import("react").ClassAttributes<import("react").Component<P & ARCConnected<Model> & {
    ARCConfig: ARCConfig<Model>;
} & {
    ARCReducerState: ARCStoreState<Model>;
}, any, any>>)> | Extract<"ARCConfig", (keyof ARCConnected<Model> | keyof P) & (keyof ARCConnected<Model> | keyof P | keyof import("react").ClassAttributes<import("react").Component<P & ARCConnected<Model> & {
    ARCConfig: ARCConfig<Model>;
} & {
    ARCReducerState: ARCStoreState<Model>;
}, any, any>>)> | Extract<"ARCReducerState", (keyof ARCConnected<Model> | keyof P) & (keyof ARCConnected<Model> | keyof P | keyof import("react").ClassAttributes<import("react").Component<P & ARCConnected<Model> & {
    ARCConfig: ARCConfig<Model>;
} & {
    ARCReducerState: ARCStoreState<Model>;
}, any, any>>)> | Extract<"model", (keyof ARCConnected<Model> | keyof P) & (keyof ARCConnected<Model> | keyof P | keyof import("react").ClassAttributes<import("react").Component<P & ARCConnected<Model> & {
    ARCConfig: ARCConfig<Model>;
} & {
    ARCReducerState: ARCStoreState<Model>;
}, any, any>>)> | Extract<"metas", (keyof ARCConnected<Model> | keyof P) & (keyof ARCConnected<Model> | keyof P | keyof import("react").ClassAttributes<import("react").Component<P & ARCConnected<Model> & {
    ARCConfig: ARCConfig<Model>;
} & {
    ARCReducerState: ARCStoreState<Model>;
}, any, any>>)> | Extract<"syncing", (keyof ARCConnected<Model> | keyof P) & (keyof ARCConnected<Model> | keyof P | keyof import("react").ClassAttributes<import("react").Component<P & ARCConnected<Model> & {
    ARCConfig: ARCConfig<Model>;
} & {
    ARCReducerState: ARCStoreState<Model>;
}, any, any>>)> | Extract<"metaModel", (keyof ARCConnected<Model> | keyof P) & (keyof ARCConnected<Model> | keyof P | keyof import("react").ClassAttributes<import("react").Component<P & ARCConnected<Model> & {
    ARCConfig: ARCConfig<Model>;
} & {
    ARCReducerState: ARCStoreState<Model>;
}, any, any>>)> | Extract<"isNew", (keyof ARCConnected<Model> | keyof P) & (keyof ARCConnected<Model> | keyof P | keyof import("react").ClassAttributes<import("react").Component<P & ARCConnected<Model> & {
    ARCConfig: ARCConfig<Model>;
} & {
    ARCReducerState: ARCStoreState<Model>;
}, any, any>>)> | Extract<keyof P, (keyof ARCConnected<Model> | keyof P) & (keyof ARCConnected<Model> | keyof P | keyof import("react").ClassAttributes<import("react").Component<P & ARCConnected<Model> & {
    ARCConfig: ARCConfig<Model>;
} & {
    ARCReducerState: ARCStoreState<Model>;
}, any, any>>)>> & P & import("react-redux").ConnectPropsMaybeWithoutContext<P & ARCConnected<Model> & {
    ARCConfig: ARCConfig<Model>;
} & {
    ARCReducerState: ARCStoreState<Model>;
}>)[k_2]; } : never) | (import("react-redux").DistributiveOmit<import("react").ClassAttributes<import("react").Component<P & ARCConnected<Model> & {
    ARCConfig: ARCConfig<Model>;
} & {
    ARCReducerState: ARCStoreState<Model>;
}, any, any>> & P & ARCConnected<Model> & {
    ARCConfig: ARCConfig<Model>;
} & {
    ARCReducerState: ARCStoreState<Model>;
}, Extract<"error", (keyof ARCConnected<Model> | keyof P) & (keyof ARCConnected<Model> | keyof P | keyof import("react").ClassAttributes<import("react").Component<P & ARCConnected<Model> & {
    ARCConfig: ARCConfig<Model>;
} & {
    ARCReducerState: ARCStoreState<Model>;
}, any, any>>)> | Extract<"loaded", (keyof ARCConnected<Model> | keyof P) & (keyof ARCConnected<Model> | keyof P | keyof import("react").ClassAttributes<import("react").Component<P & ARCConnected<Model> & {
    ARCConfig: ARCConfig<Model>;
} & {
    ARCReducerState: ARCStoreState<Model>;
}, any, any>>)> | Extract<"dispatch", (keyof ARCConnected<Model> | keyof P) & (keyof ARCConnected<Model> | keyof P | keyof import("react").ClassAttributes<import("react").Component<P & ARCConnected<Model> & {
    ARCConfig: ARCConfig<Model>;
} & {
    ARCReducerState: ARCStoreState<Model>;
}, any, any>>)> | Extract<"ARCConfig", (keyof ARCConnected<Model> | keyof P) & (keyof ARCConnected<Model> | keyof P | keyof import("react").ClassAttributes<import("react").Component<P & ARCConnected<Model> & {
    ARCConfig: ARCConfig<Model>;
} & {
    ARCReducerState: ARCStoreState<Model>;
}, any, any>>)> | Extract<"ARCReducerState", (keyof ARCConnected<Model> | keyof P) & (keyof ARCConnected<Model> | keyof P | keyof import("react").ClassAttributes<import("react").Component<P & ARCConnected<Model> & {
    ARCConfig: ARCConfig<Model>;
} & {
    ARCReducerState: ARCStoreState<Model>;
}, any, any>>)> | Extract<"model", (keyof ARCConnected<Model> | keyof P) & (keyof ARCConnected<Model> | keyof P | keyof import("react").ClassAttributes<import("react").Component<P & ARCConnected<Model> & {
    ARCConfig: ARCConfig<Model>;
} & {
    ARCReducerState: ARCStoreState<Model>;
}, any, any>>)> | Extract<"metas", (keyof ARCConnected<Model> | keyof P) & (keyof ARCConnected<Model> | keyof P | keyof import("react").ClassAttributes<import("react").Component<P & ARCConnected<Model> & {
    ARCConfig: ARCConfig<Model>;
} & {
    ARCReducerState: ARCStoreState<Model>;
}, any, any>>)> | Extract<"syncing", (keyof ARCConnected<Model> | keyof P) & (keyof ARCConnected<Model> | keyof P | keyof import("react").ClassAttributes<import("react").Component<P & ARCConnected<Model> & {
    ARCConfig: ARCConfig<Model>;
} & {
    ARCReducerState: ARCStoreState<Model>;
}, any, any>>)> | Extract<"metaModel", (keyof ARCConnected<Model> | keyof P) & (keyof ARCConnected<Model> | keyof P | keyof import("react").ClassAttributes<import("react").Component<P & ARCConnected<Model> & {
    ARCConfig: ARCConfig<Model>;
} & {
    ARCReducerState: ARCStoreState<Model>;
}, any, any>>)> | Extract<"isNew", (keyof ARCConnected<Model> | keyof P) & (keyof ARCConnected<Model> | keyof P | keyof import("react").ClassAttributes<import("react").Component<P & ARCConnected<Model> & {
    ARCConfig: ARCConfig<Model>;
} & {
    ARCReducerState: ARCStoreState<Model>;
}, any, any>>)> | Extract<keyof P, (keyof ARCConnected<Model> | keyof P) & (keyof ARCConnected<Model> | keyof P | keyof import("react").ClassAttributes<import("react").Component<P & ARCConnected<Model> & {
    ARCConfig: ARCConfig<Model>;
} & {
    ARCReducerState: ARCStoreState<Model>;
}, any, any>>)>> & P & import("react-redux").ConnectPropsMaybeWithoutContext<P & import("react").ClassAttributes<import("react").Component<P & ARCConnected<Model> & {
    ARCConfig: ARCConfig<Model>;
} & {
    ARCReducerState: ARCStoreState<Model>;
}, any, any>> & ARCConnected<Model> & {
    ARCConfig: ARCConfig<Model>;
} & {
    ARCReducerState: ARCStoreState<Model>;
}> extends infer T_3 ? { [k_3 in keyof T_3]: (import("react-redux").DistributiveOmit<import("react").ClassAttributes<import("react").Component<P & ARCConnected<Model> & {
    ARCConfig: ARCConfig<Model>;
} & {
    ARCReducerState: ARCStoreState<Model>;
}, any, any>> & P & ARCConnected<Model> & {
    ARCConfig: ARCConfig<Model>;
} & {
    ARCReducerState: ARCStoreState<Model>;
}, Extract<"error", (keyof ARCConnected<Model> | keyof P) & (keyof ARCConnected<Model> | keyof P | keyof import("react").ClassAttributes<import("react").Component<P & ARCConnected<Model> & {
    ARCConfig: ARCConfig<Model>;
} & {
    ARCReducerState: ARCStoreState<Model>;
}, any, any>>)> | Extract<"loaded", (keyof ARCConnected<Model> | keyof P) & (keyof ARCConnected<Model> | keyof P | keyof import("react").ClassAttributes<import("react").Component<P & ARCConnected<Model> & {
    ARCConfig: ARCConfig<Model>;
} & {
    ARCReducerState: ARCStoreState<Model>;
}, any, any>>)> | Extract<"dispatch", (keyof ARCConnected<Model> | keyof P) & (keyof ARCConnected<Model> | keyof P | keyof import("react").ClassAttributes<import("react").Component<P & ARCConnected<Model> & {
    ARCConfig: ARCConfig<Model>;
} & {
    ARCReducerState: ARCStoreState<Model>;
}, any, any>>)> | Extract<"ARCConfig", (keyof ARCConnected<Model> | keyof P) & (keyof ARCConnected<Model> | keyof P | keyof import("react").ClassAttributes<import("react").Component<P & ARCConnected<Model> & {
    ARCConfig: ARCConfig<Model>;
} & {
    ARCReducerState: ARCStoreState<Model>;
}, any, any>>)> | Extract<"ARCReducerState", (keyof ARCConnected<Model> | keyof P) & (keyof ARCConnected<Model> | keyof P | keyof import("react").ClassAttributes<import("react").Component<P & ARCConnected<Model> & {
    ARCConfig: ARCConfig<Model>;
} & {
    ARCReducerState: ARCStoreState<Model>;
}, any, any>>)> | Extract<"model", (keyof ARCConnected<Model> | keyof P) & (keyof ARCConnected<Model> | keyof P | keyof import("react").ClassAttributes<import("react").Component<P & ARCConnected<Model> & {
    ARCConfig: ARCConfig<Model>;
} & {
    ARCReducerState: ARCStoreState<Model>;
}, any, any>>)> | Extract<"metas", (keyof ARCConnected<Model> | keyof P) & (keyof ARCConnected<Model> | keyof P | keyof import("react").ClassAttributes<import("react").Component<P & ARCConnected<Model> & {
    ARCConfig: ARCConfig<Model>;
} & {
    ARCReducerState: ARCStoreState<Model>;
}, any, any>>)> | Extract<"syncing", (keyof ARCConnected<Model> | keyof P) & (keyof ARCConnected<Model> | keyof P | keyof import("react").ClassAttributes<import("react").Component<P & ARCConnected<Model> & {
    ARCConfig: ARCConfig<Model>;
} & {
    ARCReducerState: ARCStoreState<Model>;
}, any, any>>)> | Extract<"metaModel", (keyof ARCConnected<Model> | keyof P) & (keyof ARCConnected<Model> | keyof P | keyof import("react").ClassAttributes<import("react").Component<P & ARCConnected<Model> & {
    ARCConfig: ARCConfig<Model>;
} & {
    ARCReducerState: ARCStoreState<Model>;
}, any, any>>)> | Extract<"isNew", (keyof ARCConnected<Model> | keyof P) & (keyof ARCConnected<Model> | keyof P | keyof import("react").ClassAttributes<import("react").Component<P & ARCConnected<Model> & {
    ARCConfig: ARCConfig<Model>;
} & {
    ARCReducerState: ARCStoreState<Model>;
}, any, any>>)> | Extract<keyof P, (keyof ARCConnected<Model> | keyof P) & (keyof ARCConnected<Model> | keyof P | keyof import("react").ClassAttributes<import("react").Component<P & ARCConnected<Model> & {
    ARCConfig: ARCConfig<Model>;
} & {
    ARCReducerState: ARCStoreState<Model>;
}, any, any>>)>> & P & import("react-redux").ConnectPropsMaybeWithoutContext<P & import("react").ClassAttributes<import("react").Component<P & ARCConnected<Model> & {
    ARCConfig: ARCConfig<Model>;
} & {
    ARCReducerState: ARCStoreState<Model>;
}, any, any>> & ARCConnected<Model> & {
    ARCConfig: ARCConfig<Model>;
} & {
    ARCReducerState: ARCStoreState<Model>;
}>)[k_3]; } : never)>;
export {};
