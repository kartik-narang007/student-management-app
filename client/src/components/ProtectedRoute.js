import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/authContext/AuthProvider";

const ProtectedRoute = ({ allowedRoles }) => {
    const { state } = useAuth();

    if (!state.user) {
        // User not authenticated
        return <Navigate to="/login" />;
    }

    if (!allowedRoles.includes(state.user.role)) {
        // User does not have the right role
        return <Navigate to="/" />;
    }

    return <Outlet />;
};

export default ProtectedRoute;
