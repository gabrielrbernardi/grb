import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';

import PrimeReact from 'primereact/api';

import "primereact/resources/themes/arya-blue/theme.css";  //theme
import "primereact/resources/primereact.min.css";                  //core css
import "primeicons/primeicons.css";                                //icons
import "/node_modules/primeflex/primeflex.css"

PrimeReact.ripple = true;

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);