
# Advanced Usage

This document provides examples of how to use `react-arc` in advanced scenarios.

## Cascading Requests

Sometimes, you need to fetch data that depends on the result of another request. For example, you might need to fetch a list of items, and then for each item, fetch additional details.

This can be achieved by using the `useARC` hook multiple times in the same component.

```tsx
import React from 'react';
import { useARC, ARCConfig } from 'react-arc';

// Assuming you have these ARC configurations defined
import { postsConfig, userConfig } from './configs';

const PostDetails: React.FC<{ postId: number }> = ({ postId }) => {
    const { data: post, loaded: postLoaded } = useARC({
        ARCConfig: postsConfig,
        props: { id: postId },
    });

    const { data: user, loaded: userLoaded } = useARC({
        ARCConfig: userConfig,
        props: { id: post?.userId },
        // We only want to fetch the user when we have the post data
        options: { skip: !postLoaded || !post },
    });

    if (!postLoaded || !userLoaded) return <div>Loading...</div>;
    if (!post || !user) return <div>Data not found.</div>;

    return (
        <div>
            <h1>{post.title}</h1>
            <p>By {user.name}</p>
            <p>{post.body}</p>
        </div>
    );
};
```

## Custom Fetchers

`react-arc` allows you to provide your own fetcher functions to handle non-standard API responses. This is useful when the API returns the data in a format that is different from what `react-arc` expects.

You can provide a custom fetcher function using the `fetchers` property in the `ARCConfig` object.

```typescript
import { ARCConfig, Fetcher } from 'react-arc';


interface UserProps {
    id: number;
}

interface User {
    id: number;
    name: string;
}

const customUserFetcher: Fetcher<User, UserProps> = (params, config, props, axiosOptions) => {
    // Assuming the API returns the user object inside a `data` property
    return axios.get(`/api/users/${params.id}`, axiosOptions).then(response => response.data.data);
};

export const userConfig: ARCConfig<User, UserProps> = {
    name: 'user',
    modelProps: ['id'],
    paths: {
        item: '/api/users/{id}',
    },
    fetchers: {
        fetch: customUserFetcher,
    },
};
```

## Data Transformation with Selectors

You can use selector functions to transform the data before it's passed to your components. This is useful when you need to compute derived data or change the shape of the data.

```tsx
import React from 'react';
import { useARC } from 'react-arc';
import { postsConfig, PostProps } from './configs';

const customPropsFromTheStore = (state, props) => {
    // state is the Redux state
   // pick any data from the RootState
    const foo = state.someReducer.someData
    return {
      foo
    }
};

const PostTitle: React.FC<PostProps> = (props) => {
  const { postId } = props
    const { data: post } = useARC({
        ARCConfig: postsConfig,
        props: props,
        selectors: [customPropsFromTheStore],
    });

    return <h1>{post.title}</h1>;
};
```
