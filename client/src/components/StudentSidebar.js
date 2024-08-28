import React from 'react';
import { Link } from 'react-router-dom';

const StudentSidebar = () => {
    return (
        <div className="w-64 bg-blue-800 text-white h-full flex flex-col">
            <div className="flex items-center justify-center py-4 border-b border-blue-700">
                <h2 className="text-xl font-bold">Student Panel</h2>
            </div>
            <nav className="flex-1 mt-4">
                <ul>
                    <li>
                        <Link to="/student-dashboard" className="block px-4 py-2 hover:bg-blue-700">Dashboard</Link>
                    </li>
                    <li>
                        <Link to="/student/grades" className="block px-4 py-2 hover:bg-blue-700">My Grades</Link>
                    </li>
                    <li>
                        <Link to="/student/assignments" className="block px-4 py-2 hover:bg-blue-700">Assignments</Link>
                    </li>
                    <li>
                        <Link to="/student/profile" className="block px-4 py-2 hover:bg-blue-700">Profile</Link>
                    </li>
                </ul>
            </nav>
        </div>
    );
};

export default StudentSidebar;
