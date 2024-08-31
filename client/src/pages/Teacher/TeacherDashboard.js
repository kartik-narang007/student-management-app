import React from "react";
import { useAuth } from "../../context/authContext/AuthProvider";
import useSalaryDetails from "../../hooks/useSalaryDetails";
import DashboardWidget from "../../components/ReusableHOCs/DashboardWidget";

const TeacherDashboard = () => {
    const {
        state: { user, token },
    } = useAuth();

    const { totalSalaryPaid, loading, error } = useSalaryDetails(
        user._id,
        token
    );

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error}</p>;

    return (
        <main className="flex-1 rounded-lg bg-[#f5f5f5] p-6">
            <h1 className="text-2xl font-bold text-center">
                Teacher Dashboard
            </h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
                <DashboardWidget
                    to="/teacher/classes"
                    bgColor="bg-yellow-100"
                    title="Assigned Classes"
                    content="View your upcoming classes and schedules."
                />
                <DashboardWidget
                    to="/teacher/salary-details"
                    bgColor="bg-white"
                    title="Salary Received"
                    content={`$${totalSalaryPaid.toFixed(2)}`}
                />
            </div>
        </main>
    );
};

export default TeacherDashboard;
