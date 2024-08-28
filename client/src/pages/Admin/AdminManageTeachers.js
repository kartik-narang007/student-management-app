import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const dummyClasses = ["10A", "10B", "10C"]; // List of available classes

const dummyteachers = [
    { name: "John Doe", class: "10A", gender: "Male", status: "Pending" },
    { name: "Jane Smith", class: "10B", gender: "Female", status: "Approved" },
    {
        name: "Emily Johnson",
        class: "10A",
        gender: "Female",
        status: "Pending",
    },
    { name: "Michael Brown", class: "10B", gender: "Male", status: "Approved" },
    // Add more dummy data as needed
];

const AdminManageTeachers = () => {
    const navigate = useNavigate();

    const [teachers, setTeachers] = useState(dummyteachers);
    const [sortConfig, setSortConfig] = useState({
        key: null,
        direction: "asc",
    });

    const handleSort = (key) => {
        let direction = "asc";
        if (sortConfig.key === key && sortConfig.direction === "asc") {
            direction = "desc";
        }

        const sortedteachers = [...teachers].sort((a, b) => {
            if (a[key] < b[key]) {
                return direction === "asc" ? -1 : 1;
            }
            if (a[key] > b[key]) {
                return direction === "asc" ? 1 : -1;
            }
            return 0;
        });

        setSortConfig({ key, direction });
        setTeachers(sortedteachers);
    };

    const handleApprove = (index) => {
        const updatedteachers = teachers.map((teacher, i) =>
            i === index
                ? { ...teacher, status: "Approved", showClass: true }
                : teacher
        );
        setTeachers(updatedteachers);
    };

    const handleDelete = (index) => {
        const updatedteachers = teachers.filter((_, i) => i !== index);
        setTeachers(updatedteachers);
    };

    const handleClassChange = (index, newClass) => {
        const updatedteachers = teachers.map((teacher, i) =>
            i === index ? { ...teacher, class: newClass } : teacher
        );
        setTeachers(updatedteachers);
    };

    return (
        <div className="p-6 relative">
            <Link
                onClick={() => navigate(-1)}
                className="absolute top-4 left-4 w-12 h-12 flex items-center justify-center rounded-full bg-white border border-gray-300 shadow-md hover:bg-gray-100"
            >
                <svg
                    className="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M15 19l-7-7 7-7"
                    />
                </svg>
            </Link>
            <div className="flex justify-center items-center mb-8">
                <h1 className="text-2xl font-bold">Manage teachers</h1>
            </div>

            <div className="overflow-x-auto">
                <table className="min-w-full bg-white border border-gray-300 divide-y divide-gray-200">
                    <thead className="bg-gray-200">
                        <tr>
                            <th
                                onClick={() => handleSort("name")}
                                className="py-2 px-4 cursor-pointer text-left"
                            >
                                teacher Name{" "}
                                {sortConfig.key === "name" &&
                                    (sortConfig.direction === "asc"
                                        ? "↑"
                                        : "↓")}
                            </th>
                            <th
                                className="py-2 px-4 cursor-pointer text-left"
                            >
                                Class
                            </th>
                            <th
                                onClick={() => handleSort("gender")}
                                className="py-2 px-4 cursor-pointer text-left"
                            >
                                Gender{" "}
                                {sortConfig.key === "gender" &&
                                    (sortConfig.direction === "asc"
                                        ? "↑"
                                        : "↓")}
                            </th>
                            <th
                                onClick={() => handleSort("status")}
                                className="py-2 px-4 cursor-pointer text-left"
                            >
                                Approval Status{" "}
                                {sortConfig.key === "status" &&
                                    (sortConfig.direction === "asc"
                                        ? "↑"
                                        : "↓")}
                            </th>
                            <th className="py-2 px-4 text-center">Actions</th>
                            <th className="py-2 px-4 text-center">Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                        {teachers.map((teacher, index) => (
                            <tr
                                key={index}
                                className={
                                    index % 2 === 0 ? "bg-gray-50" : "bg-white"
                                }
                            >
                                <td className="py-2 px-4">{teacher.name}</td>
                                <td className="py-2 px-4">
                                    {teacher.status === "Approved" ? (
                                        teacher.class
                                    ) : (
                                        <select
                                            value={teacher.class}
                                            onChange={(e) =>
                                                handleClassChange(index, e.target.value)
                                            }
                                            className="border border-gray-300 rounded px-2 py-1"
                                        >
                                            <option value="">Select Class</option>
                                            {dummyClasses.map((cls) => (
                                                <option key={cls} value={cls}>
                                                    {cls}
                                                </option>
                                            ))}
                                        </select>
                                    )}
                                </td>
                                <td className="py-2 px-4">{teacher.gender}</td>
                                <td className="py-2 px-4">{teacher.status}</td>
                                <td className="py-2 px-4 text-center">
                                    {teacher.status === "Pending" ? (
                                        <button
                                            onClick={() => handleApprove(index)}
                                            disabled={!teacher.class}
                                            className={`px-4 py-1 ${
                                                teacher.class
                                                    ? "bg-green-500 text-white hover:bg-green-600"
                                                    : "bg-gray-400 text-white cursor-not-allowed"
                                            } rounded`}
                                        >
                                            {teacher.class ? "Approve" : "Class Required"}
                                        </button>
                                    ) : (
                                        <span className="text-green-600 font-semibold">
                                            Approved
                                        </span>
                                    )}
                                </td>
                                <td className="py-2 px-4 text-center">
                                    <button
                                        onClick={() => handleDelete(index)}
                                        className="text-red-600 hover:bg-red-100 px-2 py-1 rounded"
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default AdminManageTeachers;
