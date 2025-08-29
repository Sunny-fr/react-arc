
# API Reference

This document provides a detailed reference for the `react-arc` API.

## `ARCConfig` Object

The `ARCConfig` object is the heart of `react-arc`. It defines how the library should interact with your API.

| Property                   | Type                               | Required | Description                                                                                                                                 |
| -------------------------- | ---------------------------------- | -------- | ------------------------------------------------------------------------------------------------------------------------------------------- |
| `name`                     | `string`                           | Yes      | The name of your data model. This will be used as the key in the Redux store.                                                              |
| `actionNamespace`          | `string`                           | No       | The namespace for the Redux actions (e.g., `PORTFOLIO`). If not provided, it will be generated from the `name`.                             |
| `modelProps`               | `string[]`                         | Yes      | An array of strings that represent the unique identifier for a model (e.g., `['id']`).                                                    |
| `paths`                    | `ARCConfigPaths`                   | Yes      | An object containing the API endpoints for your data model.                                                                                 |
| `methods`                  | `ARCHttpRestMethodMap`             | No       | An object containing the HTTP methods for CRUD operations. Defaults to `GET`, `POST`, `PUT`, `DELETE`.                                      |
| `defaultModel`             | `ARCModel<Model>`                  | No       | The default model to use when creating a new model.                                                                                         |
| `defaultProps`             | `any`                              | No       | The default props to pass to the component.                                                                                                 |
| `fetchOnce`                | `boolean`                          | No       | If `true`, the data will be fetched only once.                                                                                              |
| `refetchOnError`           | `boolean`                          | No       | If `true`, the data will be refetched if an error occurs when the component is remounted.                                                   |
| `retryOnError`             | `boolean`                          | No       | If `true`, the request will be retried if it fails.                                                                                         |
| `headers`                  | `ARCConfigHeaders`                 | No       | The headers to add to the fetch request. Supports templating using component's props and `{syntax}`.                                      |
| `maxPendingRequestsPerReducer` | `number`                           | No       | The maximum number of simultaneous requests per reducer.                                                                                    |
| `requestFetchDelay`        | `number`                           | No       | The delay in milliseconds between two requests.                                                                                             |
| `maxTries`                 | `number`                           | No       | The number of times to retry a failed request.                                                                                              |
| `retryConditionFn`         | `RetryConditionFn<Model, RequiredProps>` | No       | A function that determines whether a failed request should be retried.                                                                    |
| `fetchers`                 | `FetcherMap<Model, RequiredProps>` | No       | An object containing custom fetcher functions.                                                                                              |

### `ARCConfigPaths`

| Property | Type     | Description                                                              |
| -------- | -------- | ------------------------------------------------------------------------ |
| `item`   | `string` | The endpoint for a single model (e.g., `/api/users/{id}`).               |
| `read`   | `string` | The endpoint for reading a single model. Defaults to `item`.             |
| `delete` | `string` | The endpoint for deleting a single model. Defaults to `item`.            |
| `update` | `string` | The endpoint for updating a single model. Defaults to `item`.            |
| `create` | `string` | The endpoint for creating a new model.                                   |

## Core Functions and Hooks

### `createReducer(options)`

A function that creates a Redux reducer for your data model.

*   **`options`**: An object containing the `config` for your data model.
*   **Returns**: A Redux reducer.

### `createHOC(options)`

A function that creates a Higher-Order Component (HOC).

*   **`options`**: An object containing the `ARCConfig`.
*   **Returns**: A HOC that you can use to wrap your components.

### `useARC(options)`

A React hook that provides a simple way to interact with the API.

*   **`options`**: An object containing the `ARCConfig` and `props`.
*   **Returns**: An object with the following properties:
    *   `data` (Model | null): The fetched data.
    *   `error` (object | null): The error object if a request fails.
    *   `loaded` (boolean): `true` if a request has completed successfully.
    *   `loading` (boolean): `true` if a request is in progress.
    *   `ARCConfig` (ARCConfig): The configuration object.

### `useDetachedARC(options)`

A React hook that provides a simple way to interact with the API, but without being attached to a specific component.

*   **`options`**: An object containing the `ARCConfig` and `props`.
*   **Returns**: An object with the same properties as `useARC`.

## HOC Props

When you wrap a component with a HOC created by `createHOC`, it will receive the following props:

| Prop      | Type      | Description                                                              |
| --------- | --------- | ------------------------------------------------------------------------ |
| `model`   | `Model`   | The fetched model or collection.                                         |
| `loading` | `boolean` | `true` if a request is in progress.                                      |
| `loaded`  | `boolean` | `true` if a request has completed successfully.                          |
| `error`   | `object`  | The error object if a request fails.                                     |
| `arc`     | `object`  | An object with methods to interact with the API (`get`, `create`, `update`, `remove`). |

**Note on `model` vs `data`:** The HOCs (`withARC`, `createHOC`) pass the fetched data as the `model` prop. The hooks (`useARC`, `useDetachedARC`) pass the fetched data as the `data` prop.
