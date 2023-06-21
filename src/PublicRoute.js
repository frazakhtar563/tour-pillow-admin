import React from 'react'
import { useSelector } from "react-redux"
import { Navigate, useLocation } from "react-router-dom"

const PublicRoute = ({ children }) => {
    const user = useSelector((state) => state.counter);

    if (user.isAuthenticated) {
        return <Navigate to="/" />
    }
    return children

};

export default PublicRoute;