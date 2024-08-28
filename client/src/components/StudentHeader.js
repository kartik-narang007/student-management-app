import React from 'react';

const StudentHeader = () => {
    return (
        <header className="bg-blue-800 text-white p-4 shadow-md">
            <div className="flex items-center justify-between">
                <h1 className="text-xl font-bold">Student Dashboard</h1>
                <button className="bg-red-600 px-4 py-2 rounded-md hover:bg-red-800">Logout</button>
            </div>
        </header>
    );
};

export default StudentHeader;
