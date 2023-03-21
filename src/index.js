import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

import { Auth0Provider } from '@auth0/auth0-react';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Auth0Provider
    domain="dev-vqquk1o17l7jbf7b.us.auth0.com"
    clientId="4FyKIMnrvXFyyVKKNnjsga17ooPDy2Qh"
    redirectUri={window.location.origin}
    scope="openid profile email https://www.googleapis.com/auth/userinfo.profile"
    >
    <App />
    </Auth0Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
