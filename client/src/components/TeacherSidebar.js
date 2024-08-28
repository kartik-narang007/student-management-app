import React from 'react';
import { Link } from 'react-router-dom';

const TeacherSidebar = () => {
    return (
        <div className="w-64 bg-green-800 text-white h-full flex flex-col">
            <div className="flex items-center justify-center py-4 border-b border-green-700">
                <h2 className="text-xl font-bold">Teacher Panel</h2>
            </div>
            <nav className="flex-1 mt-4">
                <ul>
                    <li>
                        <Link to="/teacher-dashboard" className="block px-4 py-2 hover:bg-green-700">Dashboard</Link>
                    </li>
                    <li>
                        <Link to="/teacher/classes" className="block px-4 py-2 hover:bg-green-700">My Classes</Link>
                    </li>
                    <li>
                        <Link to="/teacher/assignments" className="block px-4 py-2 hover:bg-green-700">Assignments</Link>
                    </li>
                    <li>
                        <Link to="/teacher/profile" className="block px-4 py-2 hover:bg-green-700">Profile</Link>
                    </li>
                </ul>
            </nav>
        </div>
    );
};

export default TeacherSidebar;
