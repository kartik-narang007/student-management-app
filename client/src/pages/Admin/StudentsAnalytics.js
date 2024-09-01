// src/pages/StudentsAnalytics.js
import React from "react";
import { useNavigate } from "react-router-dom";
import useGetStudentAnalytics from "../../hooks/useGetStudentAnalytics";
import GenderDistributionChart from "../../components/GenderDistributionChart";
import Table from "../../components/ReusableTable";

const StudentsAnalytics = () => {
    const navigate = useNavigate();
    const { data: students, loading, error } = useGetStudentAnalytics();

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error loading student data</div>;

    const headers = [
        { title: "Student Name", key: "name" },
        { title: "Parent Name", key: "parentName" },
        { title: "DOB", key: "dob" },
        { title: "Class", key: "class" },
        { title: "Gender", key: "gender" },
        { title: "Fees Received", key: "feesReceived" },
    ];

    const handleRowClick = (studentId) => {
        navigate(`/students/${studentId}`);
    };

    const { Male, Female, Other } = students?.genderDistribution;
    return (
        <div className="flex flex-col">
            {/* Circular Back Button */}

            <div className="text-center mb-4">
                <h1 className="text-2xl font-bold mb-2">Students Analytics</h1>
            </div>

            <h2 className="text-xl font-semibold mb-4">Total Students</h2>
            <div className="flex flex-col lg:flex-row flex-1 gap-4 overflow-hidden">
                {/* Table Section */}
                <div className="flex-1 overflow-hidden">
                    <div className="scrollable-table overflow-auto max-h-[400px]">
                        <Table
                            headers={headers}
                            rows={students?.students || []}
                            rowKey="_id"
                            onRowClick={handleRowClick}
                        />
                    </div>
                </div>

                {/* Graph Section */}
                <div className="flex-1 flex flex-col items-center overflow-auto">
                    <div className="flex justify-center mb-4">
                        <div className="flex items-center mr-4">
                            <div className="w-4 h-4 bg-teal-400 mr-2"></div>{" "}
                            Male
                        </div>
                        <div className="flex items-center">
                            <div className="w-4 h-4 bg-purple-400 mr-2"></div>{" "}
                            Female
                        </div>
                    </div>
                    <GenderDistributionChart
                        maleCount={Male}
                        femaleCount={Female}
                        otherCount={Other}
                    />
                </div>
            </div>
        </div>
    );
};

export default StudentsAnalytics;
