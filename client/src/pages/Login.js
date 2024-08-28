import React, { useEffect } from "react";
import LoginForm from "../components/LoginForm";
import LoginBanner from "../assets/LoginBanner.svg";
import { useAuth } from "../context/authContext/AuthProvider";
import { useNavigate } from "react-router-dom";

const Login = () => {
    const { state, dispatch } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        if (state.user) {
            navigate(`/${state.user.role}`);
        }
    }, [state.user]);

    return (
        <div className="flex justify-center items-center w-screen h-screen">
            <div className="w-full h-full bg-white flex items-center justify-center rounded-md ">
                <img src={LoginBanner} />
            </div>
            <div className="h-full w-8/12 bg-gray-200 flex items-center justify-center rounded-md ">
                <LoginForm />
            </div>
        </div>
    );
};

export default Login;
