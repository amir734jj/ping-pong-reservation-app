import React from 'react';
// noinspection JSUnresolvedVariable
import { render } from 'react-dom';
import './index.css';
import registerServiceWorker from './registerServiceWorker';
import configureStore from "./store/configureStore";
import { Provider } from 'react-redux';
import { HashRouter, Route, Switch } from 'react-router-dom';
import AddForm from "./containers/AddForm";
import DisplayTimes from "./containers/DisplayTimes";
import Nav from "./components/Nav";
import './App.css'

const store = configureStore;

render(
    <Provider store={store}>
        <HashRouter >
            <div>
                <div className="App">
                    <header className="App-header">
                        <h1 className="App-title">Ping Pong Table Scheduler</h1>
                        <Nav/>
                    </header>
                    <div className={'container'}>
                        <Switch>
                            <Route path='/reserve' component={AddForm}/>
                            <Route path='/' component={DisplayTimes}/>
                        </Switch>
                    </div>
                </div>
            </div>
        </HashRouter>
    </Provider>,
    document.getElementById('root')
);

registerServiceWorker();
