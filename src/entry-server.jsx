import React from 'react';
import { renderToString } from 'react-dom/server';
import App from './App.jsx';

export function render(url, context = {}) {
  const html = renderToString(<App url={url} {...context} />);
  return { html, context };
}