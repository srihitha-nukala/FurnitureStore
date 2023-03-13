import React from 'react';
import { isAuthenticated } from './index';
import { Navigate } from 'react-router-dom';


function PrivateRoute({ children }) {
    return isAuthenticated() ? children : <Navigate to="/signin" /> 
  }

export default PrivateRoute;