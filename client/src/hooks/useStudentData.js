import { useState, useEffect, useCallback } from "react";
import axios from "axios";
import {
    DELETE_STUDENT,
    GET_STUDENTS_AND_CLASSES,
    UPDATE_STUDENT,
} from "../utils/adminApis";
import { useAuth } from "../context/authContext/AuthProvider";

const useStudentData = () => {
    const { state } = useAuth();
    const [students, setStudents] = useState([]);
    const [classes, setClasses] = useState([]);

    const fetchStudentsAndClasses = useCallback(async () => {
        try {
            const response = await axios.get(GET_STUDENTS_AND_CLASSES, {
                headers: {
                    Authorization: `${state?.token}`,
                },
            });
            setStudents(response?.data?.students);
            setClasses(response?.data?.classes);
        } catch (error) {
            // Handle error silently
        }
    }, [state?.token]);

    useEffect(() => {
        fetchStudentsAndClasses();
    }, [fetchStudentsAndClasses]);

    const handleUpdateStudent = async (id, isApproved) => {
        try {
            await axios.put(
                `${UPDATE_STUDENT}/${id}`,
                { isApproved },
                {
                    headers: {
                        Authorization: `${state?.token}`,
                    },
                }
            );
            fetchStudentsAndClasses();
        } catch (error) {
            // Handle error silently
        }
    };

    const handleApprove = async (id) => {
        await handleUpdateStudent(id, true);
    };

    const handleDeactivate = async (id) => {
        await handleUpdateStudent(id, false);
    };

    const handleDelete = async (id) => {
        try {
            await axios.delete(`${DELETE_STUDENT}/${id}`, {
                headers: {
                    Authorization: `${state?.token}`,
                },
            });
            fetchStudentsAndClasses();
        } catch (error) {
            // Handle error silently
        }
    };

    const refetchStudents = async () => {
        await fetchStudentsAndClasses();
    };

    return {
        students,
        classes,
        handleDelete,
        refetchStudents,
        handleApprove,
        handleDeactivate,
    };
};

export default useStudentData;
