import React from "react";
import useStudentProfile from "../../hooks/useStudentProfile";
import DashboardWidget from "../../components/ReusableHOCs/DashboardWidget";

const StudentDashboard = () => {
    const { student, loading, error } = useStudentProfile();

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error}</p>;

    return (
        <main className="flex-1 rounded-lg">
            <h1 className="text-2xl font-bold text-center">
                Student Dashboard
            </h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
                <DashboardWidget
                    to="/student/class-details"
                    bgColor="bg-blue-100"
                    title="Class Details"
                    content="View Class and Teachers Detail."
                />
                <DashboardWidget
                    to="/student/fees"
                    bgColor="bg-white"
                    title="Total Fees Paid"
                    content={`$${student?.totalFeePaid} - View Details`}
                />
            </div>
        </main>
    );
};

export default StudentDashboard;
