import { useState, useEffect } from "react";
import axios from "axios";
import { GET_TEACHER_CLASSES } from "../utils/teacherApis";

const useTeacherClasses = (teacherId, token) => {
    const [classes, setClasses] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchClasses = async () => {
            try {
                const response = await axios.get(
                    `${GET_TEACHER_CLASSES}/${teacherId}`,
                    {
                        headers: {
                            Authorization: token,
                        },
                    }
                );
                setClasses(response.data.classes);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchClasses();
    }, [teacherId, token]);

    return { classes, loading, error };
};

export default useTeacherClasses;
