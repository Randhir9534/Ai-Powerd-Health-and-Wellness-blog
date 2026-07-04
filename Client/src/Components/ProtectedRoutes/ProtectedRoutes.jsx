import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'

const ProtectedRoutes = () => {
    const isAuthToken=window.localStorage.getItem('token')
  return (
    isAuthToken?<Outlet/>:<Navigate to="/login"/>
  )
}

export default ProtectedRoutes 