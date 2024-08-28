import React from 'react';

const AdminClassList = ({ onDelete }) => {
    // Dummy data for classes
    const classes = [
        { id: 1, name: "Class 1", teacher: "Mr. Adams", year: "2024", studentLimit: 30, studentFees: 500 },
        { id: 2, name: "Class 2", teacher: "Ms. Brown", year: "2024", studentLimit: 25, studentFees: 450 },
        { id: 3, name: "Class 3", teacher: "Mrs. Smith", year: "2024", studentLimit: 20, studentFees: 400 },
        // Add more classes as needed
    ];

    return (
        <div className="p-6">
            <h2 className="text-2xl font-bold mb-4">Class List</h2>

            <div className="overflow-x-auto">
                <table className="min-w-full bg-white border border-gray-300 divide-y divide-gray-200">
                    <thead className="bg-gray-200 sticky top-0">
                        <tr>
                            <th className="py-2 px-4 text-left">Class Name</th>
                            <th className="py-2 px-4 text-left">Teacher</th>
                            <th className="py-2 px-4 text-left">Year</th>
                            <th className="py-2 px-4 text-left">Student Limit</th>
                            <th className="py-2 px-4 text-left">Student Fees</th>
                            <th className="py-2 px-4 text-left">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {classes.map((classItem) => (
                            <tr key={classItem.id} className={classItem.id % 2 === 0 ? "bg-gray-50" : "bg-gray-100"}>
                                <td className="py-2 px-4">{classItem.name}</td>
                                <td className="py-2 px-4">{classItem.teacher}</td>
                                <td className="py-2 px-4">{classItem.year}</td>
                                <td className="py-2 px-4">{classItem.studentLimit}</td>
                                <td className="py-2 px-4">${classItem.studentFees}</td>
                                <td className="py-2 px-4 text-center">
                                    <button
                                        onClick={() => onDelete(classItem.id)}
                                        className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default AdminClassList;
