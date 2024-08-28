import React from "react";
import TeacherLayout from "../Teacher/TeacherLayout";

const TeacherDashboard = () => {
    return (
        <>
            <h1 className="text-center text-2xl font-bold">
                Teacher Dashboard
            </h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
                {/* Dashboard Widgets */}
                <div className="bg-white p-4 shadow rounded hover:shadow-lg transition">
                    <h2 className="text-xl font-semibold">Upcoming Classes</h2>
                    <p>View your upcoming classes and schedules.</p>
                </div>
                <div className="bg-white p-4 shadow rounded hover:shadow-lg transition">
                    <h2 className="text-xl font-semibold">Assignments</h2>
                    <p>Check pending and completed assignments.</p>
                </div>
                <div className="bg-white p-4 shadow rounded hover:shadow-lg transition">
                    <h2 className="text-xl font-semibold">Class Performance</h2>
                    <p>
                        View performance metrics and analytics for your classes.
                    </p>
                </div>
            </div>
        </>
    );
};

export default TeacherDashboard;
