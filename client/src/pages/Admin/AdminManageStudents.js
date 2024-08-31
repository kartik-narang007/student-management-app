import React from "react";
import { useNavigate } from "react-router-dom";
import useStudentData from "../../hooks/useStudentData";
import Table from "../../components/ReusableTable"; // Assuming you have a reusable Table component

const AdminManageStudents = () => {
    const navigate = useNavigate();
    const {
        students,
        handleDelete,
        refetchStudents,
        handleApprove,
        handleDeactivate,
    } = useStudentData();

    const handleApproveClick = async (studentId) => {
        await handleApprove(studentId);
        await refetchStudents();
    };

    const handleDeactivateClick = async (studentId) => {
        await handleDeactivate(studentId);
        await refetchStudents();
    };

    const handleDeleteClick = async (studentId) => {
        await handleDelete(studentId);
        await refetchStudents();
    };

    const headers = [
        { key: "name", title: "Student Name", sortable: true },
        { key: "class", title: "Class", sortable: true },
        { key: "gender", title: "Gender", sortable: true },
        { key: "isApproved", title: "Approval Status", sortable: true },
    ];
    const getActionButtons = (row) => {
        const buttons = [];
        if (!row.isApproved) {
            buttons.push({
                label: "Approve",
                className:
                    "bg-green-500 text-white px-3 py-1 rounded action-button",
                action: () => handleApproveClick(row._id),
            });
        }
        if (row.isApproved) {
            buttons.push({
                label: "Deactivate",
                className:
                    "bg-red-500 text-white px-3 py-1 rounded action-button",
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
        // Customize cell rendering based on key
        if (key === "isApproved") {
            return row.isApproved ? "Approved" : "Not Approved";
        }
        return row[key];
    };

    return (
        <div className="p-6 relative">
            <div className="flex justify-center items-center mb-8">
                <h1 className="text-2xl font-bold">Manage Students</h1>
            </div>
            {
                console.log(students.map(getActionButtons))
            }
            <Table
                headers={headers}
                rows={students}
                onRowClick={(id) => navigate(`/student/${id}`)} // Example of row click handling
                renderCell={renderCell}
                actionButtons={students.map(getActionButtons)}
                rowKey="_id"
                sortable={true}
            />
        </div>
    );
};

export default AdminManageStudents;