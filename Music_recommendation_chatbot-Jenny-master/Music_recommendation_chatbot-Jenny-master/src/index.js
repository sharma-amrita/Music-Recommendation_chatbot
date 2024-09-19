import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import { Auth0Provider } from '@auth0/auth0-react';

createRoot(document.getElementById('root')).render(
  <Auth0Provider
    domain="dev-j14vgcgytuhbotzp.us.auth0.com"
    clientId="bpMgMxlD9HCoyJPf21VNDdyyNs0g0eif"
    redirectUri="http://localhost:3000/callback"
  >
    <App />
  </Auth0Provider>
);
