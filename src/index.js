import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import TufferApp from './TufferApp';

import 'firebase/compat/database';
import React from 'react';

const tufferPath = '/SuperDuperExtremelyTuffAppAndQuantativeScouting';
const currentPath = window.location.pathname.replace(/\/+$/, '');
const isTufferRoute =
    currentPath === tufferPath || currentPath === `${tufferPath}.html`;
const mountNode =
    document.getElementById('root') || document.getElementById('TufferApp');

if (!mountNode) {
    throw new Error('Unable to find a React mount node.');
}

const root = ReactDOM.createRoot(mountNode);
root.render(
    <React.StrictMode>
        {isTufferRoute ? <TufferApp /> : <App />}
    </React.StrictMode>
);
