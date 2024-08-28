import React from 'react';

const TeacherMyClasses = () => {
    // Sample data
    const classes = [
        { id: 1, name: 'Math 101', students: 25 },
        { id: 2, name: 'Science 202', students: 30 },
        // Add more classes as needed
    ];

    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold">My Classes</h1>
            <div className="mt-4">
                <table className="min-w-full bg-white shadow rounded">
                    <thead>
                        <tr>
                            <th className="py-2 px-4 border-b">ID</th>
                            <th className="py-2 px-4 border-b">Class Name</th>
                            <th className="py-2 px-4 border-b">Students</th>
                            <th className="py-2 px-4 border-b">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {classes.map(cls => (
                            <tr key={cls.id}>
                                <td className="py-2 px-4 border-b">{cls.id}</td>
                                <td className="py-2 px-4 border-b">{cls.name}</td>
                                <td className="py-2 px-4 border-b">{cls.students}</td>
                                <td className="py-2 px-4 border-b">
                                    <button className="bg-yellow-500 text-white px-2 py-1 rounded">View</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default TeacherMyClasses;
