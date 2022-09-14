import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { BrowserRouter } from "react-router-dom";
import { createStore, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import thunk from "redux-thunk";
import rootReducer, { rootSaga } from "./modules";
import createSagaMiddleware from 'redux-saga';
import { loadableReady } from '@loadable/component';

const sagaMiddleware = createSagaMiddleware();

const store = createStore(
    rootReducer,
    window.__PRELOADED_STATE__,
    applyMiddleware(thunk, sagaMiddleware)
);

sagaMiddleware.run(rootSaga);

const root = ReactDOM.createRoot(document.getElementById('root'));

async function render() {
    if (process.env.NODE_ENV === 'production') {
        await loadableReady();
    }
    root.render(
        <Provider store={store}>
            <BrowserRouter>
                <App />
            </BrowserRouter>
        </Provider>
    );
}

render();