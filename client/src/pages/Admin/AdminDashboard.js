import React from "react";
import AdminSidebar from "../../components/AdminSidebar";
import AdminHeader from "../../components/AdminHeader";
import { useAuth } from "../../context/authContext/AuthProvider";

const AdminDashboard = () => {
    const [state, dispatch] = useAuth();
    console.log(state);

    return (
        <div className="flex h-screen">
            <AdminSidebar />
            <div className="flex-1 flex flex-col">
                <AdminHeader />
                <main className="flex-1 p-6">
                    <h1 className="text-2xl font-bold">Admin Dashboard</h1>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
                        {/* Dashboard Widgets */}
                        <div className="bg-white p-4 shadow rounded">
                            <h2 className="text-xl font-semibold">
                                Total Students
                            </h2>
                            <p className="text-2xl font-bold">150</p>
                        </div>
                        <div className="bg-white p-4 shadow rounded">
                            <h2 className="text-xl font-semibold">
                                Total Teachers
                            </h2>
                            <p className="text-2xl font-bold">30</p>
                        </div>
                        <div className="bg-white p-4 shadow rounded">
                            <h2 className="text-xl font-semibold">
                                Total Classes
                            </h2>
                            <p className="text-2xl font-bold">12</p>
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
};

export default AdminDashboard;
