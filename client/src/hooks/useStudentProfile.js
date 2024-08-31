import { useState, useEffect } from "react";
import axios from "axios";
import { useAuth } from "../context/authContext/AuthProvider"; // Adjust the path as necessary
import { GET_STUDENT_PROFILE, UPDATE_STUDENT_PROFILE } from "../utils/studentApis";

const useStudentProfile = () => {
    const { state } = useAuth();
    const { user, token } = state;

    const [student, setStudent] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchStudentProfile = async () => {
            try {
                if (user && user._id) {
                    const response = await axios.get(
                        `${GET_STUDENT_PROFILE}/${user._id}`,
                        {
                            headers: {
                                Authorization: `${token}`,
                            },
                        }
                    );
                    setStudent(response.data);
                } else {
                    setError("No user ID found");
                }
            } catch (err) {
                setError("Failed to fetch student data");
            } finally {
                setLoading(false);
            }
        };

        fetchStudentProfile();
    }, [user, token]);

    const updateStudent = async (updatedData) => {
        try {
            if (user && user._id) {
                const response = await axios.put(
                    `${UPDATE_STUDENT_PROFILE}/${user._id}`,
                    updatedData,
                    {
                        headers: {
                            Authorization: `${token}`,
                        },
                    }
                );
                setStudent(response.data);
            } else {
                setError("No user ID found");
            }
        } catch (err) {
            setError("Failed to update student data");
        }
    };

    return { student, loading, error, updateStudent };
};

export default useStudentProfile;
