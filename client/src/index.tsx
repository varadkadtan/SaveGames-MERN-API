import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom'; // Import BrowserRouter

import './index.css';
import App from './App';


const container = document.getElementById('root');
const root = createRoot(container!); // createRoot(container!) if you use TypeScript
root.render(
  <React.StrictMode>
    <BrowserRouter> {/* Wrap MyGames with BrowserRouter */}
      <App />
    </BrowserRouter>
  </React.StrictMode>
);
