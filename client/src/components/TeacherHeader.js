import React from 'react';

const TeacherHeader = () => {
    return (
        <header className="bg-gray-800 text-white px-4 py-3 shadow-md rounded-md">
            <div className="flex items-center justify-between">
                <h1 className="text-xl font-bold">Teacher Dashboard</h1>
                <button className="bg-red-600 px-4 py-2 rounded-md hover:bg-red-800">Logout</button>
            </div>
        </header>
    );
};

export default TeacherHeader;
