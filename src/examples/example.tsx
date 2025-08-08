import {ARCConfig} from "../types/config.types";
import {WithARCInjectProps} from "../types/components.types";
import React from "react";
import {createHOC} from "../HOC/createHOC";
import ModelContainer from "../containers-next/ModelContainer";


// EXAMPLE CONFIGURATION

type Article = {
  id: string
  title: string
  content: string
}

const articleConfig: ARCConfig<Article, RequiredArticleProps> = {
  name: 'article',
  modelProps: ['id'],
  headers: {
    'Content-Type': 'application/json',
    'Authorization': 'Bearer {token}',
  },
  paths: {
    item: '/sample/{id}',
  }
}

interface RequiredArticleProps {
  id: string
}

const withArticle = createHOC<RequiredArticleProps, Article>({
  ARCConfig: articleConfig
})


// EXAMPLE CONFIGURATION END

// EXAMPLES HOC (for chaining)

// HOC INJECTS SOME PROPS AND  FORWARDS THE OTHERS PROPS

const TOKEN = 'sample_token'

export interface InjectedProps {
  token?: string | null,
}


export function withToken<P>(
  Wrapped: React.ComponentType<P & InjectedProps>
) {
  function WithToken (ownProps: P) {
    const token = TOKEN
    return <Wrapped {...ownProps as P} token={token}/>
  }
  WithToken.displayName = `WithToken(${Wrapped.displayName || Wrapped.name})`
  return WithToken
}

// HOC THAT DEPENDS/RELIES ON ARC

interface ErrorAndLoaderHandler<Model, P> extends Omit<WithARCInjectProps<Model,P>, 'model'> {
  model: Model
}

export function withARCLoader<P , Model = any>(
  Wrapped: React.ComponentType<P & ErrorAndLoaderHandler<Model, P>>
) {
  function WithARCLoader(ownProps:  WithARCInjectProps<Model, P>) {
    const {loaded, error} = ownProps as ErrorAndLoaderHandler<Model,P>

    if (error) return <div>Error: {error.message}</div>
    if (!loaded) return <div>Loading...</div>
    return <Wrapped {...ownProps as  P & ErrorAndLoaderHandler<Model, P>} model={ownProps.model as Model}/>
  }
  WithARCLoader.displayName = `WithARCLoader(${Wrapped.displayName || Wrapped.name})`
  return WithARCLoader
}


// EXAMPLE COMPONENTS
/**
 * 1. Simple Component bootstrapped with `withSample` HOC.
 *   - Uses the `withSample` HOC without extending props.
 */
const ArticleWithoutExtendedProps = withArticle((props) => {
  const {error, loaded, loading} = props

  // type is correctly retrieved here
  const article = props.model

  if (error) return <div>Error: {error.message}</div>
  if (!loaded) return <div>Loading...</div>
  if (!article) return <div>No article found</div>

  return (
    <div>
      {loading && <p>loading...</p>}
      <h1>{article.title}</h1>
      <p>id: {article.id}</p>
      <p>content: {article.content}</p>
    </div>
  )
})


/**
 * 2. Component with Extended Props and extends `SampleProps`.
 *   - Uses the `withSample` HOC and extends props with an additional `name` property.
 */
interface ArticleWithExtendedPropsProps extends RequiredArticleProps {
  name: string
}

const ArticleWithExtendedProps = withArticle<ArticleWithExtendedPropsProps>((props) => {
  const {error, loaded, loading, name} = props

  // type is correctly retrieved here
  const article = props.model

  if (error) return <div>Error: {error.message}</div>
  if (!loaded) return <div>Loading...</div>
  if (!article) return <div>No article found</div>

  return (
    <div>
      {loading && <p>loading...</p>}
      <h1>{article.title}</h1>
      <p>id: {article.id}</p>
      <p>content: {article.content}</p>
      <p>name: {name}</p>
    </div>
  )
})


/**
 * 3. Component without Extended Props and with Chaining HOC. (Trying to infer the type of `model` without extending props)
 *   - Uses the `withSample` HOC and `withARCLoader` HOC, but does not extend props.
 *   - This case demonstrates a potential issue where the type of `model` is not retrieved correctly.
 *
 *   Note: This case is problematic because the type of `model` is not inferred correctly when using `withARCLoader` without extending props.
 *   and force the developer to be declarative with the type of props.
 *   example : See `ArticleDeclarativeWithoutExtendedWithChainingProps`
 */

export const ArticleWithoutExtendedWithChainingProps = withArticle(withARCLoader((props) => {
  const {error, loaded, loading} = props

  // type is not retrieved here
  const article = props.model

  if (error) return <div>Error: {error.message}</div>
  if (!loaded) return <div>Loading...</div>
  if (!article) return <div>No article found</div>

  return (
    <div>
      {loading && <p>loading...</p>}
      <h1>{article.title}</h1>
      <p>id: {article.id}</p>
      <p>content: {article.content}</p>
    </div>
  )
}))

/**
 * 4. Component with Chaining HOC and Declarative Props.
 *   - Uses the `withSample` HOC and `withARCLoader` HOC, but is declared with explicit props.
 *   - This case demonstrates how to correctly retrieve the type of `model` when using `withARCLoader`.
 */

const ArticleDeclarativeWithoutExtendedWithChainingProps = withArticle<RequiredArticleProps>(withARCLoader((props) => {
  const {error, loaded, loading} = props

  // type is correctly retrieved here
  const article = props.model

  if (error) return <div>Error: {error.message}</div>
  if (!loaded) return <div>Loading...</div>
  if (!article) return <div>No article found</div>

  return (
    <div>
      {loading && <p>loading...</p>}
      <h1>{article.title}</h1>
      <p>id: {article.id}</p>
      <p>content: {article.content}</p>
    </div>
  )
}))


/**
 * 5. Component with Extended Props and Chaining HOC.
 *   - Uses the `withSample` HOC and `withARCLoader` HOC, extending props with an additional `name` property.
 *   - This case demonstrates how to correctly retrieve the type of `model` when using `withARCLoader` with extended props.
 */

interface ArticleWithExtendedPropsAndChainingProps extends RequiredArticleProps {
  name: string
}

const ArticleWithExtendedPropsAndChaining = withArticle<ArticleWithExtendedPropsAndChainingProps>(withARCLoader((props) => {
  const {error, loaded, loading, name} = props

  // type is correctly retrieved here
  const article = props.model

  if (error) return <div>Error: {error.message}</div>
  if (!loaded) return <div>Loading...</div>
  if (!article) return <div>No article found</div>

  return (
    <div>
      {loading && <p>loading...</p>}
      <h1>{article.title}</h1>
      <p>id: {article.id}</p>
      <p>content: {article.content}</p>
      <p>name: {name}</p>
    </div>
  )
}))

/**
 * 6. Component with Multiple chaining HOCs.
 *   - Uses the `withSample` HOC, `withARCLoader` HOC, and `withToken` HOC.
 *   - This case demonstrates how to chain multiple HOCs together and retrieve the type of `model` correctly.
 *   - The `withToken` HOC injects an additional `token` prop.
 *   - The `withARCLoader` HOC is used to handle loading and error states.
 *   - The `withSample` HOC is used to fetch the sample data based on the `id` prop.
 */

const ArticleWithMultipleChainingHOCs = withToken(
  withArticle(
    withARCLoader((props) => {
        const {error, loaded, loading} = props

        // type is not correctly retrieved here
        const article = props.model

        if (error) return <div>Error: {error.message}</div>
        if (!loaded) return <div>Loading...</div>
        if (!article) return <div>No article found</div>

        return (
          <div>
            {loading && <p>loading...</p>}
            <h1>{article.title}</h1>
            <p>id: {article.id}</p>
            <p>content: {article.content}</p>
          </div>
        )
      }
    )
  )
)

/** * 7. Component with Tokenized HOC.
 *  - Uses the `withSample` HOC, `withARCLoader` HOC, and `withToken` HOC.
 *  - This case demonstrates how to use a tokenized HOC to fetch data with a
 *  token injected into the request headers.
 *  - The `withToken` HOC injects a `token` prop, which is used in the request headers.
 *  - The `withARCLoader` HOC is
 */

const withSampleTokenized = createHOC<RequiredArticleProps, Article>({
  ARCConfig: articleConfig,
  Container: withToken(ModelContainer)
})

const ArticleDeclarativeTokenizedContainerProps = withSampleTokenized<RequiredArticleProps>(withARCLoader((props) => {
  const {error, loaded, loading} = props

  // type is correctly retrieved here
  const article = props.model

  if (error) return <div>Error: {error.message}</div>
  if (!loaded) return <div>Loading...</div>
  if (!article) return <div>No article found</div>

  return (
    <div>
      {loading && <p>loading...</p>}
      <h1>{article.title}</h1>
      <p>id: {article.id}</p>
      <p>content: {article.content}</p>
    </div>
  )
}))





export const Demo = () => {
  return (
    <div>
      <h1>Demo Component</h1>

      <ArticleWithoutExtendedProps id="123"/>
      <ArticleWithExtendedProps id="123" name="Gus"/>

      {/* TODO: FIX THIS CASE */}
      <ArticleWithoutExtendedWithChainingProps id="123"/>

      <ArticleDeclarativeWithoutExtendedWithChainingProps id="123"/>
      <ArticleWithExtendedPropsAndChaining id="123" name="Gus"/>

      {/* TODO: FIX THIS CASE, SAME ISSUE */}
      <ArticleWithMultipleChainingHOCs id="123"/>

      <ArticleDeclarativeTokenizedContainerProps  id="123"/>
    </div>
  )
}
