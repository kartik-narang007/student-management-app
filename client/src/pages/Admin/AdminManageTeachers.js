import React from "react";
import { useNavigate } from "react-router-dom";
import useTeacherData from "../../hooks/useTeacherData";
import Table from "../../components/ReusableTable";

const AdminManageTeachers = () => {
    const navigate = useNavigate();
    const {
        teachers,
        handleDelete,
        refetchTeachers,
        handleApprove,
        handleDeactivate,
    } = useTeacherData();

    const handleApproveClick = async (teacherId) => {
        await handleApprove(teacherId);
        await refetchTeachers();
    };

    const handleDeactivateClick = async (teacherId) => {
        await handleDeactivate(teacherId);
        await refetchTeachers();
    };

    const handleDeleteClick = async (teacherId) => {
        await handleDelete(teacherId);
        await refetchTeachers();
    };

    
    const headers = [
        { key: "fullName", title: "Teacher Name", sortable: true },
        { key: "gender", title: "Gender", sortable: true },
        { key: "isApproved", title: "Approval Status", sortable: true },
        { key: "numberOfClasses", title: "Number of Classes", sortable: true }, 
    ];

    const getActionButtons = (row) => {
        const buttons = [
            {
                label: row.isApproved ? "Deactivate" : "Approve",
                className: row.isApproved ? "bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 mr-2" : "bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600 mr-2",
                action: () => row.isApproved ? handleDeactivateClick(row._id) : handleApproveClick(row._id),
            },
            {
                label: "Delete",
                className: "bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700",
                action: () => handleDeleteClick(row._id),
            },
        ];
        return buttons;
    };

    const renderCell = (key, row) => {
        if (key === "isApproved") {
            return row.isApproved ? "Approved" : "Not Approved";
        }
        if (key === "numberOfClasses") {
            return row.classes ? row.classes.length : 0; 
        }
        return row[key];
    };

    return (
        <div className="p-6 relative">
            <div className="flex justify-center items-center mb-8">
                <h1 className="text-2xl font-bold">Manage Teachers</h1>
            </div>

            <Table
                headers={headers}
                rows={teachers}
                onRowClick={(id) => navigate(`/teacher/${id}`)} 
                renderCell={renderCell}
                actionButtons={teachers.map(getActionButtons)}
                rowKey="_id"
                sortable={true}
            />
        </div>
    );
};

export default AdminManageTeachers;
