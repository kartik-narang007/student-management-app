import { useState, useEffect } from "react";
import axios from "axios";
import { TEACHER_ANALYTICS } from "../utils/adminApis";
import { useAuth } from "../context/authContext/AuthProvider";

const useTeacherAnalytics = () => {
    const { state } = useAuth();

    const [teachers, setTeachers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchTeachersAnalytics = async () => {
            try {
                const response = await axios.get(TEACHER_ANALYTICS, {
                    headers: {
                        Authorization: `${state?.token}`,
                    },
                });
                setTeachers(response.data);
            } catch (err) {
                setError("Failed to fetch teacher analytics");
            } finally {
                setLoading(false);
            }
        };

        fetchTeachersAnalytics();
    }, [state?.token]);

    return { teachers, loading, error };
};

export default useTeacherAnalytics;
