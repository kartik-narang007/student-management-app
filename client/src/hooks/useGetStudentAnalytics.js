import { useState, useEffect } from 'react';
import axios from 'axios';
import { STUDENT_ANALYTICS } from '../utils/adminApis';
import { useAuth } from '../context/authContext/AuthProvider';

const useGetStudentAnalytics = () => {
    const [data, setData] = useState({ students: [], genderDistribution: {} });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const { state } = useAuth();

    useEffect(() => {
        const fetchStudentAnalytics = async () => {
            try {
                const response = await axios.get(STUDENT_ANALYTICS, {
                    headers: {
                        Authorization: `${state.token}`,
                    },
                });
                setData(response.data);
            } catch (err) {
                setError(err.message || 'An error occurred');
            } finally {
                setLoading(false);
            }
        };

        fetchStudentAnalytics();
    }, [state.token]);

    return { data, loading, error };
};

export default useGetStudentAnalytics;
