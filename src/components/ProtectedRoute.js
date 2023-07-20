import { Outlet, Navigate } from 'react-router-dom';
import PropTypes from 'prop-types';

function ProtectedRoute({ token, redirectPath = '/login', children }) {
  return (
    <>
      {token ? (
        children || <Outlet />
      ) : (
        <Navigate to={redirectPath} replace />
      )}
    </>
  );
}
ProtectedRoute.propTypes = {
  token: PropTypes.string.isRequired,
  redirectPath: PropTypes.string.isRequired,
  children: PropTypes.string.isRequired,
};
export default ProtectedRoute;
