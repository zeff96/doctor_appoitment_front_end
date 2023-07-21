/* eslint-disable */
import { Route, Navigate } from 'react-router';
import PropTypes from 'prop-types';
import jwtDecode from 'jwt-decode';

const isLoggedIn = () => {
  const token = document.cookie
    .split(';')
    .map((cookie) => cookie.trim())
    .find((cookie) => cookie.startsWith('jwt='));

  // Check if the token exists and is not expired
  if (token) {
    const jwtToken = token.split('=')[1];
    // Decode the JWT token (assuming you have a utility function for decoding)
    const decodedToken = jwtDecode(jwtToken);

    // Check if the token is not expired
    if (decodedToken && decodedToken.exp * 1000 > Date.now()) {
      return true;
    }
  }

  return false;
};

const ProtectedRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={(props) => (isLoggedIn() ? (
      <Component {...props} />
    ) : (
      <Navigate to="/login" replace />
    ))}
  />
);

ProtectedRoute.propTypes = {
  redirectPath: PropTypes.string.isRequired,
  children: PropTypes.string.isRequired,
};
export default ProtectedRoute;
