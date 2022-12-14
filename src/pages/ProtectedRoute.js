import React from 'react'
import { Navigate, Outlet, } from 'react-router-dom'
// Outlet

const ProtectedRoute = ({children ,user}) => {
  if (!user) return <Navigate to="login"  />;
  return <Outlet/>  
}

export default ProtectedRoute