import { useState } from "react";
import axios from "axios";
import { DELETE_CLASS } from "../utils/adminApis";
import { useAuth } from "../context/authContext/AuthProvider";

const useDeleteClass = () => {
    const { state } = useAuth();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const deleteClass = async (classId) => {
        setLoading(true);
        setError(null);
        try {
            await axios.delete(`${DELETE_CLASS}/${classId}`, {
                headers: {
                    Authorization: `${state?.token}`,
                },
            });
        } catch (err) {
            setError(err.message || "An error occurred while deleting the class.");
        } finally {
            setLoading(false);
        }
    };

    return { deleteClass, loading, error };
};

export default useDeleteClass;
