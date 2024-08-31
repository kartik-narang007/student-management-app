import React from "react";
import { Outlet } from "react-router-dom";
import AdminSidebar from "../../components/AdminSidebar";
import AdminHeader from "../../components/AdminHeader";

const AdminLayout = () => {
    return (
        <div className="flex h-screen bg-gray-100">
            <AdminSidebar />
            <div className="flex-1 flex flex-col">
                <AdminHeader />
                <main className="flex-1 bg-[#f5f5f5] rounded-r-xl shadow-md p-6 overflow-y-auto">
                    <Outlet /> {/* This renders the child routes */}
                </main>
            </div>
        </div>
    );
};

export default AdminLayout;
