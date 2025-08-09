"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createHOC = createHOC;
const react_1 = __importDefault(require("react"));
const ModelContainer_1 = require("../containers-next/ModelContainer");
const withARC_1 = require("./withARC");
function createHOC({ Container = ModelContainer_1.ModelContainer, ARCConfig }) {
    return function GeneratedHOC(Wrapped) {
        const GeneratedARCContainer = (0, withARC_1.withARC)(ARCConfig)(Container);
        return function Component(props) {
            const extendedProps = {
                ...props,
                component: Wrapped
            };
            //@ts-ignore
            return react_1.default.createElement(GeneratedARCContainer, { ...extendedProps });
        };
    };
}
