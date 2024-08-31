import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { FORGOT_PASSWORD } from "../utils/authApis";

const ForgotPassword = () => {
    const [email, setEmail] = useState("");
    const [message, setMessage] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post(FORGOT_PASSWORD, { email });
            setMessage("Password reset email sent");
        } catch (error) {
            setMessage("Error sending reset email");
        }
    };

    return (
        <div className="w-full max-w-md bg-white shadow-lg rounded-lg p-4 mx-auto">
            <h2 className="text-xl font-bold mb-3 text-center text-purple-600">
                Forgot Password
            </h2>
            <form onSubmit={handleSubmit} className="space-y-3">
                <div className="mb-4">
                    <label
                        htmlFor="email"
                        className="block text-sm font-medium text-gray-700"
                    >
                        Email Address
                    </label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        placeholder="Your email"
                        className="mt-1 block w-full px-3 py-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-purple-500 focus:border-purple-500 sm:text-sm"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>
                <button
                    type="submit"
                    className="w-full bg-purple-600 text-white py-3 cursor-pointer rounded-lg shadow-md hover:bg-purple-700 transition duration-200 text-sm"
                >
                    Send Reset Link
                </button>
                {message && (
                    <p className="text-center text-sm mt-2 text-purple-600">
                        {message}
                    </p>
                )}
            </form>
        </div>
    );
};

export default ForgotPassword;
