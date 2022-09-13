import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import Accommodate from "./ch7/Accommodate";

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
    <React.StrictMode>
        <React.StrictMode>
            <Accommodate />
        </React.StrictMode>
    </React.StrictMode>
);

