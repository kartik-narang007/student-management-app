import React from "react";
import { Link } from "react-router-dom";

const AdminDashboard = () => {
    return (
        <main className="flex-1 rounded-lg"> {/* mt-16 for space below the header */}
            <h1 className="text-2xl font-bold">Admin Dashboard</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
                {/* Dashboard Widgets */}
                <Link to="/admin/students-analytics">
                    <div className="bg-white p-4 shadow rounded hover:shadow-lg transition">
                        <h2 className="text-xl font-semibold">Total Students</h2>
                        <p className="text-2xl font-bold">150</p>
                    </div>
                </Link>
                <Link to="/admin/teachers-analytics">
                    <div className="bg-white p-4 shadow rounded hover:shadow-lg transition">
                        <h2 className="text-xl font-semibold">Total Teachers</h2>
                        <p className="text-2xl font-bold">30</p>
                    </div>
                </Link>
                <Link to="/admin/fees-salary-management">
                    <div className="bg-white p-4 shadow rounded hover:shadow-lg transition">
                        <h2 className="text-xl font-semibold">Fees & Salary Management</h2>
                        <p className="text-2xl font-bold">Manage Entries</p>
                    </div>
                </Link>
                <Link to="/admin/expense-analytics">
                    <div className="bg-white p-4 shadow rounded hover:shadow-lg transition">
                        <h2 className="text-xl font-semibold">Expense Analytics</h2>
                        <p className="text-2xl font-bold">View Analytics</p>
                    </div>
                </Link>
            </div>
        </main>
    );
};

export default AdminDashboard;
