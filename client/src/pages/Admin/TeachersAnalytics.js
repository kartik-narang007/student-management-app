import React from "react";
import useTeacherAnalytics from "../../hooks/useTeacherAnalytics";
import Table from "../../components/ReusableTable";
import { useNavigate } from "react-router-dom";

const TeachersAnalytics = () => {
    const navigate = useNavigate();
    const { teachers, loading, error } = useTeacherAnalytics();

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }

    // Headers for the Table
    const headers = [
        { title: 'Name', key: 'name', sortable: true },
        { title: 'Number of Classes', key: 'numberOfClasses', sortable: true },
        { title: 'Total Salary Paid', key: 'totalSalaryPaid', sortable: true },
        { title: 'Gender', key: 'gender', sortable: false }
    ];

    // onRowClick function for navigation to teacher profile
    const handleRowClick = (id) => {
        navigate(`/teacher/profile/${id}`);
    };

    return (
        <div className="flex flex-col p-6 h-screen relative">
            {/* Circular Back Button */}
            

            <div className="text-center mb-4">
                <h1 className="text-2xl font-bold mb-2">Teachers Analytics</h1>
            </div>

            {/* Reusable Table Component */}
            <Table 
                headers={headers} 
                rows={teachers} 
                rowKey="id"
                onRowClick={handleRowClick}
                sortable
            />
        </div>
    );
};

export default TeachersAnalytics;
