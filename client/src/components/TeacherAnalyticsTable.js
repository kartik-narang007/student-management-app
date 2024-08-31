import React from "react";
import { useNavigate } from "react-router-dom";
import Table from "../../components/ReusableTable";

const TeachersAnalyticsTable = ({ teachers }) => {
    const navigate = useNavigate();

    const handleTeacherClick = (id) => {
        navigate(`/teacher/profile/${id}`);
    };

    const headers = [
        { title: "Name", key: "name" },
        { title: "Number of Classes", key: "numberOfClasses" },
        { title: "Total Salary Paid", key: "totalSalaryPaid" },
        { title: "Gender", key: "gender" },
    ];

    return (
        <div className="flex-1 overflow-hidden">
            <div className="scrollable-table overflow-auto h-[calc(100vh-160px)]">
                <Table
                    headers={headers}
                    rows={teachers}
                    rowKey="id"
                    onRowClick={handleTeacherClick}
                />
            </div>
        </div>
    );
};

export default TeachersAnalyticsTable;
