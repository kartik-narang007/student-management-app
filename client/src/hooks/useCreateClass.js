import { useState } from "react";
import axios from "axios";
import { CREATE_CLASS } from "../utils/adminApis";
import { useAuth } from "../context/authContext/AuthProvider";

const useCreateClass = () => {
    const { state, dispatch } = useAuth();
    const [statusMessage, setStatusMessage] = useState("");
    const [isError, setIsError] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);

    const createClass = async (classData) => {
        try {
            const response = await axios.post(CREATE_CLASS, classData, {
                headers: {
                    Authorization: `${state?.token}`,
                },
            });
            setStatusMessage("Class created successfully!");
            setIsError(false);
            setIsSuccess(true);
            return response;
        } catch (error) {
            if (error.response && error.response.status === 400) {
                setStatusMessage(error.response.data.message);
            } else {
                setStatusMessage("Failed to create class.");
            }
            setIsError(true);
            setIsSuccess(false);
            throw error;
        }
    };

    return { createClass, statusMessage, isError, isSuccess };
};

export default useCreateClass;
