import { Route, Navigate } from 'react-router-dom';

// PublicRoute component
const PublicRoute = ({ element, ...rest }) => {
  return (
    <Route
      {...rest}
      element={element}
    />
  );
};

export default PublicRoute;