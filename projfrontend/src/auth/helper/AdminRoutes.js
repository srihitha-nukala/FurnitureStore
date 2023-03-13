import React from 'react';
import { isAuthenticated } from './index';
import { Navigate } from 'react-router-dom';


function AdminRoute({ children }) {
    return isAuthenticated() && isAuthenticated().user.role ===1 ? children : <Navigate to="/signin" />
  }

export default AdminRoute;