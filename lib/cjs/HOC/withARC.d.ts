import { ARCConfig } from "../types/config.types";
import { ARCConnectedComponent } from "../types/components.types";
import { ComponentType } from "react";
import { ARCRootState, ARCStoreState } from "../types/connectors.types";
/**
 * Store Connector
 * @param {ARCConfig} config

 */
export declare function connectFn<Model, P extends object = {}>(config: ARCConfig<Model>): (store: ARCRootState, ownProps: P) => ARCConnectedComponent<Model> & P;
/**
 *
 * @param {ARCConfig} config
 * @return {function(Component)<ARCWrappedComponent>}
 */
export declare function withARC<Model>(config: ARCConfig<Model>): <P extends object = {}>(Wrapped: ComponentType<P & ARCConnectedComponent<Model> & {
    ARCConfig: ARCConfig<Model>;
} & {
    ARCReducerState: ARCStoreState<Model>;
}>) => import("react-redux").ConnectedComponent<ComponentType<P & ARCConnectedComponent<Model> & {
    ARCConfig: ARCConfig<Model>;
} & {
    ARCReducerState: ARCStoreState<Model>;
}>, (import("react-redux").DistributiveOmit<P & ARCConnectedComponent<Model> & {
    ARCConfig: ARCConfig<Model>;
} & {
    ARCReducerState: ARCStoreState<Model>;
}, Extract<"error", ("ARCReducerState" | keyof ARCConnectedComponent<Model> | keyof P) & ("ARCReducerState" | keyof ARCConnectedComponent<Model> | keyof P | keyof import("react").ClassAttributes<import("react").Component<P & ARCConnectedComponent<Model> & {
    ARCConfig: ARCConfig<Model>;
} & {
    ARCReducerState: ARCStoreState<Model>;
}, any, any>>)> | Extract<"loaded", ("ARCReducerState" | keyof ARCConnectedComponent<Model> | keyof P) & ("ARCReducerState" | keyof ARCConnectedComponent<Model> | keyof P | keyof import("react").ClassAttributes<import("react").Component<P & ARCConnectedComponent<Model> & {
    ARCConfig: ARCConfig<Model>;
} & {
    ARCReducerState: ARCStoreState<Model>;
}, any, any>>)> | Extract<"metas", ("ARCReducerState" | keyof ARCConnectedComponent<Model> | keyof P) & ("ARCReducerState" | keyof ARCConnectedComponent<Model> | keyof P | keyof import("react").ClassAttributes<import("react").Component<P & ARCConnectedComponent<Model> & {
    ARCConfig: ARCConfig<Model>;
} & {
    ARCReducerState: ARCStoreState<Model>;
}, any, any>>)> | Extract<"dispatch", ("ARCReducerState" | keyof ARCConnectedComponent<Model> | keyof P) & ("ARCReducerState" | keyof ARCConnectedComponent<Model> | keyof P | keyof import("react").ClassAttributes<import("react").Component<P & ARCConnectedComponent<Model> & {
    ARCConfig: ARCConfig<Model>;
} & {
    ARCReducerState: ARCStoreState<Model>;
}, any, any>>)> | Extract<"ARCConfig", ("ARCReducerState" | keyof ARCConnectedComponent<Model> | keyof P) & ("ARCReducerState" | keyof ARCConnectedComponent<Model> | keyof P | keyof import("react").ClassAttributes<import("react").Component<P & ARCConnectedComponent<Model> & {
    ARCConfig: ARCConfig<Model>;
} & {
    ARCReducerState: ARCStoreState<Model>;
}, any, any>>)> | Extract<"model", ("ARCReducerState" | keyof ARCConnectedComponent<Model> | keyof P) & ("ARCReducerState" | keyof ARCConnectedComponent<Model> | keyof P | keyof import("react").ClassAttributes<import("react").Component<P & ARCConnectedComponent<Model> & {
    ARCConfig: ARCConfig<Model>;
} & {
    ARCReducerState: ARCStoreState<Model>;
}, any, any>>)> | Extract<"metaModel", ("ARCReducerState" | keyof ARCConnectedComponent<Model> | keyof P) & ("ARCReducerState" | keyof ARCConnectedComponent<Model> | keyof P | keyof import("react").ClassAttributes<import("react").Component<P & ARCConnectedComponent<Model> & {
    ARCConfig: ARCConfig<Model>;
} & {
    ARCReducerState: ARCStoreState<Model>;
}, any, any>>)> | Extract<"component", ("ARCReducerState" | keyof ARCConnectedComponent<Model> | keyof P) & ("ARCReducerState" | keyof ARCConnectedComponent<Model> | keyof P | keyof import("react").ClassAttributes<import("react").Component<P & ARCConnectedComponent<Model> & {
    ARCConfig: ARCConfig<Model>;
} & {
    ARCReducerState: ARCStoreState<Model>;
}, any, any>>)> | Extract<"syncing", ("ARCReducerState" | keyof ARCConnectedComponent<Model> | keyof P) & ("ARCReducerState" | keyof ARCConnectedComponent<Model> | keyof P | keyof import("react").ClassAttributes<import("react").Component<P & ARCConnectedComponent<Model> & {
    ARCConfig: ARCConfig<Model>;
} & {
    ARCReducerState: ARCStoreState<Model>;
}, any, any>>)> | Extract<"isNew", ("ARCReducerState" | keyof ARCConnectedComponent<Model> | keyof P) & ("ARCReducerState" | keyof ARCConnectedComponent<Model> | keyof P | keyof import("react").ClassAttributes<import("react").Component<P & ARCConnectedComponent<Model> & {
    ARCConfig: ARCConfig<Model>;
} & {
    ARCReducerState: ARCStoreState<Model>;
}, any, any>>)> | Extract<keyof P, ("ARCReducerState" | keyof ARCConnectedComponent<Model> | keyof P) & ("ARCReducerState" | keyof ARCConnectedComponent<Model> | keyof P | keyof import("react").ClassAttributes<import("react").Component<P & ARCConnectedComponent<Model> & {
    ARCConfig: ARCConfig<Model>;
} & {
    ARCReducerState: ARCStoreState<Model>;
}, any, any>>)>> & P & import("react-redux").ConnectPropsMaybeWithoutContext<P & ARCConnectedComponent<Model> & {
    ARCConfig: ARCConfig<Model>;
} & {
    ARCReducerState: ARCStoreState<Model>;
}> extends infer T ? { [k in keyof T]: (import("react-redux").DistributiveOmit<P & ARCConnectedComponent<Model> & {
    ARCConfig: ARCConfig<Model>;
} & {
    ARCReducerState: ARCStoreState<Model>;
}, Extract<"error", ("ARCReducerState" | keyof ARCConnectedComponent<Model> | keyof P) & ("ARCReducerState" | keyof ARCConnectedComponent<Model> | keyof P | keyof import("react").ClassAttributes<import("react").Component<P & ARCConnectedComponent<Model> & {
    ARCConfig: ARCConfig<Model>;
} & {
    ARCReducerState: ARCStoreState<Model>;
}, any, any>>)> | Extract<"loaded", ("ARCReducerState" | keyof ARCConnectedComponent<Model> | keyof P) & ("ARCReducerState" | keyof ARCConnectedComponent<Model> | keyof P | keyof import("react").ClassAttributes<import("react").Component<P & ARCConnectedComponent<Model> & {
    ARCConfig: ARCConfig<Model>;
} & {
    ARCReducerState: ARCStoreState<Model>;
}, any, any>>)> | Extract<"metas", ("ARCReducerState" | keyof ARCConnectedComponent<Model> | keyof P) & ("ARCReducerState" | keyof ARCConnectedComponent<Model> | keyof P | keyof import("react").ClassAttributes<import("react").Component<P & ARCConnectedComponent<Model> & {
    ARCConfig: ARCConfig<Model>;
} & {
    ARCReducerState: ARCStoreState<Model>;
}, any, any>>)> | Extract<"dispatch", ("ARCReducerState" | keyof ARCConnectedComponent<Model> | keyof P) & ("ARCReducerState" | keyof ARCConnectedComponent<Model> | keyof P | keyof import("react").ClassAttributes<import("react").Component<P & ARCConnectedComponent<Model> & {
    ARCConfig: ARCConfig<Model>;
} & {
    ARCReducerState: ARCStoreState<Model>;
}, any, any>>)> | Extract<"ARCConfig", ("ARCReducerState" | keyof ARCConnectedComponent<Model> | keyof P) & ("ARCReducerState" | keyof ARCConnectedComponent<Model> | keyof P | keyof import("react").ClassAttributes<import("react").Component<P & ARCConnectedComponent<Model> & {
    ARCConfig: ARCConfig<Model>;
} & {
    ARCReducerState: ARCStoreState<Model>;
}, any, any>>)> | Extract<"model", ("ARCReducerState" | keyof ARCConnectedComponent<Model> | keyof P) & ("ARCReducerState" | keyof ARCConnectedComponent<Model> | keyof P | keyof import("react").ClassAttributes<import("react").Component<P & ARCConnectedComponent<Model> & {
    ARCConfig: ARCConfig<Model>;
} & {
    ARCReducerState: ARCStoreState<Model>;
}, any, any>>)> | Extract<"metaModel", ("ARCReducerState" | keyof ARCConnectedComponent<Model> | keyof P) & ("ARCReducerState" | keyof ARCConnectedComponent<Model> | keyof P | keyof import("react").ClassAttributes<import("react").Component<P & ARCConnectedComponent<Model> & {
    ARCConfig: ARCConfig<Model>;
} & {
    ARCReducerState: ARCStoreState<Model>;
}, any, any>>)> | Extract<"component", ("ARCReducerState" | keyof ARCConnectedComponent<Model> | keyof P) & ("ARCReducerState" | keyof ARCConnectedComponent<Model> | keyof P | keyof import("react").ClassAttributes<import("react").Component<P & ARCConnectedComponent<Model> & {
    ARCConfig: ARCConfig<Model>;
} & {
    ARCReducerState: ARCStoreState<Model>;
}, any, any>>)> | Extract<"syncing", ("ARCReducerState" | keyof ARCConnectedComponent<Model> | keyof P) & ("ARCReducerState" | keyof ARCConnectedComponent<Model> | keyof P | keyof import("react").ClassAttributes<import("react").Component<P & ARCConnectedComponent<Model> & {
    ARCConfig: ARCConfig<Model>;
} & {
    ARCReducerState: ARCStoreState<Model>;
}, any, any>>)> | Extract<"isNew", ("ARCReducerState" | keyof ARCConnectedComponent<Model> | keyof P) & ("ARCReducerState" | keyof ARCConnectedComponent<Model> | keyof P | keyof import("react").ClassAttributes<import("react").Component<P & ARCConnectedComponent<Model> & {
    ARCConfig: ARCConfig<Model>;
} & {
    ARCReducerState: ARCStoreState<Model>;
}, any, any>>)> | Extract<keyof P, ("ARCReducerState" | keyof ARCConnectedComponent<Model> | keyof P) & ("ARCReducerState" | keyof ARCConnectedComponent<Model> | keyof P | keyof import("react").ClassAttributes<import("react").Component<P & ARCConnectedComponent<Model> & {
    ARCConfig: ARCConfig<Model>;
} & {
    ARCReducerState: ARCStoreState<Model>;
}, any, any>>)>> & P & import("react-redux").ConnectPropsMaybeWithoutContext<P & ARCConnectedComponent<Model> & {
    ARCConfig: ARCConfig<Model>;
} & {
    ARCReducerState: ARCStoreState<Model>;
}>)[k]; } : never) | (import("react-redux").DistributiveOmit<P & ARCConnectedComponent<Model> & {
    ARCConfig: ARCConfig<Model>;
} & {
    ARCReducerState: ARCStoreState<Model>;
}, Extract<"error", ("ARCReducerState" | keyof ARCConnectedComponent<Model> | keyof P) & ("ARCReducerState" | keyof ARCConnectedComponent<Model> | keyof P | keyof import("react").ClassAttributes<import("react").Component<P & ARCConnectedComponent<Model> & {
    ARCConfig: ARCConfig<Model>;
} & {
    ARCReducerState: ARCStoreState<Model>;
}, any, any>>)> | Extract<"loaded", ("ARCReducerState" | keyof ARCConnectedComponent<Model> | keyof P) & ("ARCReducerState" | keyof ARCConnectedComponent<Model> | keyof P | keyof import("react").ClassAttributes<import("react").Component<P & ARCConnectedComponent<Model> & {
    ARCConfig: ARCConfig<Model>;
} & {
    ARCReducerState: ARCStoreState<Model>;
}, any, any>>)> | Extract<"metas", ("ARCReducerState" | keyof ARCConnectedComponent<Model> | keyof P) & ("ARCReducerState" | keyof ARCConnectedComponent<Model> | keyof P | keyof import("react").ClassAttributes<import("react").Component<P & ARCConnectedComponent<Model> & {
    ARCConfig: ARCConfig<Model>;
} & {
    ARCReducerState: ARCStoreState<Model>;
}, any, any>>)> | Extract<"dispatch", ("ARCReducerState" | keyof ARCConnectedComponent<Model> | keyof P) & ("ARCReducerState" | keyof ARCConnectedComponent<Model> | keyof P | keyof import("react").ClassAttributes<import("react").Component<P & ARCConnectedComponent<Model> & {
    ARCConfig: ARCConfig<Model>;
} & {
    ARCReducerState: ARCStoreState<Model>;
}, any, any>>)> | Extract<"ARCConfig", ("ARCReducerState" | keyof ARCConnectedComponent<Model> | keyof P) & ("ARCReducerState" | keyof ARCConnectedComponent<Model> | keyof P | keyof import("react").ClassAttributes<import("react").Component<P & ARCConnectedComponent<Model> & {
    ARCConfig: ARCConfig<Model>;
} & {
    ARCReducerState: ARCStoreState<Model>;
}, any, any>>)> | Extract<"model", ("ARCReducerState" | keyof ARCConnectedComponent<Model> | keyof P) & ("ARCReducerState" | keyof ARCConnectedComponent<Model> | keyof P | keyof import("react").ClassAttributes<import("react").Component<P & ARCConnectedComponent<Model> & {
    ARCConfig: ARCConfig<Model>;
} & {
    ARCReducerState: ARCStoreState<Model>;
}, any, any>>)> | Extract<"metaModel", ("ARCReducerState" | keyof ARCConnectedComponent<Model> | keyof P) & ("ARCReducerState" | keyof ARCConnectedComponent<Model> | keyof P | keyof import("react").ClassAttributes<import("react").Component<P & ARCConnectedComponent<Model> & {
    ARCConfig: ARCConfig<Model>;
} & {
    ARCReducerState: ARCStoreState<Model>;
}, any, any>>)> | Extract<"component", ("ARCReducerState" | keyof ARCConnectedComponent<Model> | keyof P) & ("ARCReducerState" | keyof ARCConnectedComponent<Model> | keyof P | keyof import("react").ClassAttributes<import("react").Component<P & ARCConnectedComponent<Model> & {
    ARCConfig: ARCConfig<Model>;
} & {
    ARCReducerState: ARCStoreState<Model>;
}, any, any>>)> | Extract<"syncing", ("ARCReducerState" | keyof ARCConnectedComponent<Model> | keyof P) & ("ARCReducerState" | keyof ARCConnectedComponent<Model> | keyof P | keyof import("react").ClassAttributes<import("react").Component<P & ARCConnectedComponent<Model> & {
    ARCConfig: ARCConfig<Model>;
} & {
    ARCReducerState: ARCStoreState<Model>;
}, any, any>>)> | Extract<"isNew", ("ARCReducerState" | keyof ARCConnectedComponent<Model> | keyof P) & ("ARCReducerState" | keyof ARCConnectedComponent<Model> | keyof P | keyof import("react").ClassAttributes<import("react").Component<P & ARCConnectedComponent<Model> & {
    ARCConfig: ARCConfig<Model>;
} & {
    ARCReducerState: ARCStoreState<Model>;
}, any, any>>)> | Extract<keyof P, ("ARCReducerState" | keyof ARCConnectedComponent<Model> | keyof P) & ("ARCReducerState" | keyof ARCConnectedComponent<Model> | keyof P | keyof import("react").ClassAttributes<import("react").Component<P & ARCConnectedComponent<Model> & {
    ARCConfig: ARCConfig<Model>;
} & {
    ARCReducerState: ARCStoreState<Model>;
}, any, any>>)>> & P & import("react-redux").ConnectPropsMaybeWithoutContext<P & import("react").ClassAttributes<import("react").Component<P & ARCConnectedComponent<Model> & {
    ARCConfig: ARCConfig<Model>;
} & {
    ARCReducerState: ARCStoreState<Model>;
}, any, any>> & ARCConnectedComponent<Model> & {
    ARCConfig: ARCConfig<Model>;
} & {
    ARCReducerState: ARCStoreState<Model>;
}> extends infer T_1 ? { [k_1 in keyof T_1]: (import("react-redux").DistributiveOmit<P & ARCConnectedComponent<Model> & {
    ARCConfig: ARCConfig<Model>;
} & {
    ARCReducerState: ARCStoreState<Model>;
}, Extract<"error", ("ARCReducerState" | keyof ARCConnectedComponent<Model> | keyof P) & ("ARCReducerState" | keyof ARCConnectedComponent<Model> | keyof P | keyof import("react").ClassAttributes<import("react").Component<P & ARCConnectedComponent<Model> & {
    ARCConfig: ARCConfig<Model>;
} & {
    ARCReducerState: ARCStoreState<Model>;
}, any, any>>)> | Extract<"loaded", ("ARCReducerState" | keyof ARCConnectedComponent<Model> | keyof P) & ("ARCReducerState" | keyof ARCConnectedComponent<Model> | keyof P | keyof import("react").ClassAttributes<import("react").Component<P & ARCConnectedComponent<Model> & {
    ARCConfig: ARCConfig<Model>;
} & {
    ARCReducerState: ARCStoreState<Model>;
}, any, any>>)> | Extract<"metas", ("ARCReducerState" | keyof ARCConnectedComponent<Model> | keyof P) & ("ARCReducerState" | keyof ARCConnectedComponent<Model> | keyof P | keyof import("react").ClassAttributes<import("react").Component<P & ARCConnectedComponent<Model> & {
    ARCConfig: ARCConfig<Model>;
} & {
    ARCReducerState: ARCStoreState<Model>;
}, any, any>>)> | Extract<"dispatch", ("ARCReducerState" | keyof ARCConnectedComponent<Model> | keyof P) & ("ARCReducerState" | keyof ARCConnectedComponent<Model> | keyof P | keyof import("react").ClassAttributes<import("react").Component<P & ARCConnectedComponent<Model> & {
    ARCConfig: ARCConfig<Model>;
} & {
    ARCReducerState: ARCStoreState<Model>;
}, any, any>>)> | Extract<"ARCConfig", ("ARCReducerState" | keyof ARCConnectedComponent<Model> | keyof P) & ("ARCReducerState" | keyof ARCConnectedComponent<Model> | keyof P | keyof import("react").ClassAttributes<import("react").Component<P & ARCConnectedComponent<Model> & {
    ARCConfig: ARCConfig<Model>;
} & {
    ARCReducerState: ARCStoreState<Model>;
}, any, any>>)> | Extract<"model", ("ARCReducerState" | keyof ARCConnectedComponent<Model> | keyof P) & ("ARCReducerState" | keyof ARCConnectedComponent<Model> | keyof P | keyof import("react").ClassAttributes<import("react").Component<P & ARCConnectedComponent<Model> & {
    ARCConfig: ARCConfig<Model>;
} & {
    ARCReducerState: ARCStoreState<Model>;
}, any, any>>)> | Extract<"metaModel", ("ARCReducerState" | keyof ARCConnectedComponent<Model> | keyof P) & ("ARCReducerState" | keyof ARCConnectedComponent<Model> | keyof P | keyof import("react").ClassAttributes<import("react").Component<P & ARCConnectedComponent<Model> & {
    ARCConfig: ARCConfig<Model>;
} & {
    ARCReducerState: ARCStoreState<Model>;
}, any, any>>)> | Extract<"component", ("ARCReducerState" | keyof ARCConnectedComponent<Model> | keyof P) & ("ARCReducerState" | keyof ARCConnectedComponent<Model> | keyof P | keyof import("react").ClassAttributes<import("react").Component<P & ARCConnectedComponent<Model> & {
    ARCConfig: ARCConfig<Model>;
} & {
    ARCReducerState: ARCStoreState<Model>;
}, any, any>>)> | Extract<"syncing", ("ARCReducerState" | keyof ARCConnectedComponent<Model> | keyof P) & ("ARCReducerState" | keyof ARCConnectedComponent<Model> | keyof P | keyof import("react").ClassAttributes<import("react").Component<P & ARCConnectedComponent<Model> & {
    ARCConfig: ARCConfig<Model>;
} & {
    ARCReducerState: ARCStoreState<Model>;
}, any, any>>)> | Extract<"isNew", ("ARCReducerState" | keyof ARCConnectedComponent<Model> | keyof P) & ("ARCReducerState" | keyof ARCConnectedComponent<Model> | keyof P | keyof import("react").ClassAttributes<import("react").Component<P & ARCConnectedComponent<Model> & {
    ARCConfig: ARCConfig<Model>;
} & {
    ARCReducerState: ARCStoreState<Model>;
}, any, any>>)> | Extract<keyof P, ("ARCReducerState" | keyof ARCConnectedComponent<Model> | keyof P) & ("ARCReducerState" | keyof ARCConnectedComponent<Model> | keyof P | keyof import("react").ClassAttributes<import("react").Component<P & ARCConnectedComponent<Model> & {
    ARCConfig: ARCConfig<Model>;
} & {
    ARCReducerState: ARCStoreState<Model>;
}, any, any>>)>> & P & import("react-redux").ConnectPropsMaybeWithoutContext<P & import("react").ClassAttributes<import("react").Component<P & ARCConnectedComponent<Model> & {
    ARCConfig: ARCConfig<Model>;
} & {
    ARCReducerState: ARCStoreState<Model>;
}, any, any>> & ARCConnectedComponent<Model> & {
    ARCConfig: ARCConfig<Model>;
} & {
    ARCReducerState: ARCStoreState<Model>;
}>)[k_1]; } : never) | (import("react-redux").DistributiveOmit<import("react").ClassAttributes<import("react").Component<P & ARCConnectedComponent<Model> & {
    ARCConfig: ARCConfig<Model>;
} & {
    ARCReducerState: ARCStoreState<Model>;
}, any, any>> & P & ARCConnectedComponent<Model> & {
    ARCConfig: ARCConfig<Model>;
} & {
    ARCReducerState: ARCStoreState<Model>;
}, Extract<"error", ("ARCReducerState" | keyof ARCConnectedComponent<Model> | keyof P) & ("ARCReducerState" | keyof ARCConnectedComponent<Model> | keyof P | keyof import("react").ClassAttributes<import("react").Component<P & ARCConnectedComponent<Model> & {
    ARCConfig: ARCConfig<Model>;
} & {
    ARCReducerState: ARCStoreState<Model>;
}, any, any>>)> | Extract<"loaded", ("ARCReducerState" | keyof ARCConnectedComponent<Model> | keyof P) & ("ARCReducerState" | keyof ARCConnectedComponent<Model> | keyof P | keyof import("react").ClassAttributes<import("react").Component<P & ARCConnectedComponent<Model> & {
    ARCConfig: ARCConfig<Model>;
} & {
    ARCReducerState: ARCStoreState<Model>;
}, any, any>>)> | Extract<"metas", ("ARCReducerState" | keyof ARCConnectedComponent<Model> | keyof P) & ("ARCReducerState" | keyof ARCConnectedComponent<Model> | keyof P | keyof import("react").ClassAttributes<import("react").Component<P & ARCConnectedComponent<Model> & {
    ARCConfig: ARCConfig<Model>;
} & {
    ARCReducerState: ARCStoreState<Model>;
}, any, any>>)> | Extract<"dispatch", ("ARCReducerState" | keyof ARCConnectedComponent<Model> | keyof P) & ("ARCReducerState" | keyof ARCConnectedComponent<Model> | keyof P | keyof import("react").ClassAttributes<import("react").Component<P & ARCConnectedComponent<Model> & {
    ARCConfig: ARCConfig<Model>;
} & {
    ARCReducerState: ARCStoreState<Model>;
}, any, any>>)> | Extract<"ARCConfig", ("ARCReducerState" | keyof ARCConnectedComponent<Model> | keyof P) & ("ARCReducerState" | keyof ARCConnectedComponent<Model> | keyof P | keyof import("react").ClassAttributes<import("react").Component<P & ARCConnectedComponent<Model> & {
    ARCConfig: ARCConfig<Model>;
} & {
    ARCReducerState: ARCStoreState<Model>;
}, any, any>>)> | Extract<"model", ("ARCReducerState" | keyof ARCConnectedComponent<Model> | keyof P) & ("ARCReducerState" | keyof ARCConnectedComponent<Model> | keyof P | keyof import("react").ClassAttributes<import("react").Component<P & ARCConnectedComponent<Model> & {
    ARCConfig: ARCConfig<Model>;
} & {
    ARCReducerState: ARCStoreState<Model>;
}, any, any>>)> | Extract<"metaModel", ("ARCReducerState" | keyof ARCConnectedComponent<Model> | keyof P) & ("ARCReducerState" | keyof ARCConnectedComponent<Model> | keyof P | keyof import("react").ClassAttributes<import("react").Component<P & ARCConnectedComponent<Model> & {
    ARCConfig: ARCConfig<Model>;
} & {
    ARCReducerState: ARCStoreState<Model>;
}, any, any>>)> | Extract<"component", ("ARCReducerState" | keyof ARCConnectedComponent<Model> | keyof P) & ("ARCReducerState" | keyof ARCConnectedComponent<Model> | keyof P | keyof import("react").ClassAttributes<import("react").Component<P & ARCConnectedComponent<Model> & {
    ARCConfig: ARCConfig<Model>;
} & {
    ARCReducerState: ARCStoreState<Model>;
}, any, any>>)> | Extract<"syncing", ("ARCReducerState" | keyof ARCConnectedComponent<Model> | keyof P) & ("ARCReducerState" | keyof ARCConnectedComponent<Model> | keyof P | keyof import("react").ClassAttributes<import("react").Component<P & ARCConnectedComponent<Model> & {
    ARCConfig: ARCConfig<Model>;
} & {
    ARCReducerState: ARCStoreState<Model>;
}, any, any>>)> | Extract<"isNew", ("ARCReducerState" | keyof ARCConnectedComponent<Model> | keyof P) & ("ARCReducerState" | keyof ARCConnectedComponent<Model> | keyof P | keyof import("react").ClassAttributes<import("react").Component<P & ARCConnectedComponent<Model> & {
    ARCConfig: ARCConfig<Model>;
} & {
    ARCReducerState: ARCStoreState<Model>;
}, any, any>>)> | Extract<keyof P, ("ARCReducerState" | keyof ARCConnectedComponent<Model> | keyof P) & ("ARCReducerState" | keyof ARCConnectedComponent<Model> | keyof P | keyof import("react").ClassAttributes<import("react").Component<P & ARCConnectedComponent<Model> & {
    ARCConfig: ARCConfig<Model>;
} & {
    ARCReducerState: ARCStoreState<Model>;
}, any, any>>)>> & P & import("react-redux").ConnectPropsMaybeWithoutContext<P & ARCConnectedComponent<Model> & {
    ARCConfig: ARCConfig<Model>;
} & {
    ARCReducerState: ARCStoreState<Model>;
}> extends infer T_2 ? { [k_2 in keyof T_2]: (import("react-redux").DistributiveOmit<import("react").ClassAttributes<import("react").Component<P & ARCConnectedComponent<Model> & {
    ARCConfig: ARCConfig<Model>;
} & {
    ARCReducerState: ARCStoreState<Model>;
}, any, any>> & P & ARCConnectedComponent<Model> & {
    ARCConfig: ARCConfig<Model>;
} & {
    ARCReducerState: ARCStoreState<Model>;
}, Extract<"error", ("ARCReducerState" | keyof ARCConnectedComponent<Model> | keyof P) & ("ARCReducerState" | keyof ARCConnectedComponent<Model> | keyof P | keyof import("react").ClassAttributes<import("react").Component<P & ARCConnectedComponent<Model> & {
    ARCConfig: ARCConfig<Model>;
} & {
    ARCReducerState: ARCStoreState<Model>;
}, any, any>>)> | Extract<"loaded", ("ARCReducerState" | keyof ARCConnectedComponent<Model> | keyof P) & ("ARCReducerState" | keyof ARCConnectedComponent<Model> | keyof P | keyof import("react").ClassAttributes<import("react").Component<P & ARCConnectedComponent<Model> & {
    ARCConfig: ARCConfig<Model>;
} & {
    ARCReducerState: ARCStoreState<Model>;
}, any, any>>)> | Extract<"metas", ("ARCReducerState" | keyof ARCConnectedComponent<Model> | keyof P) & ("ARCReducerState" | keyof ARCConnectedComponent<Model> | keyof P | keyof import("react").ClassAttributes<import("react").Component<P & ARCConnectedComponent<Model> & {
    ARCConfig: ARCConfig<Model>;
} & {
    ARCReducerState: ARCStoreState<Model>;
}, any, any>>)> | Extract<"dispatch", ("ARCReducerState" | keyof ARCConnectedComponent<Model> | keyof P) & ("ARCReducerState" | keyof ARCConnectedComponent<Model> | keyof P | keyof import("react").ClassAttributes<import("react").Component<P & ARCConnectedComponent<Model> & {
    ARCConfig: ARCConfig<Model>;
} & {
    ARCReducerState: ARCStoreState<Model>;
}, any, any>>)> | Extract<"ARCConfig", ("ARCReducerState" | keyof ARCConnectedComponent<Model> | keyof P) & ("ARCReducerState" | keyof ARCConnectedComponent<Model> | keyof P | keyof import("react").ClassAttributes<import("react").Component<P & ARCConnectedComponent<Model> & {
    ARCConfig: ARCConfig<Model>;
} & {
    ARCReducerState: ARCStoreState<Model>;
}, any, any>>)> | Extract<"model", ("ARCReducerState" | keyof ARCConnectedComponent<Model> | keyof P) & ("ARCReducerState" | keyof ARCConnectedComponent<Model> | keyof P | keyof import("react").ClassAttributes<import("react").Component<P & ARCConnectedComponent<Model> & {
    ARCConfig: ARCConfig<Model>;
} & {
    ARCReducerState: ARCStoreState<Model>;
}, any, any>>)> | Extract<"metaModel", ("ARCReducerState" | keyof ARCConnectedComponent<Model> | keyof P) & ("ARCReducerState" | keyof ARCConnectedComponent<Model> | keyof P | keyof import("react").ClassAttributes<import("react").Component<P & ARCConnectedComponent<Model> & {
    ARCConfig: ARCConfig<Model>;
} & {
    ARCReducerState: ARCStoreState<Model>;
}, any, any>>)> | Extract<"component", ("ARCReducerState" | keyof ARCConnectedComponent<Model> | keyof P) & ("ARCReducerState" | keyof ARCConnectedComponent<Model> | keyof P | keyof import("react").ClassAttributes<import("react").Component<P & ARCConnectedComponent<Model> & {
    ARCConfig: ARCConfig<Model>;
} & {
    ARCReducerState: ARCStoreState<Model>;
}, any, any>>)> | Extract<"syncing", ("ARCReducerState" | keyof ARCConnectedComponent<Model> | keyof P) & ("ARCReducerState" | keyof ARCConnectedComponent<Model> | keyof P | keyof import("react").ClassAttributes<import("react").Component<P & ARCConnectedComponent<Model> & {
    ARCConfig: ARCConfig<Model>;
} & {
    ARCReducerState: ARCStoreState<Model>;
}, any, any>>)> | Extract<"isNew", ("ARCReducerState" | keyof ARCConnectedComponent<Model> | keyof P) & ("ARCReducerState" | keyof ARCConnectedComponent<Model> | keyof P | keyof import("react").ClassAttributes<import("react").Component<P & ARCConnectedComponent<Model> & {
    ARCConfig: ARCConfig<Model>;
} & {
    ARCReducerState: ARCStoreState<Model>;
}, any, any>>)> | Extract<keyof P, ("ARCReducerState" | keyof ARCConnectedComponent<Model> | keyof P) & ("ARCReducerState" | keyof ARCConnectedComponent<Model> | keyof P | keyof import("react").ClassAttributes<import("react").Component<P & ARCConnectedComponent<Model> & {
    ARCConfig: ARCConfig<Model>;
} & {
    ARCReducerState: ARCStoreState<Model>;
}, any, any>>)>> & P & import("react-redux").ConnectPropsMaybeWithoutContext<P & ARCConnectedComponent<Model> & {
    ARCConfig: ARCConfig<Model>;
} & {
    ARCReducerState: ARCStoreState<Model>;
}>)[k_2]; } : never) | (import("react-redux").DistributiveOmit<import("react").ClassAttributes<import("react").Component<P & ARCConnectedComponent<Model> & {
    ARCConfig: ARCConfig<Model>;
} & {
    ARCReducerState: ARCStoreState<Model>;
}, any, any>> & P & ARCConnectedComponent<Model> & {
    ARCConfig: ARCConfig<Model>;
} & {
    ARCReducerState: ARCStoreState<Model>;
}, Extract<"error", ("ARCReducerState" | keyof ARCConnectedComponent<Model> | keyof P) & ("ARCReducerState" | keyof ARCConnectedComponent<Model> | keyof P | keyof import("react").ClassAttributes<import("react").Component<P & ARCConnectedComponent<Model> & {
    ARCConfig: ARCConfig<Model>;
} & {
    ARCReducerState: ARCStoreState<Model>;
}, any, any>>)> | Extract<"loaded", ("ARCReducerState" | keyof ARCConnectedComponent<Model> | keyof P) & ("ARCReducerState" | keyof ARCConnectedComponent<Model> | keyof P | keyof import("react").ClassAttributes<import("react").Component<P & ARCConnectedComponent<Model> & {
    ARCConfig: ARCConfig<Model>;
} & {
    ARCReducerState: ARCStoreState<Model>;
}, any, any>>)> | Extract<"metas", ("ARCReducerState" | keyof ARCConnectedComponent<Model> | keyof P) & ("ARCReducerState" | keyof ARCConnectedComponent<Model> | keyof P | keyof import("react").ClassAttributes<import("react").Component<P & ARCConnectedComponent<Model> & {
    ARCConfig: ARCConfig<Model>;
} & {
    ARCReducerState: ARCStoreState<Model>;
}, any, any>>)> | Extract<"dispatch", ("ARCReducerState" | keyof ARCConnectedComponent<Model> | keyof P) & ("ARCReducerState" | keyof ARCConnectedComponent<Model> | keyof P | keyof import("react").ClassAttributes<import("react").Component<P & ARCConnectedComponent<Model> & {
    ARCConfig: ARCConfig<Model>;
} & {
    ARCReducerState: ARCStoreState<Model>;
}, any, any>>)> | Extract<"ARCConfig", ("ARCReducerState" | keyof ARCConnectedComponent<Model> | keyof P) & ("ARCReducerState" | keyof ARCConnectedComponent<Model> | keyof P | keyof import("react").ClassAttributes<import("react").Component<P & ARCConnectedComponent<Model> & {
    ARCConfig: ARCConfig<Model>;
} & {
    ARCReducerState: ARCStoreState<Model>;
}, any, any>>)> | Extract<"model", ("ARCReducerState" | keyof ARCConnectedComponent<Model> | keyof P) & ("ARCReducerState" | keyof ARCConnectedComponent<Model> | keyof P | keyof import("react").ClassAttributes<import("react").Component<P & ARCConnectedComponent<Model> & {
    ARCConfig: ARCConfig<Model>;
} & {
    ARCReducerState: ARCStoreState<Model>;
}, any, any>>)> | Extract<"metaModel", ("ARCReducerState" | keyof ARCConnectedComponent<Model> | keyof P) & ("ARCReducerState" | keyof ARCConnectedComponent<Model> | keyof P | keyof import("react").ClassAttributes<import("react").Component<P & ARCConnectedComponent<Model> & {
    ARCConfig: ARCConfig<Model>;
} & {
    ARCReducerState: ARCStoreState<Model>;
}, any, any>>)> | Extract<"component", ("ARCReducerState" | keyof ARCConnectedComponent<Model> | keyof P) & ("ARCReducerState" | keyof ARCConnectedComponent<Model> | keyof P | keyof import("react").ClassAttributes<import("react").Component<P & ARCConnectedComponent<Model> & {
    ARCConfig: ARCConfig<Model>;
} & {
    ARCReducerState: ARCStoreState<Model>;
}, any, any>>)> | Extract<"syncing", ("ARCReducerState" | keyof ARCConnectedComponent<Model> | keyof P) & ("ARCReducerState" | keyof ARCConnectedComponent<Model> | keyof P | keyof import("react").ClassAttributes<import("react").Component<P & ARCConnectedComponent<Model> & {
    ARCConfig: ARCConfig<Model>;
} & {
    ARCReducerState: ARCStoreState<Model>;
}, any, any>>)> | Extract<"isNew", ("ARCReducerState" | keyof ARCConnectedComponent<Model> | keyof P) & ("ARCReducerState" | keyof ARCConnectedComponent<Model> | keyof P | keyof import("react").ClassAttributes<import("react").Component<P & ARCConnectedComponent<Model> & {
    ARCConfig: ARCConfig<Model>;
} & {
    ARCReducerState: ARCStoreState<Model>;
}, any, any>>)> | Extract<keyof P, ("ARCReducerState" | keyof ARCConnectedComponent<Model> | keyof P) & ("ARCReducerState" | keyof ARCConnectedComponent<Model> | keyof P | keyof import("react").ClassAttributes<import("react").Component<P & ARCConnectedComponent<Model> & {
    ARCConfig: ARCConfig<Model>;
} & {
    ARCReducerState: ARCStoreState<Model>;
}, any, any>>)>> & P & import("react-redux").ConnectPropsMaybeWithoutContext<P & import("react").ClassAttributes<import("react").Component<P & ARCConnectedComponent<Model> & {
    ARCConfig: ARCConfig<Model>;
} & {
    ARCReducerState: ARCStoreState<Model>;
}, any, any>> & ARCConnectedComponent<Model> & {
    ARCConfig: ARCConfig<Model>;
} & {
    ARCReducerState: ARCStoreState<Model>;
}> extends infer T_3 ? { [k_3 in keyof T_3]: (import("react-redux").DistributiveOmit<import("react").ClassAttributes<import("react").Component<P & ARCConnectedComponent<Model> & {
    ARCConfig: ARCConfig<Model>;
} & {
    ARCReducerState: ARCStoreState<Model>;
}, any, any>> & P & ARCConnectedComponent<Model> & {
    ARCConfig: ARCConfig<Model>;
} & {
    ARCReducerState: ARCStoreState<Model>;
}, Extract<"error", ("ARCReducerState" | keyof ARCConnectedComponent<Model> | keyof P) & ("ARCReducerState" | keyof ARCConnectedComponent<Model> | keyof P | keyof import("react").ClassAttributes<import("react").Component<P & ARCConnectedComponent<Model> & {
    ARCConfig: ARCConfig<Model>;
} & {
    ARCReducerState: ARCStoreState<Model>;
}, any, any>>)> | Extract<"loaded", ("ARCReducerState" | keyof ARCConnectedComponent<Model> | keyof P) & ("ARCReducerState" | keyof ARCConnectedComponent<Model> | keyof P | keyof import("react").ClassAttributes<import("react").Component<P & ARCConnectedComponent<Model> & {
    ARCConfig: ARCConfig<Model>;
} & {
    ARCReducerState: ARCStoreState<Model>;
}, any, any>>)> | Extract<"metas", ("ARCReducerState" | keyof ARCConnectedComponent<Model> | keyof P) & ("ARCReducerState" | keyof ARCConnectedComponent<Model> | keyof P | keyof import("react").ClassAttributes<import("react").Component<P & ARCConnectedComponent<Model> & {
    ARCConfig: ARCConfig<Model>;
} & {
    ARCReducerState: ARCStoreState<Model>;
}, any, any>>)> | Extract<"dispatch", ("ARCReducerState" | keyof ARCConnectedComponent<Model> | keyof P) & ("ARCReducerState" | keyof ARCConnectedComponent<Model> | keyof P | keyof import("react").ClassAttributes<import("react").Component<P & ARCConnectedComponent<Model> & {
    ARCConfig: ARCConfig<Model>;
} & {
    ARCReducerState: ARCStoreState<Model>;
}, any, any>>)> | Extract<"ARCConfig", ("ARCReducerState" | keyof ARCConnectedComponent<Model> | keyof P) & ("ARCReducerState" | keyof ARCConnectedComponent<Model> | keyof P | keyof import("react").ClassAttributes<import("react").Component<P & ARCConnectedComponent<Model> & {
    ARCConfig: ARCConfig<Model>;
} & {
    ARCReducerState: ARCStoreState<Model>;
}, any, any>>)> | Extract<"model", ("ARCReducerState" | keyof ARCConnectedComponent<Model> | keyof P) & ("ARCReducerState" | keyof ARCConnectedComponent<Model> | keyof P | keyof import("react").ClassAttributes<import("react").Component<P & ARCConnectedComponent<Model> & {
    ARCConfig: ARCConfig<Model>;
} & {
    ARCReducerState: ARCStoreState<Model>;
}, any, any>>)> | Extract<"metaModel", ("ARCReducerState" | keyof ARCConnectedComponent<Model> | keyof P) & ("ARCReducerState" | keyof ARCConnectedComponent<Model> | keyof P | keyof import("react").ClassAttributes<import("react").Component<P & ARCConnectedComponent<Model> & {
    ARCConfig: ARCConfig<Model>;
} & {
    ARCReducerState: ARCStoreState<Model>;
}, any, any>>)> | Extract<"component", ("ARCReducerState" | keyof ARCConnectedComponent<Model> | keyof P) & ("ARCReducerState" | keyof ARCConnectedComponent<Model> | keyof P | keyof import("react").ClassAttributes<import("react").Component<P & ARCConnectedComponent<Model> & {
    ARCConfig: ARCConfig<Model>;
} & {
    ARCReducerState: ARCStoreState<Model>;
}, any, any>>)> | Extract<"syncing", ("ARCReducerState" | keyof ARCConnectedComponent<Model> | keyof P) & ("ARCReducerState" | keyof ARCConnectedComponent<Model> | keyof P | keyof import("react").ClassAttributes<import("react").Component<P & ARCConnectedComponent<Model> & {
    ARCConfig: ARCConfig<Model>;
} & {
    ARCReducerState: ARCStoreState<Model>;
}, any, any>>)> | Extract<"isNew", ("ARCReducerState" | keyof ARCConnectedComponent<Model> | keyof P) & ("ARCReducerState" | keyof ARCConnectedComponent<Model> | keyof P | keyof import("react").ClassAttributes<import("react").Component<P & ARCConnectedComponent<Model> & {
    ARCConfig: ARCConfig<Model>;
} & {
    ARCReducerState: ARCStoreState<Model>;
}, any, any>>)> | Extract<keyof P, ("ARCReducerState" | keyof ARCConnectedComponent<Model> | keyof P) & ("ARCReducerState" | keyof ARCConnectedComponent<Model> | keyof P | keyof import("react").ClassAttributes<import("react").Component<P & ARCConnectedComponent<Model> & {
    ARCConfig: ARCConfig<Model>;
} & {
    ARCReducerState: ARCStoreState<Model>;
}, any, any>>)>> & P & import("react-redux").ConnectPropsMaybeWithoutContext<P & import("react").ClassAttributes<import("react").Component<P & ARCConnectedComponent<Model> & {
    ARCConfig: ARCConfig<Model>;
} & {
    ARCReducerState: ARCStoreState<Model>;
}, any, any>> & ARCConnectedComponent<Model> & {
    ARCConfig: ARCConfig<Model>;
} & {
    ARCReducerState: ARCStoreState<Model>;
}>)[k_3]; } : never)>;
