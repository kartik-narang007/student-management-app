import React from "react";
import { Link, useNavigate } from "react-router-dom";

// Dummy data
const dummyTeachers = [
    {
        name: "Mr. Anderson",
        class: "10A",
        totalSalaryPaid: "$5000",
        gender: "Male",
    },
    {
        name: "Ms. Brown",
        class: "10B",
        totalSalaryPaid: "$4500",
        gender: "Female",
    },
    {
        name: "Dr. Clark",
        class: "10A",
        totalSalaryPaid: "$5500",
        gender: "Male",
    },
    {
        name: "Dr. Clark",
        class: "10A",
        totalSalaryPaid: "$5500",
        gender: "Male",
    },
    // Add more dummy data as needed
];

const TeachersAnalytics = () => {
    const navigate = useNavigate();

    return (
        <div className="flex flex-col p-6 h-screen relative">
            {/* Circular Back Button */}
            <div className="absolute top-0 left-0">
                <button
                    onClick={() => navigate(-1)}
                    className="w-12 h-12 flex items-center justify-center rounded-full bg-white border border-gray-300 shadow-md hover:bg-gray-100"
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
                </button>
            </div>

            <div className="text-center mb-4">
                <h1 className="text-2xl font-bold mb-2">Teachers Analytics</h1>
            </div>

            <div className="flex flex-1 overflow-hidden">
                {/* Table Section */}
                <div className="flex-1 overflow-hidden">
                    <div className="scrollable-table overflow-auto h-[calc(100vh-160px)]">
                        {/* Ensure table height is calculated to fit remaining space */}
                        <table className="min-w-full bg-white border border-gray-300 divide-y divide-gray-200">
                            <thead className="bg-gray-200 sticky top-0">
                                <tr>
                                    <th className="py-2 px-4 border-r">Name</th>
                                    <th className="py-2 px-4 border-r">Class</th>
                                    <th className="py-2 px-4 border-r">Total Salary Paid</th>
                                    <th className="py-2 px-4">Gender</th>
                                </tr>
                            </thead>
                            <tbody>
                                {dummyTeachers.map((teacher, index) => (
                                    <tr
                                        key={index}
                                        className={
                                            index % 2 === 0
                                                ? "bg-gray-50"
                                                : "bg-gray-100"
                                        }
                                    >
                                        <td className="py-2 px-4 border-r">{teacher.name}</td>
                                        <td className="py-2 px-4 border-r">{teacher.class}</td>
                                        <td className="py-2 px-4 border-r">{teacher.totalSalaryPaid}</td>
                                        <td className="py-2 px-4">{teacher.gender}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TeachersAnalytics;
