import React, { useEffect } from "react";
import { useAuth } from "../context/authContext/AuthProvider";
import { logoutUser } from "../context/authContext/authActions";

const AdminHeader = () => {
    const { dispatch } = useAuth();


    const handleLogOut = () => {
        dispatch(logoutUser());
        localStorage.removeItem("token");
    };

    return (
        <header className="bg-gray-800 text-white px-4 py-3 shadow-md rounded-md top-0 z-10">
            <div className="flex items-center justify-between">
                <h1 className="text-xl font-bold">Admin Dashboard</h1>
                <button
                    onClick={() => {
                        handleLogOut();
                    }}
                    className="bg-red-600 px-4 py-2 rounded-md hover:bg-red-800"
                >
                    Logout
                </button>
            </div>
        </header>
    );
};

export default AdminHeader;
