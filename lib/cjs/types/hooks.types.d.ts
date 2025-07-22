import { ARC } from "../hooks/arc";
import { ComponentProps, ComponentPropsWithRequiredModelParams } from "./components.types";
/**
 * État interne du hook useARC
 */
export interface UseARCState {
    error: null | object;
    loading: boolean;
    loaded: boolean;
    response: Response | null;
    pending: boolean;
}
/**
 * Interface pour les méthodes CRUD exposées par le hook useARC
 */
export interface UseARCMethods<Model> {
    /**
     * Instance ARC utilisée en interne
     */
    arc: ARC<Model>;
    /**
     * Récupère une ressource
     */
    get: (args: {
        props?: ComponentProps;
        params: ComponentPropsWithRequiredModelParams;
    }) => (Promise<Response>);
    /**
     * Supprime une ressource
     */
    remove: (args: {
        props?: ComponentProps;
        params: ComponentPropsWithRequiredModelParams;
    }) => (Promise<Response>);
    /**
     * Crée une nouvelle ressource
     */
    create: (args: {
        props?: ComponentProps;
        params: ComponentPropsWithRequiredModelParams;
        body: any;
    }) => (Promise<Response>);
    /**
     * Met à jour une ressource existante
     */
    update: (args: {
        props?: ComponentProps;
        params: ComponentPropsWithRequiredModelParams;
        body: any;
    }) => (Promise<Response>);
    /**
     * Extrait les paramètres requis à partir des props
     */
    extract: (props: ComponentProps) => ComponentPropsWithRequiredModelParams;
    /**
     * Alias pour extract
     */
    extractParams: (props: ComponentProps) => ComponentPropsWithRequiredModelParams;
    /**
     * Permet d'exécuter une requête personnalisée
     */
    custom: (fetcher: () => Promise<Response>) => (Promise<Response>);
}
/**
 * Type de retour complet du hook useARC
 */
export interface UseARC<Model> {
    error: null | object;
    loading: boolean;
    loaded: boolean;
    response: Response | null;
    arc: UseARCMethods<Model>;
}
