import React, { useEffect } from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "../context/authContext/AuthProvider";
import { setUser, logoutUser } from "../context/authContext/authActions";
import {jwtDecode} from "jwt-decode";

const ProtectedRoute = ({ allowedRoles }) => {
    const { state, dispatch } = useAuth();
    const location = useLocation();

    useEffect(() => {
        const user = JSON.parse(localStorage.getItem("user"));
        const token = localStorage.getItem("token");

        if (token) {
            try {
                // Decode the token to get its expiration time
                const decodedToken = jwtDecode(token);
                const currentTime = Date.now() / 1000;

                // Check if the token is expired
                if (decodedToken.exp < currentTime) {
                    // Token is expired, logout the user
                    dispatch(logoutUser());
                    localStorage.removeItem("user");
                    localStorage.removeItem("token");
                    return;
                }
            } catch (error) {
                console.error("Invalid token:", error);
                dispatch(logoutUser());
                localStorage.removeItem("user");
                localStorage.removeItem("token");
                return;
            }

            // Set the user if token is valid
            if (user) {
                dispatch(setUser(user, token));
            }
        }

        // Save the current path in local storage
        if (location.pathname !== "/login") {
            localStorage.setItem("lastPath", location.pathname);
        }
    }, [dispatch, location.pathname]);

    const user = state.user;

    if (!user) {
        // User not authenticated, redirect to login
        return <Navigate to="/login" />;
    }

    if (!user.isApproved) {
        // User is not approved
        return <Navigate to="/login" />;
    }

    if (!allowedRoles.includes(user.role)) {
        // User does not have the right role
        return <Navigate to="/" />;
    }

    return <Outlet />;
};

export default ProtectedRoute;
