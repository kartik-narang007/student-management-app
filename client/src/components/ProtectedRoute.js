import React, { useEffect } from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "../context/authContext/AuthProvider";
import { setUser, logoutUser } from "../context/authContext/authActions";
import { jwtDecode } from "jwt-decode";

const ProtectedRoute = ({ allowedRoles }) => {
    const { state, dispatch } = useAuth();
    const location = useLocation();

    useEffect(() => {
        const user = JSON.parse(localStorage.getItem("user"));
        const token = localStorage.getItem("token");

        if (token) {
            try {
                const decodedToken = jwtDecode(token);
                const currentTime = Date.now() / 1000;

                if (decodedToken.exp < currentTime) {
                    dispatch(logoutUser());
                    localStorage.removeItem("user");
                    localStorage.removeItem("token");
                    return;
                }
            } catch (error) {
                dispatch(logoutUser());
                localStorage.removeItem("user");
                localStorage.removeItem("token");
                return;
            }

            if (user) {
                dispatch(setUser(user, token));
            }
        }

        if (location.pathname !== "/login") {
            localStorage.setItem("lastPath", location.pathname);
        }
    }, [dispatch, location.pathname]);

    const user = state.user;

    if (!user) {
        return <Navigate to="/login" />;
    }

    if (!user.isApproved) {
        return <Navigate to="/login" />;
    }

    if (!allowedRoles.includes(user.role)) {
        return <Navigate to="/" />;
    }

    return <Outlet />;
};

export default ProtectedRoute;
