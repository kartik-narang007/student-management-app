import { useState, useEffect } from "react";
import axios from "axios";
import { FETCH_STUDENTS } from "../utils/adminApis";
import { useAuth } from "../context/authContext/AuthProvider";

const useFetchStudents = () => {
    const { state, dispatch } = useAuth();

    const [students, setStudents] = useState([]);

    useEffect(() => {
        const fetchStudents = async () => {
            try {
                const response = await axios.get(FETCH_STUDENTS, {
                    headers: {
                        Authorization: `${state?.token}`,
                    },
                });
                setStudents(response.data);
            } catch (error) {
                console.error("Error fetching students:", error);
            }
        };

        fetchStudents();
    }, []);

    return { students };
};

export default useFetchStudents;
