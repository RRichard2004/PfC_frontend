import React from 'react';
import ReactDOM from 'react-dom/client';
import './styles/index.css';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom'; // Import BrowserRouter

import App from './App';
import stores from './store';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <Provider store={stores}>
      <Router>  {/* Wrap App in Router to enable routing */}
        <App />
      </Router>
    </Provider>
);
