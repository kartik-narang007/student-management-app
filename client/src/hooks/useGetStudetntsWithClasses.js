import { useState, useEffect } from 'react';
import axios from 'axios';
import { GET_STUDENTS_AND_CLASSES } from '../utils/adminApis';
import { useAuth } from '../context/authContext/AuthProvider';

const useGetStudentsWithClasses = () => {
    const { state } = useAuth();

    const [students, setStudents] = useState([]);
    const [classes, setClasses] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(GET_STUDENTS_AND_CLASSES, {
                    headers: {
                        Authorization: `${state?.token}`
                    }
                });
                setStudents(response.data.students);
                setClasses(response.data.classes);
            } catch (err) {
                setError(err);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [state?.token]);

    return { students, classes, loading, error };
};

export default useGetStudentsWithClasses;
