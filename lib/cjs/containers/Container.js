"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Container = void 0;
const react_1 = __importDefault(require("react"));
const ReduxActions_1 = require("../actions/ReduxActions");
const core_1 = require("../actions/core");
const utils_1 = require("../utils");
const react_redux_1 = require("react-redux");
/**
 * DEPRECATED: Base Container class for ARC
 * @deprecated Use ModelContainer from containers-next instead
 */
class Container extends react_1.default.Component {
    static contextType = react_redux_1.ReactReduxContext;
    ARCConfig;
    actions;
    core;
    abortController;
    // props: ARCContainerProps<OwnProps, Model, RequiredProps>
    delayedTimeout;
    constructor(props) {
        super(props);
        this.updateARC(props.ARCConfig);
        this.actions = new ReduxActions_1.ReduxActions({
            config: this.ARCConfig,
        });
        this.core = core_1.core;
        this.abortController = null;
    }
    getTrueStoreState() {
        // @ts-ignore this.context.store.getState() is not typed yet
        const rootState = this.context.store.getState();
        const namespace = this.ARCConfig.name;
        const store = rootState[namespace];
        return {
            collection: store.collection,
        };
    }
    getPropsFromTrueStoreState = (props) => {
        const ARCProps = this.getTrueStoreState();
        const baseProps = props || this.props;
        return {
            ...baseProps,
            ...ARCProps,
        };
    };
    updateARC(config) {
        this.ARCConfig = { ...(this.ARCConfig || (0, utils_1.initializeConfig)(this.ARCConfig)), ...config };
        if (this.actions) {
            this.actions.updateConfig(this.ARCConfig);
        }
    }
}
exports.Container = Container;
exports.default = Container;
