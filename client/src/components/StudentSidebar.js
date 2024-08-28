import React from 'react';
import { Link } from 'react-router-dom';

const StudentSidebar = () => {
    return (
        <div className="fixed w-64 bg-gray-800 text-white h-full flex flex-col rounded-md">
            <div className="flex items-center justify-center py-4 border-b border-gray-700">
                <h2 className="text-xl font-bold">Student Panel</h2>
            </div>
            <nav className="flex-1 mt-4">
                <ul>
                    <li>
                        <Link to="/student" className="block px-4 py-2 hover:bg-gray-700">Dashboard</Link>
                    </li>
                    <li>
                        <Link to="/student/profile" className="block px-4 py-2 hover:bg-gray-700">Profile</Link>
                    </li>
                </ul>
            </nav>
        </div>
    );
};

export default StudentSidebar;
