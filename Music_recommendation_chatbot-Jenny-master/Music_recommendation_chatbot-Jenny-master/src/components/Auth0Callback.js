import { useAuth0 } from '@auth0/auth0-react';
import { useEffect } from 'react';
import { Navigate } from 'react-router-dom';

function Auth0Callback() {
  const { isAuthenticated, loginWithRedirect } = useAuth0();

  useEffect(() => {
    const fn = async () => {
      if (!isAuthenticated) {
        await loginWithRedirect();
      }
    };

    fn();
  }, [isAuthenticated, loginWithRedirect]);

  return isAuthenticated ? <Navigate to="/chatbot" /> : null;
}

export default Auth0Callback;
