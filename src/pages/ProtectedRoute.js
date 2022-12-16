import React from 'react'
import { useSelector } from 'react-redux';
import { Navigate, Outlet, } from 'react-router-dom'
// Outlet

const ProtectedRoute = ({children ,user}) => {
  const { userInfo } = useSelector((store) => store.content);
  if (!userInfo) return <Navigate to="login"  />;
  return <Outlet/>  
}

export default ProtectedRoute