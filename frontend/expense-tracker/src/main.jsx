/**
 * Entry point of the React application.
 * This file is responsible for mounting the root React component
 * into the DOM using React 18's createRoot API.
 */

import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

// Global styles applied across the application
import './index.css';

// Root application component
import App from './App.jsx';

// Locate the root DOM node and render the React app
createRoot(document.getElementById('root')).render(
  <StrictMode>
    {/* App is wrapped in StrictMode to highlight potential problems
        during development such as deprecated APIs or side effects */}
    <App />
  </StrictMode>
);
