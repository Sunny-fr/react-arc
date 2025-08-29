# Welcome to React-ARC

**React Abstract Redux Containers**

`react-arc` is a powerful library that simplifies data fetching and state management in React applications by abstracting away the complexities of Redux. It provides a declarative way to manage collections and models from a RESTful API, allowing you to focus on building your UI.

## Why use React-ARC?

*   **Simplify Your Code:** `react-arc` reduces the amount of boilerplate code you need to write for data fetching and state management.
*   **Improve Developer Experience:** With `react-arc`, you can define your data requirements in a simple configuration object and let the library handle the rest.
*   **Focus on Your UI:** By abstracting away the complexities of Redux, `react-arc` allows you to focus on what matters most: building a great user interface.

## Key Features

*   **Declarative Data Fetching:** Define your API endpoints and data requirements in a simple configuration object (`ARCConfig`).
*   **Automatic Redux Integration:** `react-arc` handles the Redux store, actions, and reducers for you.
*   **HOCs and Hooks:** Choose between Higher-Order Components (HOCs) and hooks to connect your components to the Redux store.
*   **Optimistic Updates:** Improve user experience with optimistic updates for create, update, and delete operations.
*   **Server-Side Rendering (SSR) Support:** Build universal applications with SSR support.
*   **Extensible and Customizable:** `react-arc` is highly extensible and customizable to fit your specific needs.

## Core Components

*   **`Container` and `ModelContainer`:** These components provide a simple way to fetch and display data in your application.
*   **`useARC` and `useDetachedARC`:** These hooks allow you to fetch data and manage state in your functional components.
*   **`withARC` and `createHOC`:** These Higher-Order Components (HOCs) provide a way to connect your class-based components to the Redux store.

## Getting Started

To get started with `react-arc`, check out the [Quick Start](./QuickStart.md) guide.