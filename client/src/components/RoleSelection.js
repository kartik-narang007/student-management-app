import React from "react";
import { FaCircleUser } from "react-icons/fa6";
import { PiStudentFill } from "react-icons/pi";
import { PiChalkboardTeacherFill } from "react-icons/pi";
import { FaArrowLeft } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const RoleSelection = ({ setRoleSelection }) => {
    const navigate = useNavigate();

    return (
        <div className="w-full h-full flex justify-center items-center bg-white relative">
            <div
                onClick={() => setRoleSelection(false)}
                className="rounded-full w-10 h-10 absolute top-1 left-10 outline outline-1 outline-black flex items-center justify-center hover:bg-gray-100"
            >
                <FaArrowLeft className="text-black cursor-pointer" />
            </div>
            <div className="flex flex-col justify-center items-center gap-10">
                <div
                    onClick={() => navigate("/admin-register")}
                    className="flex flex-col gap-3 items-center justify-center bg-white hover:bg-blue-50 h-48 w-96 rounded-md cursor-pointer outline outline-1 outline-black"
                >
                    <FaCircleUser className="text-2xl" />
                    <h1 className="font-bold text-3xl">Admin</h1>
                    <p className="text-center text-md px-4">
                        Continue as an administrator to access the admin
                        dashboard to manage app data.
                    </p>
                </div>
                <div
                    onClick={() => navigate("/teacher-register")}
                    className="flex flex-col gap-3 items-center justify-center bg-white hover:bg-blue-50 h-48 w-96 rounded-md cursor-pointer outline outline-1 outline-black"
                >
                    <PiChalkboardTeacherFill className="text-2xl" />
                    <h1 className="font-bold text-3xl">Teacher</h1>
                    <p className="text-center text-md px-4">
                        Continue as Teacher to view your profile, students list
                        and class status.
                    </p>
                </div>
                <div
                    onClick={() => navigate("/student-register")}
                    className="flex flex-col gap-3 items-center justify-center bg-white hover:bg-blue-50 h-48 w-96 rounded-md cursor-pointer outline outline-1 outline-black"
                >
                    <PiStudentFill className="text-2xl" />
                    <h1 className="font-bold text-3xl">Student</h1>
                    <p className="text-center text-md px-4">
                        Continue as Student to view your profile, teachers list
                        and class status.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default RoleSelection;
