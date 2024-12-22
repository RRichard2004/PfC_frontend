import React from 'react';
import ReactDOM from 'react-dom/client';
import './styles/index.css';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import { SnackbarProvider } from 'notistack';
import 'bootstrap/dist/css/bootstrap.min.css';

import App from './App';
import stores from './store';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <SnackbarProvider maxSnack={3}>
    <Provider store={stores}>
      <Router>
        <App />
      </Router>
    </Provider>
  </SnackbarProvider>
);
