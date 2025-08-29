# Examples

This document provides examples of how to use `react-arc` in different scenarios.

## Fetching a single model using `useARC` hook

This example shows how to fetch and display a single model using the `useARC` hook.

### 1. Define the ARC configuration

First, you need to define the ARC configuration for your model. This configuration tells `react-arc` how to fetch the data.

```typescript
// src/components/album/arc/album.arc.ts
import { ARCConfig } from 'react-arc';

export interface Album {
    id: number;
    title: string;
    userId: number;
}

export interface AlbumProps {
    id: number;
}

export const album: ARCConfig<Album, AlbumProps> = {
    name: 'album',
    actionNamespace: 'ALBUM',
    modelProps: ['id'],
    paths: {
        item: 'https://jsonplaceholder.typicode.com/albums/{id}',
    },
    fetchOnce: true,
};
```

### 2. Create the component

Next, create a component that uses the `useARC` hook to fetch the data.

```tsx
// src/components/album/components/AlbumName.tsx
import React from 'react';
import { useARC } from 'react-arc';
import { album, AlbumProps } from '../arc/album.arc.ts';

export const AlbumName: React.FC<AlbumProps> = (props) => {
    const { error, data: model, loaded } = useARC({
        ARCConfig: album,
        props,
    });

    if (error) return <span>Error!</span>;
    if (!loaded) return <span>Loading...</span>;
    if (!model) return null;

    return <span>{model.title}</span>;
};
```

## Fetching a collection using `createHOC`

This example shows how to fetch and display a collection of models using a Higher-Order Component (HOC) created with `createHOC`.

### 1. Define the ARC configuration

```typescript
// src/components/portfolio/arc/portfolio-list.arc.ts
import { ARCConfig, createHOC } from 'react-arc';
import { Portfolio } from './portfolio.arc.ts';

export type Portfolios = Portfolio[];

export interface PortfolioListProps {
    start: number;
    limit: number;
}

export const portfolioList: ARCConfig<Portfolios, PortfolioListProps> = {
    name: 'portfolioList',
    actionNamespace: 'PORTFOLIO_LIST',
    modelProps: ['start', 'limit'],
    paths: {
        item: 'https://jsonplaceholder.typicode.com/photos?_start={start}&_limit={limit}',
    },
    maxTries: 3,
    fetchOnce: true,
};

export const withPortfolioList = createHOC<Portfolios, PortfolioListProps>({
    ARCConfig: portfolioList,
});
```

### 2. Create the component

```tsx
// src/components/portfolio/components/PortfolioComponent.tsx
import React from 'react';
import { withPortfolioList, PortfolioListProps } from '../arc/portfolio-list.arc.ts';

const PortfolioComponent: React.FC<PortfolioListProps> = (props) => {
    const { model, error, loaded, loading } = props;

    if (error) return <div>Error: {error.message}</div>;
    if (!loaded) return <div>Loading...</div>;

    return (
        <div>
            {loading && <div>Syncing...</div>}
            <ul>
                {(model || []).map((item) => (
                    <li key={item.id}>{item.title}</li>
                ))}
            </ul>
        </div>
    );
};

export default withPortfolioList(PortfolioComponent);
```

## `useDetachedARC` Hook Example

This example shows how to use the `useDetachedARC` hook to fetch data.

```tsx
import React, { useEffect } from 'react';
import { useDetachedARC, ARCConfig } from 'react-arc';

interface PortfolioModel {
    id: number;
    title: string;
    description: string;
}

interface PortfolioProps {
    id: number;
}

const portfolioConfig: ARCConfig<PortfolioModel> = {
    name: 'portfolio',
    actionNamespace: 'PORTFOLIO',
    modelProps: ['id'],
    paths: {
        item: '/api/portfolio/{id}',
    },
};

const Portfolio: React.FC<PortfolioProps> = ({ id }) => {
    const { loading, data: model, arc } = useDetachedARC({
        ARCConfig: portfolioConfig,
        props: { id },
    });

    useEffect(() => {
        arc.get({ params: { id } });
    }, [id]);

    if (loading) return <div>Loading...</div>;
    if (!model) return null;

    return (
        <div>
            <h1>{model.title}</h1>
            <p>{model.description}</p>
        </div>
    );
};

export default Portfolio;
```