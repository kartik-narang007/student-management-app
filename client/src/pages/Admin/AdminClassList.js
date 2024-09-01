import React from "react";
import useFetchClasses from "../../hooks/useFetchClasses";
import useDeleteClass from "../../hooks/useDeleteClass";
import Table from "../../components/ReusableTable"; // Adjust the path to where Table is located

const AdminClassList = () => {
    const { classes, loading, error, fetchClasses } = useFetchClasses();
    const {
        deleteClass,
        loading: deleteLoading,
        error: deleteError,
    } = useDeleteClass();

    const handleDelete = async (classId) => {
        await deleteClass(classId);
        fetchClasses(); // Re-fetch the class list after deletion
    };

    const headers = [
        { key: "name", title: "Class Name", sortable: true },
        { key: "year", title: "Year", sortable: true },
        { key: "studentLimit", title: "Student Limit", sortable: true },
        { key: "students", title: "Enrolled Students", sortable: true },
        { key: "teachers", title: "Assigned Teachers", sortable: true },
        { key: "fees", title: "Fees", sortable: true },
    ];

    const getActionButtons = (row) => {
        return [
            {
                label: "Delete",
                className:
                    "bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600",
                action: () => handleDelete(row._id),
            },
        ];
    };


    if (loading || deleteLoading) return <p>Loading...</p>;
    if (error || deleteError) return <p>Error: {error || deleteError}</p>;

    return (
        <div className="p-6">
            <h2 className="text-2xl font-bold mb-4">Class List</h2>

            <Table
                headers={headers}
                rows={classes}
                rowKey="_id"
                actionButtons={(row) => getActionButtons(row)} // Ensure actionButtons function is passed correctly
                renderCell={(key, row) => {
                    if (key === "students" || key === "teachers") {
                        return row[key]?.length || 0;
                    }
                    if (key === "fees") {
                        return `$${row[key]}`;
                    }
                    return row[key];
                }}
                sortable={true}
            />
        </div>
    );
};

export default AdminClassList;
