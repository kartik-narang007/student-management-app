import React from 'react';

const AdminReports = () => {
    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold">Reports</h1>
            <p>Generate and view various reports related to students, teachers, and classes.</p>
            <div className="mt-4">
                {/* Add report generation or view components here */}
                <button className="bg-blue-500 text-white px-4 py-2 rounded mb-4">Generate Report</button>
                {/* Example of a report preview or list */}
                <div className="bg-white p-4 shadow rounded">
                    <h2 className="text-xl font-semibold">Report Title</h2>
                    <p>Report details and preview go here.</p>
                </div>
            </div>
        </div>
    );
};

export default AdminReports;
