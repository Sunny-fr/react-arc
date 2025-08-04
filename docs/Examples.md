
# Examples

This document provides examples of how to use `react-arc` in different scenarios.

## Basic Example

This example shows how to fetch and display a single model.

```javascript
import React from 'react';
import { withARC } from 'react-arc';

const portfolioConfig = {
    name: 'portfolio',
    uppercaseName: 'PORTFOLIO',
    modelProps: ['id'],
    paths: {
        item: '/api/portfolio/{id}',
    },
};

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

## Collection Example

This example shows how to fetch and display a collection of models.

```javascript
import React from 'react';
import { withARC } from 'react-arc';

const portfolioConfig = {
    name: 'portfolio',
    uppercaseName: 'PORTFOLIO',
    modelProps: ['id'],
    collectionProps: ['page', 'size'],
    paths: {
        collection: '/api/portfolio?page={page}&size={size}',
    },
};

const PortfolioList = ({ collection }) => {
    if (!collection) return <div>Loading...</div>;
    return (
        <ul>
            {collection.map(item => (
                <li key={item.id}>{item.title}</li>
            ))}
        </ul>
    );
};

export default withARC(portfolioConfig)(PortfolioList);
```

## `useARC` Hook Example

This example shows how to use the `useARC` hook to fetch data.

```javascript
import React, { useEffect } from 'react';
import { useARC } from 'react-arc';

const portfolioConfig = {
    name: 'portfolio',
    uppercaseName: 'PORTFOLIO',
    modelProps: ['id'],
    paths: {
        item: '/api/portfolio/{id}',
    },
};

const Portfolio = ({ id }) => {
    const { loading, response, arc } = useARC({
        ARCConfig: portfolioConfig,
        props: { id },
    });

    useEffect(() => {
        arc.get({ params: { id } });
    }, [id]);

    if (loading) return <div>Loading...</div>;
    if (!response) return null;

    const { model } = response;

    return (
        <div>
            <h1>{model.title}</h1>
            <p>{model.description}</p>
        </div>
    );
};

export default Portfolio;
```
