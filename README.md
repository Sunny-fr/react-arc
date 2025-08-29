# ARC (React Abstract Redux Containers)

[![react-arc version](https://img.shields.io/npm/v/react-arc.svg)](https://www.npmjs.com/package/react-arc) [![react-arc downloads](https://img.shields.io/npm/dm/react-arc.svg)](https://www.npmjs.com/package/react-arc)

`react-arc` is a powerful library that simplifies data fetching and state management in React applications by abstracting away the complexities of Redux. It provides a declarative way to manage collections and models from a RESTful API, allowing you to focus on building your UI.

## Core Concepts

*   **Declarative Data Fetching:** Define your data sources using a simple configuration object (`ARCConfig`). `react-arc` handles the rest, including Redux actions, reducers, and selectors.
*   **HOCs and Hooks:** Choose between Higher-Order Components (HOCs) and hooks to connect your components to the Redux store. Use `createHOC` to create HOCs for a class-based or container-component approach, or use the `useARC` and `useDetachedARC` hooks for a more modern, functional approach.
*   **Seamless Redux Integration:** `react-arc` works seamlessly with Redux, but you don't need to be a Redux expert to use it. It automates the process of creating actions and reducers, so you can focus on your application logic.

## Best Practices

Based on the experience from the Horus Client project, we recommend the following best practices:

*   **Separate ARC Configurations:** Keep your `ARCConfig` objects in separate files (e.g., `*.arc.ts`). This makes your code more organized and easier to maintain.
*   **Use TypeScript:** Use TypeScript to define your models and props. This will help you catch errors at compile time and improve the overall quality of your code.
*   **Choose the Right Tool for the Job:** Use `withARC` (or a HOC created with `createHOC`) for components that are responsible for fetching and displaying data. Use `useARC` for smaller components that need to access data from the store.

## Documentation

For detailed documentation, please visit the [docs](./docs/Home.md) directory.

*   [Home](./docs/Home.md)
*   [Quick Start](./docs/QuickStart.md)
*   [API Reference](./docs/APIReference.md)
*   [Examples](./docs/Examples.md)
*   [Advanced Usage](./docs/AdvancedUsage.md)

## Live Demo

Check out the live demo at [https://toolbox.sunny.fr/react-arc/](https://toolbox.sunny.fr/react-arc/).