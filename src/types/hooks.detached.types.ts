import {ARC} from "../hooks/arc"


export type ARCResponse<Model> = Model | null | undefined

/**
 * État interne du hook useARC
 */
export interface UseDetachedARCState<Model> {
  error: null | any
  loading: boolean
  loaded: boolean
  response?: ARCResponse<Model>
  pending: boolean
}

/**
 * Interface pour les méthodes CRUD exposées par le hook useARC
 */
export interface UseDetachedARCMethods<Model, RequiredProps, OwnProps = {}> {
  /**
   * Instance ARC utilisée en interne
   */
  arc: ARC<Model,RequiredProps, OwnProps>

  /**
   * Récupère une ressource
   */
  get: (args: {
    props?: RequiredProps & OwnProps
    params: RequiredProps
  }) => Promise<ARCResponse<Model>>

  /**
   * Supprime une ressource
   */
  remove: (args: {
    props?: RequiredProps & OwnProps
    params: RequiredProps
  }) => Promise<ARCResponse<Model>>

  /**
   * Crée une nouvelle ressource
   */
  create: (args: {
    props?: RequiredProps & OwnProps
    params: RequiredProps
    body: any
  }) => Promise<ARCResponse<Model>>

  /**
   * Met à jour une ressource existante
   */
  update: (args: {
    props?: RequiredProps & OwnProps
    params: RequiredProps
    body: any
  }) => Promise<ARCResponse<Model>>

  /**
   * Extrait les paramètres requis à partir des props
   */
  extract: (props: RequiredProps) => RequiredProps

  /**
   * Alias pour extract
   */
  extractParams: (props: RequiredProps) => RequiredProps

  /**
   * Permet d'exécuter une requête personnalisée
   */
  custom: (fetcher: () => Promise<ARCResponse<Model>>) => Promise<ARCResponse<Model>>
}

/**
 * Type de retour complet du hook useARC
 */
export interface UseDetachedARC<Model, RequiredProps, OwnProps = {}> {
  error: null | any
  loading: boolean
  loaded: boolean
  response: ARCResponse<Model>
  arc: UseDetachedARCMethods<Model, RequiredProps, OwnProps>
}
