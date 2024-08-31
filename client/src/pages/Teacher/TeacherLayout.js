// src/pages/teacher/TeacherLayout.js

import React from 'react';
import { Outlet } from 'react-router-dom';
import TeacherSidebar from '../../components/TeacherSidebar';
import TeacherHeader from '../../components/TeacherHeader';

const TeacherLayout = () => {
    return (
        <div className="flex h-screen bg-white p-3">
            <TeacherSidebar />
            <div className="flex-1 rounded-tr-xl rounded-br-xl">
                <main className="flex-1 h-full bg-[#f5f5f5] rounded shadow-md">
                    <TeacherHeader />
                    <div className="p-6 bg-transparent overflow-y-scroll max-h-[500px]">
                        <Outlet /> {/* This renders the child routes */}
                    </div>
                </main>
            </div>
        </div>
    );
};

export default TeacherLayout;
