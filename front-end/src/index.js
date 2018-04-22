import React from 'react';
// noinspection JSUnresolvedVariable
import { render } from 'react-dom';
import './index.css';
import Main from './containers/Main';
import registerServiceWorker from './registerServiceWorker';
import configureStore from "./store/configureStore";
import { Provider } from 'react-redux';
import { HashRouter, Route } from 'react-router-dom';

const store = configureStore;

render(
    <Provider store={store}>
        <HashRouter >
            <Route path="/" component={Main}/>
        </HashRouter>
    </Provider>,
    document.getElementById('root')
);

registerServiceWorker();
