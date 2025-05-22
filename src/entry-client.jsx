import React from 'react';
import { createRoot, hydrateRoot } from 'react-dom/client';
import App from './App.jsx';


const container = document.getElementById('root');

const isSSR = container.hasChildNodes();
const props = window.__INITIAL_PROPS__ || {};


if (isSSR) {
  hydrateRoot(container, <App {...props} />);
} else {
  createRoot(container).render(<App {...props} />);
}