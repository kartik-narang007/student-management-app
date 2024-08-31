import React, { useState } from "react";
import useAdminProfile from "../../hooks/useAdminProfile"; // Adjust the path as necessary
import { FaUserShield } from "react-icons/fa";

const AdminProfile = () => {
    const { admin, loading, error, updateAdmin } = useAdminProfile();
    const [isEditing, setIsEditing] = useState(false);
    const [formData, setFormData] = useState({
        fullName: admin?.fullName || "",
        address: admin?.address || "",
        mobileNumber: admin?.mobileNumber || "",
    });

    if (loading) {
        return (
            <div className="flex items-center justify-center h-full text-gray-500">
                Loading...
            </div>
        );
    }

    if (error) {
        return (
            <div className="flex items-center justify-center h-full text-red-500">
                {error}
            </div>
        );
    }

    if (!admin) {
        return (
            <div className="flex items-center justify-center h-full text-gray-500">
                No admin data found
            </div>
        );
    }

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleEditClick = () => {
        setIsEditing(true);
    };

    const handleCancelClick = () => {
        setIsEditing(false);
        setFormData({
            fullName: admin.fullName,
            address: admin.address,
            mobileNumber: admin.mobileNumber,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        updateAdmin(formData); // Function to update admin details
        setIsEditing(false);
    };

    return (
        <div className="relative max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-lg">
            {isEditing ? (
                <div className="absolute top-4 right-4 flex gap-4">
                    <button
                        onClick={handleCancelClick}
                        className="px-4 py-2 bg-gray-300 text-gray-800 rounded-md hover:bg-gray-400"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={handleSubmit}
                        className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
                    >
                        Save
                    </button>
                </div>
            ) : (
                <button
                    onClick={handleEditClick}
                    className="absolute top-4 right-4 px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600"
                >
                    Edit
                </button>
            )}
            <div className="flex items-center gap-4 mb-6">
                <FaUserShield size={60} className="text-yellow-500" />
                <h2 className="text-3xl font-bold text-gray-800">
                    Admin Profile
                </h2>
            </div>

            <form>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div>
                        <label className="text-gray-600 font-semibold">Full Name:</label>
                        {isEditing ? (
                            <input
                                type="text"
                                name="fullName"
                                value={formData.fullName}
                                onChange={handleInputChange}
                                className="text-lg text-gray-900 mt-2 p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        ) : (
                            <p className="text-lg text-gray-900 mt-2">
                                {admin.fullName}
                            </p>
                        )}
                    </div>
                    <div>
                        <label className="text-gray-600 font-semibold">Email:</label>
                        <p className="text-lg text-gray-900 mt-2">
                            {admin.email}
                        </p>
                    </div>
                    <div>
                        <label className="text-gray-600 font-semibold">Mobile Number:</label>
                        {isEditing ? (
                            <input
                                type="text"
                                name="mobileNumber"
                                value={formData.mobileNumber}
                                onChange={handleInputChange}
                                className="text-lg text-gray-900 mt-2 p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        ) : (
                            <p className="text-lg text-gray-900 mt-2">
                                {admin.mobileNumber}
                            </p>
                        )}
                    </div>
                    <div>
                        <label className="text-gray-600 font-semibold">Address:</label>
                        {isEditing ? (
                            <input
                                type="text"
                                name="address"
                                value={formData.address}
                                onChange={handleInputChange}
                                className="text-lg text-gray-900 mt-2 p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        ) : (
                            <p className="text-lg text-gray-900 mt-2">
                                {admin.address}
                            </p>
                        )}
                    </div>
                    <div>
                        <label className="text-gray-600 font-semibold">Role:</label>
                        <p className="text-lg text-gray-900 mt-2">
                            {admin.role}
                        </p>
                    </div>
                </div>
            </form>
        </div>
    );
};

export default AdminProfile;
