import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import reducer from '../reducers/reducer';

const storeDev = createStore(
    reducer,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),, // default state of the application
    applyMiddleware(thunk, logger)
);

const storeProd = createStore(
    reducer,
    {}, // default state of the application
    applyMiddleware(thunk)
);

export default (process.env.NODE_ENV === 'dev' ? storeDev : storeProd);