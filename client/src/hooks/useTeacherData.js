import { useState, useEffect, useCallback } from "react";
import axios from "axios";
import {
    DELETE_TEACHER,
    FETCH_TEACHERS,
    UPDATE_TEACHER,
} from "../utils/adminApis";
import { useAuth } from "../context/authContext/AuthProvider";

const useTeacherData = () => {
    const { state } = useAuth();
    const [teachers, setTeachers] = useState([]);

    const fetchTeachers = useCallback(async () => {
        try {
            const response = await axios.get(FETCH_TEACHERS, {
                headers: {
                    Authorization: `${state?.token}`,
                },
            });
            setTeachers(response?.data);
        } catch (error) {
            console.error("Error fetching teachers:", error);
        }
    }, [state?.token]);

    useEffect(() => {
        fetchTeachers();
    }, [fetchTeachers]);

    const handleUpdateTeacher = async (id, isApproved) => {
        try {
            await axios.put(
                `${UPDATE_TEACHER}/${id}`,
                { isApproved },
                {
                    headers: {
                        Authorization: `${state?.token}`,
                    },
                }
            );
            fetchTeachers();
        } catch (error) {
            console.error("Error updating teacher:", error);
        }
    };

    const handleApprove = async (id) => {
        const teacher = teachers.find((t) => t._id === id);
        if (teacher) {
            await handleUpdateTeacher(id, true);
        }
    };

    const handleDeactivate = async (id) => {
        const teacher = teachers.find((t) => t._id === id);
        if (teacher) {
            await handleUpdateTeacher(id, false);
        }
    };

    const handleDelete = async (id) => {
        try {
            await axios.delete(`${DELETE_TEACHER}/${id}`, {
                headers: {
                    Authorization: `${state?.token}`,
                },
            });
            fetchTeachers();
        } catch (error) {
            console.error("Error deleting teacher:", error);
        }
    };

    const refetchTeachers = async () => {
        await fetchTeachers();
    };

    return {
        teachers,
        handleDelete,
        refetchTeachers,
        handleApprove,
        handleDeactivate,
    };
};

export default useTeacherData;
