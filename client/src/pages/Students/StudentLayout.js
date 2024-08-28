import React from 'react';
import { Outlet } from 'react-router-dom';
import StudentSidebar from '../../components/StudentSidebar';
import StudentHeader from '../../components/StudentHeader';

const StudentLayout = () => {
    return (
        <div className="flex h-screen">
            <StudentSidebar />
            <div className="flex-1 flex flex-col ml-[258px]">
                <StudentHeader />
                <main className="flex-1 p-6 bg-gray-100 rounded-lg shadow-md">
                    <Outlet /> {/* This renders the child routes */}
                </main>
            </div>
        </div>
    );
};

export default StudentLayout;
