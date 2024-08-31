import React from "react";
import useFetchClassDetails from "../../hooks/useFetchClassDetails";
import GenderDistributionChart from "../../components/GenderDistributionChart";
import { useAuth } from "../../context/authContext/AuthProvider";
import { FaChalkboardTeacher, FaUserGraduate } from "react-icons/fa";
import { MdAttachMoney } from "react-icons/md";
import { AiOutlineUser } from "react-icons/ai"; // New icon for teachers

const StudentClassDetails = () => {
    const { state } = useAuth();
    const { classDetails, loading, error } = useFetchClassDetails(
        state?.user?.classes[0]
    );

    if (loading)
        return (
            <div className="text-center text-lg font-semibold">Loading...</div>
        );
    if (error)
        return (
            <div className="text-center text-lg font-semibold text-red-600">
                Error loading class details: {error}
            </div>
        );

    const {
        class: classInfo,
        totalStudents,
        boysCount,
        girlsCount,
        otherCount = 0, // Default to 0 if not provided
        teachers,
    } = classDetails;

    return (
        <div className="flex flex-col w-full bg-gray-100 gap-4">
            <h1 className="text-3xl font-bold text-blue-800 mb-6">
                Class Details
            </h1>
            <div className="flex w-full justify-center items-center gap-6">
                {/* Class Statistics Card */}
                <div className="w-full h-96 bg-white shadow-lg rounded-lg p-6">
                    <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                        Class Statistics
                    </h2>
                    <div className="flex flex-col space-y-4">
                        <div className="flex items-center">
                            <FaUserGraduate className="text-blue-600 mr-2" />
                            <span className="font-medium">
                                Class Name:
                            </span>{" "}
                            {classInfo.name}
                        </div>
                        <div className="flex items-center">
                            <FaChalkboardTeacher className="text-green-600 mr-2" />
                            <span className="font-medium">Student Limit:</span>{" "}
                            {classInfo.studentLimit}
                        </div>
                        <div className="flex items-center">
                            <FaChalkboardTeacher className="text-yellow-600 mr-2" />
                            <span className="font-medium">Year:</span>{" "}
                            {classInfo.year}
                        </div>
                        <div className="flex items-center">
                            <MdAttachMoney className="text-orange-600 mr-2" />
                            <span className="font-medium">Total Fees:</span> $
                            {classInfo.totalFees}
                        </div>
                        <div className="flex items-center">
                            <FaUserGraduate className="text-blue-400 mr-2" />
                            <span className="font-medium">
                                Total Students:
                            </span>{" "}
                            {totalStudents}
                        </div>
                        <div className="flex items-center">
                            <FaUserGraduate className="text-blue-300 mr-2" />
                            <span className="font-medium">Male:</span>{" "}
                            {boysCount}
                        </div>
                        <div className="flex items-center">
                            <FaUserGraduate className="text-pink-300 mr-2" />
                            <span className="font-medium">Female:</span>{" "}
                            {girlsCount}
                        </div>
                        <div className="flex items-center">
                            <FaUserGraduate className="text-gray-500 mr-2" />
                            <span className="font-medium">Other:</span>{" "}
                            {otherCount}
                        </div>
                    </div>
                </div>

                {/* Teachers List Card */}
                <div className="w-full h-96 bg-white shadow-lg rounded-lg p-6">
                    <h2 className="text-2xl font-semibold text-gray-800 mb-4 flex items-center">
                        <AiOutlineUser className="text-blue-500 mr-3" />
                        Teachers
                    </h2>
                    <ul className="list-disc pl-5 space-y-2">
                        {teachers.length > 0 ? (
                            teachers.map((teacher, index) => (
                                <li
                                    key={index}
                                    className="text-gray-700 flex items-center"
                                >
                                    <AiOutlineUser className="text-blue-600 mr-2" />
                                    {teacher}
                                </li>
                            ))
                        ) : (
                            <li className="text-gray-600">No teachers listed</li>
                        )}
                    </ul>
                </div>
            </div>
            {/* Gender Distribution Chart */}
            <div className="bg-white shadow-lg rounded-lg">
                <GenderDistributionChart
                    maleCount={boysCount}
                    femaleCount={girlsCount}
                    otherCount={otherCount}
                />
            </div>
        </div>
    );
};

export default StudentClassDetails;
