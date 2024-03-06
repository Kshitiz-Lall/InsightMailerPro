import { Route, Navigate } from 'react-router-dom';
import { useEffect, useState } from 'react';

const ProtectedRoute = ({ element, ...rest }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    // Check if user is authenticated by verifying JWT token
    const token = localStorage.getItem('token'); // Assuming token is stored in localStorage
    if (token) {
      // Implement logic to validate token, e.g., decoding and verifying signature
      // Here, we're assuming a simple check for the presence of a token
      setIsAuthenticated(true);
    } else {
      setIsAuthenticated(false);
    }
  }, []);

  return (
    <Route
      {...rest}
      element={isAuthenticated ? element : <Navigate to="/login" />}
    />
  );
};

export default ProtectedRoute;
