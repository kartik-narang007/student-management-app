import React, { useState } from "react";
import useStudentProfile from "../../hooks/useStudentProfile"; // Adjust the path as necessary
import { FaUserCircle } from "react-icons/fa";

const StudentProfile = () => {
    const { student, loading, error, updateStudent } = useStudentProfile();
    const [isEditing, setIsEditing] = useState(false);
    const [formData, setFormData] = useState({
        fullName: student?.fullName || "",
        gender: student?.gender || "",
        parentName: student?.parentName || "",
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

    if (!student) {
        return (
            <div className="flex items-center justify-center h-full text-gray-500">
                No student data found
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
            fullName: student.fullName,
            gender: student.gender,
            parentName: student.parentName,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        updateStudent(formData); // Function to update student details
        setIsEditing(false);
    };

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
                    Student Profile
                </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                    <label className="text-gray-600 font-semibold">Full Name:</label>
                    {isEditing ? (
                        <input
                            type="text"
                            name="fullName"
                            value={formData.fullName}
                            onChange={handleInputChange}
                            className="text-lg text-gray-900 mt-2 p-2 border border-gray-300 rounded"
                        />
                    ) : (
                        <p className="text-lg text-gray-900 mt-2">
                            {student.fullName}
                        </p>
                    )}
                </div>
                <div>
                    <label className="text-gray-600 font-semibold">Email:</label>
                    <p className="text-lg text-gray-900 mt-2">
                        {student.email}
                    </p>
                </div>
                <div>
                    <label className="text-gray-600 font-semibold">Mobile Number:</label>
                    <p className="text-lg text-gray-900 mt-2">
                        {student.mobileNumber}
                    </p>
                </div>
                <div>
                    <label className="text-gray-600 font-semibold">Date of Birth:</label>
                    <p className="text-lg text-gray-900 mt-2">
                        {student.dateOfBirth}
                    </p>
                </div>
                <div>
                    <label className="text-gray-600 font-semibold">Gender:</label>
                    {isEditing ? (
                        <select
                            name="gender"
                            value={formData.gender}
                            onChange={handleInputChange}
                            className="text-lg text-gray-900 mt-2 p-2 border border-gray-300 rounded"
                        >
                            <option value="">Select Gender</option>
                            <option value="Male">Male</option>
                            <option value="Female">Female</option>
                            <option value="Other">Other</option>
                        </select>
                    ) : (
                        <p className="text-lg text-gray-900 mt-2">
                            {student.gender}
                        </p>
                    )}
                </div>
                <div>
                    <label className="text-gray-600 font-semibold">Parent Name:</label>
                    {isEditing ? (
                        <input
                            type="text"
                            name="parentName"
                            value={formData.parentName}
                            onChange={handleInputChange}
                            className="text-lg text-gray-900 mt-2 p-2 border border-gray-300 rounded"
                        />
                    ) : (
                        <p className="text-lg text-gray-900 mt-2">
                            {student.parentName}
                        </p>
                    )}
                </div>
                <div>
                    <label className="text-gray-600 font-semibold">Total Fee Paid:</label>
                    <p className="text-lg text-gray-900 mt-2">
                        {student.totalFeePaid}
                    </p>
                </div>
                <div>
                    <label className="text-gray-600 font-semibold">Classes:</label>
                    <ul className="mt-2 text-lg text-gray-900">
                        {student.classes.length > 0 ? (
                            student.classes.map((classItem) => (
                                <li
                                    key={classItem._id}
                                    className="bg-yellow-100 px-3 py-2 rounded-md mb-2"
                                >
                                    {classItem.name}
                                </li>
                            ))
                        ) : (
                            <li className="text-gray-500">
                                No classes enrolled
                            </li>
                        )}
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default StudentProfile;
