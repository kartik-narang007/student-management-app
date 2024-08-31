import React from "react";
import { useNavigate } from "react-router-dom";

const TeachersAnalyticsTable = ({ teachers }) => {
    const navigate = useNavigate();

    const handleTeacherClick = (id) => {
        navigate(`/teacher/profile/${id}`);
    };

    return (
        <div className="flex-1 overflow-hidden">
            <div className="scrollable-table overflow-auto h-[calc(100vh-160px)]">
                <table className="min-w-full bg-white border border-gray-300 divide-y divide-gray-200">
                    <thead className="bg-gray-200 sticky top-0">
                        <tr>
                            <th className="py-2 px-4 border-r">Name</th>
                            <th className="py-2 px-4 border-r">
                                Number of Classes
                            </th>
                            <th className="py-2 px-4 border-r">
                                Total Salary Paid
                            </th>
                            <th className="py-2 px-4">Gender</th>
                        </tr>
                    </thead>
                    <tbody>
                        {teachers.map((teacher, index) => (
                            <tr
                                key={teacher.id} 
                                className={
                                    index % 2 === 0
                                        ? "bg-gray-50"
                                        : "bg-gray-100"
                                }
                            >
                                <td
                                    className="py-2 px-4 border-r text-blue-500 hover:underline cursor-pointer"
                                    onClick={() =>
                                        handleTeacherClick(teacher.id)
                                    }
                                >
                                    {teacher.name}
                                </td>
                                <td className="py-2 px-4 border-r">
                                    {teacher.numberOfClasses}
                                </td>
                                <td className="py-2 px-4 border-r">
                                    {teacher.totalSalaryPaid}
                                </td>
                                <td className="py-2 px-4">{teacher.gender}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default TeachersAnalyticsTable;
