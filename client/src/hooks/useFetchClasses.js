import { useState, useEffect, useCallback } from "react";
import axios from "axios";
import { FETCH_CLASSES } from "../utils/adminApis";
import { useAuth } from "../context/authContext/AuthProvider";

const useFetchClasses = () => {
    const { state } = useAuth();
    const [classes, setClasses] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchClasses = useCallback(async () => {
        setLoading(true);
        try {
            const response = await axios.get(FETCH_CLASSES, {
                headers: { Authorization: `${state?.token}` },
            });
            setClasses(response.data);
            setLoading(false);
        } catch (err) {
            setError(err.message);
            setLoading(false);
        }
    }, [state?.token]);

    useEffect(() => {
        fetchClasses();
    }, [fetchClasses]);

    return { classes, loading, error, fetchClasses };
};

export default useFetchClasses;
