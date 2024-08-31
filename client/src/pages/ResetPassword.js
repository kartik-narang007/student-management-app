import React, { useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { RESET_PASSWORD } from "../utils/authApis";

const ResetPassword = () => {
    const { token } = useParams();
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post(`${RESET_PASSWORD}/${token}`, { password });
            setMessage("Password updated successfully");
        } catch (error) {
            setMessage("Error updating password");
        }
    };

    return (
        <div className="w-full max-w-md bg-white shadow-lg rounded-lg p-4 mx-auto">
            <h2 className="text-xl font-bold mb-3 text-center text-purple-600">
                Reset Password
            </h2>
            <form onSubmit={handleSubmit} className="space-y-3">
                <div className="mb-4">
                    <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                        New Password
                    </label>
                    <input
                        type="password"
                        id="password"
                        name="password"
                        placeholder="Your new password"
                        className="mt-1 block w-full px-3 py-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-purple-500 focus:border-purple-500 sm:text-sm"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
                <button
                    type="submit"
                    className="w-full bg-purple-600 text-white py-3 cursor-pointer rounded-lg shadow-md hover:bg-purple-700 transition duration-200 text-sm"
                >
                    Reset Password
                </button>
                {message && <p className="text-center text-sm mt-2 text-purple-600">{message}</p>}
            </form>
        </div>
    );
};

export default ResetPassword;
