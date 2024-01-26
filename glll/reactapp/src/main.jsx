import React from 'react';
import ReactDOM from 'react-dom';
import App from './App.jsx';
import './index.css';

// Trouvez l'élément DOM où vous souhaitez rendre l'application
const root = document.getElementById('root');

// Utilisez ReactDOM.render pour les versions antérieures à React 18
ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  root
);