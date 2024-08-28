import React from 'react';
import { Link } from 'react-router-dom';

const AdminSidebar = () => {
    return (
        <div className="fixed w-64 bg-gray-800 text-white h-full flex flex-col rounded-md">
            <div className="flex items-center justify-center py-4 border-b border-gray-700">
                <h2 className="text-xl font-bold">Admin Panel</h2>
            </div>
            <nav className="flex-1 mt-4">
                <ul>
                    <li>
                        <Link to="/admin" className="block px-4 py-2 hover:bg-gray-700">Dashboard</Link>
                    </li>
                    <li>
                        <Link to="/admin/students" className="block px-4 py-2 hover:bg-gray-700">Manage Students</Link>
                    </li>
                    <li>
                        <Link to="/admin/teachers" className="block px-4 py-2 hover:bg-gray-700">Manage Teachers</Link>
                    </li>
                    <li>
                        <Link to="/admin/classes" className="block px-4 py-2 hover:bg-gray-700">Manage Classes</Link>
                    </li>
                    <li>
                        <Link to="/admin/class-list" className="block px-4 py-2 hover:bg-gray-700">Class List</Link>
                    </li>
                </ul>
            </nav>
        </div>
    );
};

export default AdminSidebar;
