import { useState, useEffect, useCallback } from "react";
import { GET_CLASS_DETAILS } from "../utils/studentApis";
import axios from "axios";
import { useAuth } from "../context/authContext/AuthProvider";

const useFetchClassDetails = (studentId) => {
    const { state } = useAuth();
    const [classDetails, setClassDetails] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchClassDetails = useCallback(async () => {
        setLoading(true);
        try {
            const response = await axios.get(
                `${GET_CLASS_DETAILS}/${studentId}`,
                {
                    headers: { Authorization: `${state?.token}` },
                }
            );
            console.log(response);
            setClassDetails(response?.data);
            setLoading(false);
        } catch (err) {
            setError(err.message);
            setLoading(false);
        }
    }, [studentId, state?.token]);

    useEffect(() => {
        if (studentId) {
            fetchClassDetails();
        }
    }, [fetchClassDetails, studentId]);

    return { classDetails, loading, error };
};

export default useFetchClassDetails;
