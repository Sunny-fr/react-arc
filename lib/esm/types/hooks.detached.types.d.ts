import { ARC } from "../hooks/arc";
import { AnyProps, ComponentPropsWithRequiredModelParams } from "./components.types";
export type ARCResponse<Model> = Model | null | undefined;
/**
 * État interne du hook useARC
 */
export interface UseDetachedARCState<Model> {
    error: null | any;
    loading: boolean;
    loaded: boolean;
    response?: ARCResponse<Model>;
    pending: boolean;
}
/**
 * Interface pour les méthodes CRUD exposées par le hook useARC
 */
export interface UseDetachedARCMethods<Model> {
    /**
     * Instance ARC utilisée en interne
     */
    arc: ARC<Model>;
    /**
     * Récupère une ressource
     */
    get: (args: {
        props?: AnyProps;
        params: ComponentPropsWithRequiredModelParams;
    }) => Promise<ARCResponse<Model>>;
    /**
     * Supprime une ressource
     */
    remove: (args: {
        props?: AnyProps;
        params: ComponentPropsWithRequiredModelParams;
    }) => Promise<ARCResponse<Model>>;
    /**
     * Crée une nouvelle ressource
     */
    create: (args: {
        props?: AnyProps;
        params: ComponentPropsWithRequiredModelParams;
        body: any;
    }) => Promise<ARCResponse<Model>>;
    /**
     * Met à jour une ressource existante
     */
    update: (args: {
        props?: AnyProps;
        params: ComponentPropsWithRequiredModelParams;
        body: any;
    }) => Promise<ARCResponse<Model>>;
    /**
     * Extrait les paramètres requis à partir des props
     */
    extract: (props: AnyProps) => ComponentPropsWithRequiredModelParams;
    /**
     * Alias pour extract
     */
    extractParams: (props: AnyProps) => ComponentPropsWithRequiredModelParams;
    /**
     * Permet d'exécuter une requête personnalisée
     */
    custom: (fetcher: () => Promise<ARCResponse<Model>>) => Promise<ARCResponse<Model>>;
}
/**
 * Type de retour complet du hook useARC
 */
export interface UseDetachedARC<Model> {
    error: null | any;
    loading: boolean;
    loaded: boolean;
    response: ARCResponse<Model>;
    arc: UseDetachedARCMethods<Model>;
}
