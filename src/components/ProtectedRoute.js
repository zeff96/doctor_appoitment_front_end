import { Outlet, Navigate } from 'react-router-dom';
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
export default ProtectedRoute;