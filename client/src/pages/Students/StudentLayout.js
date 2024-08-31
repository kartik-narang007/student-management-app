import React from "react";
import { Outlet } from "react-router-dom";
import StudentSidebar from "../../components/StudentSidebar";
import StudentHeader from "../../components/StudentHeader";

const StudentLayout = () => {
    return (
        <div className="flex h-screen bg-white p-3">
            <StudentSidebar />
            <div className="flex-1 rounded-tr-xl rounnded-br-xl">
                <main className="flex-1 h-full bg-[#f5f5f5] rounded shadow-md">
                    <StudentHeader />
                    <div className="p-6 bg-transparent overflow-y-scroll max-h-[500px]">
                        <Outlet /> {/* This renders the child routes */}
                    </div>
                </main>
            </div>
        </div>
    );
};

export default StudentLayout;
