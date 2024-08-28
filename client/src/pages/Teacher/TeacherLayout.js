import React from 'react';
import { Outlet } from 'react-router-dom';
import TeacherSidebar from '../../components/TeacherSidebar';
import TeacherHeader from '../../components/TeacherHeader';

const TeacherLayout = () => {
    return (
        <div className="flex h-screen">
            <TeacherSidebar />
            <div className="flex-1 flex flex-col ml-[258px]">
                <TeacherHeader />
                <main className="flex-1 p-6 bg-gray-100 rounded-lg shadow-md">
                    <Outlet /> {/* This renders the child routes */}
                </main>
            </div>
        </div>
    );
};

export default TeacherLayout;
