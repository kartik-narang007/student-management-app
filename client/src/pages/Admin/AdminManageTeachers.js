import React from 'react';

const AdminManageTeachers = () => {
    // Sample data
    const teachers = [
        { id: 1, name: 'Alice Johnson', email: 'alice@example.com' },
        { id: 2, name: 'Bob Brown', email: 'bob@example.com' },
        // Add more teachers as needed
    ];

    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold">Manage Teachers</h1>
            <div className="mt-4">
                <button className="bg-blue-500 text-white px-4 py-2 rounded mb-4">Add Teacher</button>
                <table className="min-w-full bg-white shadow rounded">
                    <thead>
                        <tr>
                            <th className="py-2 px-4 border-b">ID</th>
                            <th className="py-2 px-4 border-b">Name</th>
                            <th className="py-2 px-4 border-b">Email</th>
                            <th className="py-2 px-4 border-b">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {teachers.map(teacher => (
                            <tr key={teacher.id}>
                                <td className="py-2 px-4 border-b">{teacher.id}</td>
                                <td className="py-2 px-4 border-b">{teacher.name}</td>
                                <td className="py-2 px-4 border-b">{teacher.email}</td>
                                <td className="py-2 px-4 border-b">
                                    <button className="bg-yellow-500 text-white px-2 py-1 rounded">Edit</button>
                                    <button className="bg-red-500 text-white px-2 py-1 rounded ml-2">Delete</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default AdminManageTeachers;
