import React from 'react';
import './index.css';
import { createRoot } from 'react-dom/client';
import { App } from './App';

const container = document.getElementById('root');

if (!container) {
    throw new Error('Failed to find the root element with id "root"');
}

const root = createRoot(container);

root.render(
    <React.StrictMode>
        <App />
    </React.StrictMode>
);