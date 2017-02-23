import React, {Component} from 'react';
import {Provider} from 'react-redux'
import store from './store'
import Application from './layout/ApplicationLayout'
import Portfolio from './portfolio/containers/Portfolio'

function App () {
        return (
            <Provider store={store}>
                <Application>
                    <Portfolio />
                </Application>
            </Provider>
        );
}

export default App;
