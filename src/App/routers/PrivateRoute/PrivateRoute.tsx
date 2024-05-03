import React from 'react';
import { Navigate } from 'react-router-dom';
import { PrivateRouteProps } from './PrivateRouter.props';

const PrivateRoute: React.FC<PrivateRouteProps> = ({ children }) => {
  const token = localStorage.getItem('token');

  return token ? <>{children}</> : <Navigate to="/auth/login" />;
};

export default PrivateRoute;
