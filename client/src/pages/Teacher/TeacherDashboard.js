import React from "react";
import TeacherSidebar from "../../components/TeacherSidebar";
import TeacherHeader from "../../components/TeacherHeader";

const TeacherDashboard = () => {
    return (
        <div className="flex h-screen">
            <TeacherSidebar />
            <div className="flex-1 flex flex-col">
                <TeacherHeader />
                <main className="flex-1 p-6">
                    <h1 className="text-2xl font-bold">Teacher Dashboard</h1>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
                        {/* Dashboard Widgets */}
                        <div className="bg-white p-4 shadow rounded">
                            <h2 className="text-xl font-semibold">
                                Upcoming Classes
                            </h2>
                            <p>View your upcoming classes and schedules.</p>
                        </div>
                        <div className="bg-white p-4 shadow rounded">
                            <h2 className="text-xl font-semibold">
                                Assignments
                            </h2>
                            <p>Check pending and completed assignments.</p>
                        </div>
                        <div className="bg-white p-4 shadow rounded">
                            <h2 className="text-xl font-semibold">
                                Class Performance
                            </h2>
                            <p>
                                View performance metrics and analytics for your
                                classes.
                            </p>
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
};

export default TeacherDashboard;
