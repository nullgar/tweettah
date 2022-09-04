import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import './index.css';
import App from './App';
import configureStore from './store';
import { ModalProvider } from './context/Modal';
const store = configureStore();

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      {/* This allows the modal to provides the modal to subscribers */}
      <ModalProvider>
          <App />
      </ModalProvider>
      </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);
