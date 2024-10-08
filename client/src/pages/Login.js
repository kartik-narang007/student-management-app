import React, { useEffect, useState } from "react";
import LoginForm from "../components/LoginForm";
import LoginBanner from "../assets/LoginBanner.svg";
import { useAuth } from "../context/authContext/AuthProvider";
import { useNavigate } from "react-router-dom";

const Login = () => {
    const { state } = useAuth();
    const navigate = useNavigate();
    const [errorMessage, setErrorMessage] = useState("");

    useEffect(() => {
        if (state?.user) {
            if (state.user.isApproved) {
                const lastPath = localStorage.getItem("lastPath") || `/${state.user.role}`;
                navigate(lastPath);
            } else {
                setErrorMessage("Your account is not approved yet.");
            }
        }
    }, [state.user, navigate]);

    return (
        <div className="flex justify-center items-center w-screen h-screen">
            <div className="w-full h-full bg-white flex items-center justify-center rounded-md">
                <img src={LoginBanner} alt="Login Banner" />
            </div>
            <div className="h-full w-full bg-gray-200 flex items-center justify-center rounded-md">
                <LoginForm errorMessage={errorMessage} setErrorMessage={setErrorMessage} />
            </div>
        </div>
    );
};

export default Login;
