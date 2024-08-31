import studentImage from "../assets/students.svg";
import { useNavigate } from "react-router-dom";
import RoleSelection from "../components/RoleSelection";
import { useState } from "react";

const MainComponent = () => {
    const navigate = useNavigate();
    const [roleSelection, setRoleSelection] = useState(false);

    return (
        <div className="flex w-screen h-screen justify-center items-center">
            {!roleSelection ? (
                <div className="w-full h-full flex flex-col justify-center items-center gap-24">
                    <div className="flex justify-center items-center flex-col">
                        <h1 className="text-5xl font-bold opacity-75 px-22 leading-snug w-9/12">
                            Welcome to
                            <br /> School Management
                            <br /> App
                        </h1>
                        <p className="text-lg mt-5 w-9/12 pr-24">
                            A Comprehensive School Management System: Empowering
                            Schools with Seamless Administration, Dynamic Role
                            Management, and In-Depth Analytics
                        </p>
                    </div>
                    <div className="flex flex-col items-center justify-center gap-6">
                        <button
                            onClick={() => navigate("/login")}
                            className="bg-purple-600 text-white rounded-md font-semibold py-2 px-4 hover:bg-purple-800 hover:shadow-md hover:shadow-purple-800 transition-all"
                        >
                            LOGIN
                        </button>
                        <button
                            onClick={() => setRoleSelection(true)}
                            className="bg-white text-purple-600 outline outline-1 outline-purple-600 rounded-md py-2 px-4 hover:bg-blue-50 transition-all"
                        >
                            CREATE ACCOUNT
                        </button>
                    </div>
                </div>
            ) : (
                <RoleSelection setRoleSelection={setRoleSelection} />
            )}
            <div className="w-full h-full flex justify-center">
                <img src={studentImage} alt="Student Image" />
            </div>
        </div>
    );
};

export default MainComponent;
