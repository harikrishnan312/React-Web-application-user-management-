import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { store } from './redux/store'
import { Provider } from 'react-redux'
import Context from './Context/AuthContext';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Context>
  <Provider store={store}>
    <App />
  </Provider>
  </Context>
);


