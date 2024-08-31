// src/hooks/useTeacherClasses.js

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
                console.log(response.data.classes);
                setClasses(response.data.classes);
                console.log(classes);
                setLoading(false);
            } catch (err) {
                setError(err.message);
                setLoading(false);
            }
        };

        fetchClasses();
    }, [teacherId]);

    return { classes, loading, error };
};

export default useTeacherClasses;
