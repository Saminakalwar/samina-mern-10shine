import React from 'react'
import useAuth from '../hooks/useAuth';
import { Navigate } from 'react-router-dom';

const ProtectedRoutes = ({children}) => {
    const {user} = useAuth();


    //if no user => redirect to login
    if(!user){
        return <Navigate to= "/login"/>
    }
  return children;
}

export default ProtectedRoutes;
