import React from "react";
import StudentSidebar from "../../components/StudentSidebar";
import StudentHeader from "../../components/StudentHeader";

const StudentDashboard = () => {
    return (
        <div className="flex h-screen">
            <StudentSidebar />
            <div className="flex-1 flex flex-col">
                <StudentHeader />
                <main className="flex-1 p-6">
                    <h1 className="text-2xl font-bold">Student Dashboard</h1>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
                        {/* Dashboard Widgets */}
                        <div className="bg-white p-4 shadow rounded">
                            <h2 className="text-xl font-semibold">
                                Upcoming Classes
                            </h2>
                            <p>View your upcoming classes and schedule.</p>
                        </div>
                        <div className="bg-white p-4 shadow rounded">
                            <h2 className="text-xl font-semibold">
                                Assignments
                            </h2>
                            <p>Check your pending and completed assignments.</p>
                        </div>
                        <div className="bg-white p-4 shadow rounded">
                            <h2 className="text-xl font-semibold">Grades</h2>
                            <p>View your grades and academic performance.</p>
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
};

export default StudentDashboard;
