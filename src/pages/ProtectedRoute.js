import React from 'react'
import { useSelector } from 'react-redux';
import { Navigate, Outlet, } from 'react-router-dom'
// Outlet

const ProtectedRoute = ({children ,user}) => {
  const { userAuth } = useSelector((store) => store.content);
  if (!userAuth) return <Navigate to="login"  />;
  return <Outlet/>  
}

export default ProtectedRoute