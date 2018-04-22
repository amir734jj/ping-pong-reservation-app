import React from 'react';
// noinspection JSUnresolvedVariable
import { render } from 'react-dom';
import './index.css';
import Main from './containers/Main';
import registerServiceWorker from './registerServiceWorker';
import configureStore from "./store/configureStore";
import { Provider } from 'react-redux';

const store = configureStore;

render(
    <Provider store={store}>
        <Main />
    </Provider>,
    document.getElementById('root')
);
registerServiceWorker();
