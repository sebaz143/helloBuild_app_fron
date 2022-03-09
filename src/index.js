import React from 'react';
import ReactDOM from 'react-dom';

//styles
import './index.css';
import './styles/customTheme.scss'

//main
import App from './App';

//cookies
import {CookiesProvider} from 'react-cookie';

//auth
import {Provider} from 'react-redux';
import store from './auth/store';

ReactDOM.render(
  
  <React.StrictMode>
    <CookiesProvider>
      <Provider store={store}>
        <App />
      </Provider>
    </CookiesProvider>  
    
  </React.StrictMode>,
  document.getElementById("root")
);
