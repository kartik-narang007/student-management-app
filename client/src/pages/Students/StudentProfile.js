import React, { useState } from 'react';

const StudentProfile = () => {
    // Sample profile data
    const [profile, setProfile] = useState({
        name: 'John Doe',
        email: 'john@example.com',
        bio: 'A diligent student pursuing excellence in academics and extracurricular activities.',
    });

    const [isEditing, setIsEditing] = useState(false);
    const [formData, setFormData] = useState({ ...profile });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSave = () => {
        setProfile({ ...formData });
        setIsEditing(false);
    };

    return (
        <div className="p-6 max-w-3xl mx-auto">
            <h1 className="text-2xl font-bold mb-4">Profile</h1>
            <div className="bg-white p-6 shadow rounded-lg">
                <div className="mb-4">
                    {isEditing ? (
                        <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            className="block w-full mb-2 p-2 border border-gray-300 rounded"
                            placeholder="Name"
                        />
                    ) : (
                        <h2 className="text-xl font-semibold">{profile.name}</h2>
                    )}
                    {isEditing ? (
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            className="block w-full mb-2 p-2 border border-gray-300 rounded"
                            placeholder="Email"
                        />
                    ) : (
                        <p className="text-gray-600">{profile.email}</p>
                    )}
                </div>
                {isEditing ? (
                    <textarea
                        name="bio"
                        value={formData.bio}
                        onChange={handleChange}
                        rows="4"
                        className="block w-full mb-4 p-2 border border-gray-300 rounded"
                        placeholder="Bio"
                    />
                ) : (
                    <p className="text-gray-600">{profile.bio}</p>
                )}
                <div className="flex justify-end">
                    {isEditing ? (
                        <button
                            onClick={handleSave}
                            className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
                        >
                            Save
                        </button>
                    ) : (
                        <button
                            onClick={() => setIsEditing(true)}
                            className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700"
                        >
                            Edit Profile
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
};

export default StudentProfile;
