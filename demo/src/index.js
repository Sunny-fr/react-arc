import React from 'react';
import {render} from 'react-dom';
import App from './App';

const element = document.getElementById('root')
render( <App />, element);

//enables hot reloading
if (module.hot) {
    module.hot.accept('./App', () => {
        const NewApp = require('./App').default
        render(<NewApp />, element)
    })
}
