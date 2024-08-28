import React from "react";
import LoginForm from "../components/LoginForm";
import LoginBanner from "../assets/LoginBanner.svg"

const Login = () => {
    return (
        <div className="flex justify-center items-center w-screen h-screen">
            <div className="w-full h-full bg-white flex items-center justify-center rounded-md ">
                <img src={LoginBanner}/>
            </div>
            <div className="h-full w-8/12 bg-gray-200 flex items-center justify-center rounded-md ">
                <LoginForm />
            </div>
            
        </div>
    );
};

export default Login;
