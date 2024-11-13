import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';

const rootElement = document.getElementById('root');
if (!rootElement) {
  throw new Error("Root element with id 'root' not found. Check your index.html file.");
}

const root = createRoot(rootElement);
root.render(<App />);
