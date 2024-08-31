import React, { useState, useEffect } from "react";
import { FaUserCircle } from "react-icons/fa";
import useTeacherProfile from "../../hooks/useTeacherProfile";
import { useAuth } from "../../context/authContext/AuthProvider";

const TeacherProfile = () => {
    const {
        state: { user, token },
    } = useAuth();
    const teacherId = user._id;

    const { profile, loading, error, updateProfile } = useTeacherProfile(teacherId, token);

    const [isEditing, setIsEditing] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        address: '',
        gender: '',
    });

    useEffect(() => {
        if (profile) {
            setFormData({
                name: profile.fullName,
                address: profile.address,
                gender: profile.gender,
            });
        }
    }, [profile]);

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
            name: profile.fullName,
            address: profile.address,
            gender: profile.gender,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await updateProfile(formData);
            setIsEditing(false);
        } catch (err) {
            console.error("Failed to update profile:", err);
        }
    };

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error}</p>;
    if (!profile) return <p>No profile data available</p>;

    return (
        <div className="relative max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-lg">
            {isEditing && (
                <div className="absolute top-4 right-4 flex gap-4">
                    <button
                        onClick={handleCancelClick}
                        className="px-4 py-2 bg-gray-300 text-gray-800 rounded-md"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={handleSubmit}
                        className="px-4 py-2 bg-blue-500 text-white rounded-md"
                    >
                        Save
                    </button>
                </div>
            )}
            {!isEditing && (
                <button
                    onClick={handleEditClick}
                    className="absolute top-4 right-4 px-4 py-2 bg-green-500 text-white rounded-md"
                >
                    Edit
                </button>
            )}
            <div className="flex items-center gap-4 mb-6">
                <FaUserCircle size={60} className="text-yellow-500" />
                <h2 className="text-3xl font-bold text-gray-800">
                    Teacher Profile
                </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                    <label className="text-gray-600 font-semibold">Name:</label>
                    {isEditing ? (
                        <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleInputChange}
                            className="text-lg text-gray-900 mt-2 p-2 border border-gray-300 rounded"
                        />
                    ) : (
                        <p className="text-lg text-gray-900 mt-2">
                            {profile.fullName}
                        </p>
                    )}
                </div>
                <div>
                    <label className="text-gray-600 font-semibold">
                        Email:
                    </label>
                    <p className="text-lg text-gray-900 mt-2">
                        {profile.email}
                    </p>
                </div>
                <div>
                    <label className="text-gray-600 font-semibold">
                        Mobile Number:
                    </label>
                    <p className="text-lg text-gray-900 mt-2">
                        {profile.mobileNumber}
                    </p>
                </div>
                <div>
                    <label className="text-gray-600 font-semibold">
                        Address:
                    </label>
                    {isEditing ? (
                        <input
                            type="text"
                            name="address"
                            value={formData.address}
                            onChange={handleInputChange}
                            className="text-lg text-gray-900 mt-2 p-2 border border-gray-300 rounded"
                        />
                    ) : (
                        <p className="text-lg text-gray-900 mt-2">
                            {profile.address}
                        </p>
                    )}
                </div>
                <div>
                    <label className="text-gray-600 font-semibold">
                        Date of Birth:
                    </label>
                    <p className="text-lg text-gray-900 mt-2">
                        {profile.dateOfBirth}
                    </p>
                </div>
                <div>
                    <label className="text-gray-600 font-semibold">
                        Gender:
                    </label>
                    {isEditing ? (
                        <select
                            name="gender"
                            value={formData.gender}
                            onChange={handleInputChange}
                            className="text-lg text-gray-900 mt-2 p-2 border border-gray-300 rounded"
                        >
                            <option value="Male">Male</option>
                            <option value="Female">Female</option>
                            <option value="Other">Other</option>
                        </select>
                    ) : (
                        <p className="text-lg text-gray-900 mt-2">
                            {profile.gender}
                        </p>
                    )}
                </div>
                <div>
                    <label className="text-gray-600 font-semibold">
                        Total Salary Paid:
                    </label>
                    <p className="text-lg text-gray-900 mt-2">
                        {profile.totalSalaryPaid}
                    </p>
                </div>
                <div>
                    <label className="text-gray-600 font-semibold">
                        Total Classes:
                    </label>
                    <p className="text-lg text-gray-900 mt-2">
                        {profile.totalClasses}
                    </p>
                </div>
            </div>
        </div>
    );
};

export default TeacherProfile;
