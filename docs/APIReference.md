
# API Reference

This document provides a detailed reference for the `react-arc` API.

## Core Components and Hooks

### `withARC(config)`

A higher-order component that connects your component to the Redux store and provides it with the necessary props to interact with the API.

**Arguments**

*   `config` (object): The configuration object for your data model.

**Returns**

A function that takes your component as an argument and returns a new component connected to the Redux store.

### `useARC(options)`

A React hook that provides a simple way to interact with the API.

**Arguments**

*   `options` (object): An object containing the `ARCConfig` and `props`.

**Returns**

An object with the following properties:

*   `loading` (boolean): `true` if a request is in progress.
*   `loaded` (boolean): `true` if a request has completed successfully.
*   `error` (object): The error object if a request fails.
*   `response` (object): The response from the API.
*   `arc` (object): An object with methods to interact with the API (`get`, `create`, `update`, `remove`).

### `mixerStore(options)`

A function that creates a Redux reducer for your data model.

**Arguments**

*   `options` (object): An object containing the `config` for your data model.

**Returns**

A Redux reducer.

## Configuration

The configuration object is the heart of `react-arc`. It defines how the library should interact with your API.

**Properties**

*   `name` (string, required): The name of your data model. This will be used as the key in the Redux store.
*   `uppercaseName` (string, required): The uppercase version of the name. This is used to generate action types.
*   `modelProps` (array, required): An array of strings that represent the unique identifier for a model (e.g., `['id']`).
*   `collectionProps` (array): An array of strings that represent the properties of a collection (e.g., `['page', 'size']`).
*   `paths` (object, required): An object containing the API endpoints for your data model.
    *   `item` (string): The endpoint for a single model (e.g., `/api/users/{id}`).
    *   `collection` (string): The endpoint for a collection of models (e.g., `/api/users?page={page}&size={size}`).
*   `methods` (object): An object containing the HTTP methods for CRUD operations. Defaults to `GET`, `POST`, `PUT`, `DELETE`.
*   `defaultModel` (object): The default model to use when creating a new model.
*   `fetchOnce` (boolean): If `true`, the data will be fetched only once.
*   `refetchOnError` (boolean): If `true`, the data will be refetched if an error occurs.

## Advanced Usage

For more advanced usage, including optimistic updates, server-side rendering, and custom actions, please refer to the [Examples](./Examples.md).
