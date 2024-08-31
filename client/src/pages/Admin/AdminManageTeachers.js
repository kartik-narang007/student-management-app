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
        sortConfig,
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
    ];

    const getActionButtons = (row) => {
        const buttons = [];
        if (!row.isApproved) {
            buttons.push({
                label: "Approve",
                className: "bg-green-500 text-white px-3 py-1 rounded action-button",
                action: () => handleApproveClick(row._id),
            });
        }
        if (row.isApproved) {
            buttons.push({
                label: "Deactivate",
                className: "bg-red-500 text-white px-3 py-1 rounded action-button",
                action: () => handleDeactivateClick(row._id),
            });
        }
        buttons.push({
            label: "Delete",
            className: "bg-red-600 text-white px-3 py-1 rounded action-button",
            action: () => handleDeleteClick(row._id),
        });
        return buttons;
    };

    const renderCell = (key, row) => {
        if (key === "isApproved") {
            return row.isApproved ? "Approved" : "Not Approved";
        }
        return row[key];
    };

    const actionButtons = teachers.map((teacher) => getActionButtons(teacher));

    return (
        <div className="p-6 relative">
            <div className="flex justify-center items-center mb-8">
                <h1 className="text-2xl font-bold">Manage Teachers</h1>
            </div>

            <Table
                headers={headers}
                rows={teachers}
                onRowClick={(id) => navigate(`/teacher/${id}`)} // Example of row click handling
                renderCell={renderCell}
                actionButtons={actionButtons}
                rowKey="_id"
                sortable={true}
            />
        </div>
    );
};

export default AdminManageTeachers;
