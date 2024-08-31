import React from 'react';
import { Outlet } from 'react-router-dom';
import AdminSidebar from '../../components/AdminSidebar';
import AdminHeader from '../../components/AdminHeader';

const AdminLayout = () => {
    return (
        <div className="flex h-screen">
            <AdminSidebar />
            <div className="flex-1 flex flex-col">
                <AdminHeader />
                <main className="flex-1 p-6 bg-gray-100 rounded-lg shadow-md">
                    <Outlet /> {/* This renders the child routes */}
                </main>
            </div>
        </div>
    );
};

export default AdminLayout;
