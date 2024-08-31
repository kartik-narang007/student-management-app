import { useState, useEffect } from "react";
import axios from "axios";
import { GET_TEACHER_PROFILE, UPDATE_TEACHER_PROFILE } from "../utils/teacherApis";


const useTeacherProfile = (teacherId, token) => {
    const [profile, setProfile] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const response = await axios.get(
                    `${GET_TEACHER_PROFILE}/${teacherId}`,
                    {
                        headers: {
                            Authorization: token,
                        },
                    }
                );
                setProfile(response.data.teacher);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchProfile();
    }, [teacherId, token]);

    const updateProfile = async (updatedData) => {
        try {
            const response = await axios.put(
                `${UPDATE_TEACHER_PROFILE}/${teacherId}`,
                updatedData,
                {
                    headers: {
                        Authorization: token,
                    },
                }
            );
            setProfile(response.data.teacher);
        } catch (err) {
            setError(err.message);
        }
    };

    return { profile, loading, error, updateProfile };
};

export default useTeacherProfile;
