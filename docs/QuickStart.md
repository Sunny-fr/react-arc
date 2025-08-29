# Quick Start

This guide will walk you through the basic steps of setting up and using `react-arc` in your React application.

## Installation

First, install `react-arc` and its peer dependencies:

```bash
npm install react-arc @reduxjs/toolkit react react-dom react-redux redux
```

## Store Setup

Set up your Redux store using `@reduxjs/toolkit` and `createReducer` from `react-arc`.

**`src/store.ts`**

```typescript
import { configureStore } from '@reduxjs/toolkit';
import { createReducer } from 'react-arc';
import { portfolioConfig } from './portfolio.arc.ts';

const reducers = {
  portfolio: createReducer({ config: portfolioConfig }),
}

export const store = configureStore({
    reducer: reducers
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
```

## ARC Configuration

Create a configuration file for your data model. This file will define the API endpoint, model properties, and other settings.

**`src/portfolio.arc.ts`**

```typescript
import { ARCConfig, createHOC } from 'react-arc';

export interface Portfolio {
    id: number;
    title: string;
    description: string;
}

export const portfolioConfig: ARCConfig<Portfolio> = {
    name: 'portfolio',
    actionNamespace: 'PORTFOLIO',
    modelProps: ['id'],
    paths: {
        item: 'https://jsonplaceholder.typicode.com/photos/{id}',
    },
};

export const withPortfolio = createHOC<Portfolio>({ ARCConfig: portfolioConfig });
```

## Component Usage

Use the `withPortfolio` higher-order component to connect your component to the Redux store.

**`src/Portfolio.tsx`**

```tsx
import React from 'react';
import { withPortfolio } from './portfolio.arc.ts';

interface PortfolioProps {
    model?: Portfolio;
    id: number;
}

const Portfolio: React.FC<PortfolioProps> = ({ model }) => {
    if (!model) return <div>Loading...</div>;
    return (
        <div>
            <h1>{model.title}</h1>
            <p>{model.description}</p>
        </div>
    );
};

export default withPortfolio(Portfolio);
```

## App Entry Point

Wrap your application with the `Provider` from `react-redux`.

**`src/index.tsx`**

```tsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { store } from './store';
import Portfolio from './Portfolio';

const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
);

root.render(
    <React.StrictMode>
        <Provider store={store}>
            <Portfolio id={1} />
        </Provider>
    </React.StrictMode>
);
```

This is a basic example of how to use `react-arc`. For more advanced usage, please refer to the [API Reference](./APIReference.md) and [Examples](./Examples.md).