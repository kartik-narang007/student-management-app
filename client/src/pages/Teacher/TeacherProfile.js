import React from 'react';

const TeacherProfile = () => {
    // Sample profile data
    const profile = {
        name: 'Alice Johnson',
        email: 'alice@example.com',
        bio: 'Passionate educator with 10 years of experience in teaching Mathematics.',
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

export default TeacherProfile;
