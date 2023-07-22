/* eslint-disable */
import React from 'react';
import { Outlet, Navigate } from 'react-router';
import PropTypes from 'prop-types';


const ProtectedRoute = ({ token, redirectPath = '/login', children }) => {
  if (!token) {
    return <Navigate to={redirectPath} replace />;
  } else {
    return children || <Outlet />;
  }
};

ProtectedRoute.propTypes = {
  token: PropTypes.string,
  redirectPath: PropTypes.string,
  children: PropTypes.node.isRequired,
};
export default ProtectedRoute;
