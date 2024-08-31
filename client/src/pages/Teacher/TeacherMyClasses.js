import React from "react";
import useTeacherClasses from "../../hooks/useTeacherClasses";
import { useAuth } from "../../context/authContext/AuthProvider";
import Table from "../../components/ReusableTable";

const TeacherMyClasses = () => {
    const {
        state: { user, token },
    } = useAuth();

    const teacherId = user?._id;
    const { classes, loading, error } = useTeacherClasses(teacherId, token);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error}</p>;

    const classHeaders = [
        { key: 'name', title: 'Class Name', sortable: true },
        { key: 'totalStudents', title: 'Total Students', sortable: true },
        { key: 'maleStudents', title: 'Male Students', sortable: true },
        { key: 'femaleStudents', title: 'Female Students', sortable: true },
        { key: 'otherStudents', title: 'Other Students', sortable: true }
    ];

    const studentHeaders = [
        { key: 'name', title: 'Name', sortable: true },
        { key: 'gender', title: 'Gender', sortable: true },
        { key: 'parentName', title: 'Parent Name', sortable: true }
    ];

    const getActionButtons = (row) => [
        {
            label: 'View',
            className: 'text-blue-500 underline',
            action: () => {
                const element = document.getElementById(`students-table-${row.classId}`);
                if (element) element.classList.toggle("hidden");
            }
        }
    ];

    const renderClassCell = (key, row) => {
        if (key === 'otherStudents') return row[key] || 0;
        return row[key];
    };

    const renderStudentCell = (key, row) => row[key];

    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold mb-6">My Classes</h1>

            <Table
                headers={classHeaders}
                rows={classes}
                rowKey="classId"
                actionButtons={classes.map(getActionButtons)}
                renderCell={renderClassCell}
                sortable={true}
            />

            {classes.map((cls) => (
                <div
                    key={cls.classId}
                    id={`students-table-${cls.classId}`}
                    className="mt-4 hidden"
                >
                    <h2 className="text-xl font-semibold mb-2">
                        Students in {cls.name}
                    </h2>
                    <Table
                        headers={studentHeaders}
                        rows={cls.studentsList}
                        rowKey="id"
                        sortable={true}
                        renderCell={renderStudentCell}
                    />
                </div>
            ))}
        </div>
    );
};

export default TeacherMyClasses;
