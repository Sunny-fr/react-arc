"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createHOC = createHOC;
var react_1 = __importDefault(require("react"));
var ModelContainer_1 = require("../containers-next/ModelContainer");
var withARC_1 = require("./withARC");
// R = Required Props
// P = Props that are passed to the wrapped component
function createHOC(_a) {
    var _b = _a.Container, Container = _b === void 0 ? ModelContainer_1.ModelContainer : _b, ARCConfig = _a.ARCConfig;
    return function GeneratedHOC(Wrapped) {
        var ARCContainer = (0, withARC_1.withARC)(ARCConfig)(Container);
        return function Component(props) {
            var extendedProps = __assign(__assign({}, props), { component: Wrapped });
            return react_1.default.createElement(ARCContainer, __assign({}, extendedProps));
        };
    };
}
// // Example usage of createHOC
//
// const Demo = () => {
//   return (
//     <div>
//       <h1>Demo Component</h1>
//       <SampleComponent id="123" hello="World" />
//     </div>
//   )
// }
//
// type SampleModel = {
//   name: string
//   id: string
// }
//
// const sampleConfig: ARCConfig<SampleModel, SampleProps> = {
//   name: 'sample',
//   modelProps: ['id'],
//   paths: {
//     item: '/sample/:id',
//   }
// }
//
// interface SampleProps {
//   id: string
//
// }
//
// const withSample = createHOC<SampleProps, SampleModel>({
//   //Container: SampleContainer,
//   ARCConfig: sampleConfig
// })
//
//
// interface SampleComponentProps extends SampleProps {
//   hello: string
// }
//
// const SampleComponent:React.FC<SampleComponentProps> = withSample((props) => {
//   const {model, error, loaded, loading, hello} = props
//
//   if (error) return <div>Error: {error.message}</div>
//   if (!loaded) return <div>Loading...</div>
//   if(!model) return <div>No model found</div>
//
//   return (
//     <div>
//       <h1>Sample Component</h1>
//       <p>Hello: {hello}</p>
//       <p>ID: {model.id}</p>
//       <p>Hello: {model.name}</p>
//       {loading && <p>loading...</p>}
//     </div>
//   )
// })
