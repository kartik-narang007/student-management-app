import React from "react";
import useAdminOverview from "../../hooks/useAdminOverview";
import DashboardWidget from "../../components/ReusableHOCs/DashboardWidget";

const AdminDashboard = () => {
    const { overviewData, loading, error } = useAdminOverview();

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error}</p>;

    return (
        <main className="flex-1 rounded-lg">
            <h1 className="text-2xl font-bold">Admin Dashboard</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
                <DashboardWidget
                    to="/admin/students-analytics"
                    bgColor="bg-purple-300"
                    title="Total Students"
                    content={overviewData.totalStudents}
                />
                <DashboardWidget
                    to="/admin/teachers-analytics"
                    bgColor="bg-white"
                    title="Total Teachers"
                    content={overviewData.totalTeachers}
                />
                <DashboardWidget
                    to="/admin/fee-receive"
                    bgColor="bg-purple-300"
                    title="Fee Receive"
                    content="Manage Fees"
                />
                <DashboardWidget
                    to="/admin/salary-payment"
                    bgColor="bg-white"
                    title="Salary Payment"
                    content="Manage Salaries"
                />
                <DashboardWidget
                    to="/admin/expense-analytics"
                    bgColor="bg-purple-300"
                    title="Expense Analytics"
                    content="View Analytics"
                />
            </div>
        </main>
    );
};

export default AdminDashboard;
