import React from 'react';

const AdminHeader = () => {
    return (
        <header className="bg-gray-800 text-white p-4 shadow-md">
            <div className="flex items-center justify-between">
                <h1 className="text-xl font-bold">Admin Dashboard</h1>
                <button className="bg-red-600 px-4 py-2 rounded-md hover:bg-red-800">Logout</button>
            </div>
        </header>
    );
};

export default AdminHeader;
