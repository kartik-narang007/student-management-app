import React from "react";
import { useNavigate } from "react-router-dom";
import StudentLayout from "../Students/StudentLayout";

const StudentDashboard = () => {
    const navigate = useNavigate();

    const totalFeesPaid = "$1200"; // Replace with dynamic value if needed

    const handleFeeDetailsClick = () => {
        navigate("/student/fees"); // Redirect to the fee details page
    };

    return (
        <>
            <h1 className="text-center text-2xl font-bold">
                Student Dashboard
            </h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
                {/* Dashboard Widgets */}
                <div className="bg-white p-4 shadow rounded hover:shadow-lg transition">
                    <h2 className="text-xl font-semibold">Class Details</h2>
                    <p>View Class and Teachers Detail.</p>
                </div>
                <div className="bg-white p-4 shadow rounded hover:shadow-lg transition">
                    <h2 className="text-xl font-semibold">Grades</h2>
                    <p>View your grades and academic performance.</p>
                </div>
                <div
                    className="bg-white p-4 shadow rounded hover:shadow-lg transition cursor-pointer"
                    onClick={handleFeeDetailsClick} // Add onClick handler
                >
                    <h2 className="text-xl font-semibold">Total Fees Paid</h2>
                    <p className="text-lg font-medium text-gray-600">
                        Amount: {totalFeesPaid}
                    </p>{" "}
                    {/* Display the amount */}
                </div>
            </div>
        </>
    );
};

export default StudentDashboard;
