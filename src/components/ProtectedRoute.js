import React from 'react';
import { Outlet, Navigate } from 'react-router-dom';
import Cookies from 'js-cookie';

const ProtectedRoute = () => {
  const token = Cookies.get('jwt_token');
  return token ? <Outlet /> : <Navigate to="/" replace />;
};

export default ProtectedRoute;
