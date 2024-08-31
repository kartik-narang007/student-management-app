import { useState, useEffect } from "react";
import axios from "axios";
import { FETCH_TEACHERS } from "../utils/adminApis";
import { useAuth } from "../context/authContext/AuthProvider";

const useFetchTeachers = () => {
    const { state, dispatch } = useAuth();

    const [teachers, setTeachers] = useState([]);

    useEffect(() => {
        const fetchTeachers = async () => {
            try {
                const response = await axios.get(FETCH_TEACHERS, {
                    headers: {
                        Authorization: `${state?.token}`,
                    },
                });
                setTeachers(response.data);
            } catch (error) {
                console.error("Error fetching teachers:", error);
            }
        };

        fetchTeachers();
    }, []);

    return { teachers };
};

export default useFetchTeachers;
