import React from 'react';
import './index.css';

import { createRoot } from 'react-dom/client';
import { AppRouter } from './AppRouter';

const container = document.getElementById('root');

if (!container) {
    throw new Error('Failed to find the root element with id "root"');
}

const root = createRoot(container);

root.render(
    <React.StrictMode>
        <AppRouter />
    </React.StrictMode>
);