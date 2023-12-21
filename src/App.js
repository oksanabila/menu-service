import React from 'react';
import ReactDOM from 'react-dom/client';

import './index.css';
import {BrowserRouter} from "react-router-dom";
import {Provider} from "react-redux";
import {store} from "./redux";
import {Router} from "./routing/Router";


const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
    <Provider store={store}>
        <BrowserRouter>
            <div className={'wrapper'}>
                <Router/>
            </div>
        </BrowserRouter>
    </Provider>
);
