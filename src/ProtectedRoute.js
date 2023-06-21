import React from 'react'
import { useSelector } from "react-redux"
import { Navigate, useLocation } from "react-router-dom"
import { Layout } from "./Components/Layout";
const ProtectedRoute = ({ children }) => {
    const user = useSelector((state) => state.counter);
    console.log('user', user)
    // let location = useLocation();

    if (!user.isAuthenticated) {
        return <Navigate to="/login" />
    }
    return <Layout>{children}</Layout>

};

export default ProtectedRoute;