import { ObjectValues } from "../utils";
export declare const ACTIONS: {
    readonly INIT: "INIT_{actionNamespace}";
    readonly FETCH: "FETCH_{actionNamespace}";
    readonly FETCH_REJECTED: "FETCH_{actionNamespace}_REJECTED";
    readonly FETCH_CANCELLED: "FETCH_{actionNamespace}_CANCELLED";
    readonly FETCH_FULFILLED: "FETCH_{actionNamespace}_FULFILLED";
    readonly RESET: "RESET_{actionNamespace}_TEMP";
    readonly EDIT: "EDIT_{actionNamespace}";
    readonly SAVE: "SAVE_{actionNamespace}";
    readonly SAVE_REJECTED: "SAVE_{actionNamespace}_REJECTED";
    readonly SAVE_FULFILLED: "SAVE_{actionNamespace}_FULFILLED";
    readonly DELETE: "DELETE_{actionNamespace}";
    readonly DELETE_REJECTED: "DELETE_{actionNamespace}_REJECTED";
    readonly DELETE_FULFILLED: "DELETE_{actionNamespace}_FULFILLED";
};
export type ArcAction = ObjectValues<typeof ACTIONS>;
