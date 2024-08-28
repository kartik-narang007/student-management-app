import React from 'react';

const StudentProfile = () => {
    // Sample profile data
    const profile = {
        name: 'John Doe',
        email: 'john@example.com',
        bio: 'A diligent student pursuing excellence in academics and extracurricular activities.',
    };

    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold">Profile</h1>
            <div className="mt-4">
                <div className="bg-white p-4 shadow rounded">
                    <h2 className="text-xl font-semibold">Personal Information</h2>
                    <p><strong>Name:</strong> {profile.name}</p>
                    <p><strong>Email:</strong> {profile.email}</p>
                    <p><strong>Bio:</strong> {profile.bio}</p>
                </div>
            </div>
        </div>
    );
};

export default StudentProfile;
