
# Quick Start

This guide will walk you through the basic steps of setting up and using `react-arc` in your React application.

## Installation

First, install `react-arc` and its peer dependencies:

```bash
npm install react-arc react react-dom react-redux redux redux-thunk
```

## Configuration

Create a configuration file for your data models. This file will define the API endpoints, model properties, and other settings.

**`src/config.js`**

```javascript
export const portfolioConfig = {
    name: 'portfolio',
    uppercaseName: 'PORTFOLIO',
    modelProps: ['id'],
    collectionProps: ['size', 'page'],
    paths: {
        item: '/api/portfolio/{id}',
        collection: '/api/portfolio?page={page}&size={size}',
    },
};
```

## Store Setup

Set up your Redux store using `createReducer` from `react-arc`.

**`src/store.js`**

```javascript
import { createStore, combineReducers } from 'redux';
import { createReducer } from 'react-arc';
import { portfolioConfig } from './config';

const rootReducer = combineReducers({
    portfolio: createReducer({ config: portfolioConfig }),
});

const store = createStore(rootReducer);

export default store;
```

## Component Usage

Use the `withARC` higher-order component to connect your components to the Redux store.

**`src/Portfolio.js`**

```javascript
import React from 'react';
import { withARC } from 'react-arc';
import { portfolioConfig } from './config';

const Portfolio = ({ model }) => {
    if (!model) return <div>Loading...</div>;
    return (
        <div>
            <h1>{model.title}</h1>
            <p>{model.description}</p>
        </div>
    );
};

export default withARC(portfolioConfig)(Portfolio);
```

## App Entry Point

Wrap your application with the `Provider` from `react-redux`.

**`src/index.js`**

```javascript
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import store from './store';
import Portfolio from './Portfolio';

ReactDOM.render(
    <Provider store={store}>
        <Portfolio id="1" />
    </Provider>,
    document.getElementById('root')
);
```

This is a basic example of how to use `react-arc`. For more advanced usage, please refer to the [API Reference](./APIReference.md) and [Examples](./Examples.md).
