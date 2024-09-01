import { useState } from "react";
import axios from "axios";
import { FEE_RECEIVE } from "../utils/adminApis";
import { useAuth } from "../context/authContext/AuthProvider";

const useHandleFeeReceive = () => {
    const { state } = useAuth();
    const [formData, setFormData] = useState({
        student: "",
        amountReceived: "",
        receiptDate: "",
    });
    const [successMessage, setSuccessMessage] = useState("");

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const amountNumber = parseFloat(formData.amountReceived);


        try {
            await axios.post(FEE_RECEIVE, {...formData,
            amountReceived:amountNumber}, {
                headers: {
                    Authorization: `${state?.token}`,
                },
            });
            setSuccessMessage("Fee receipt processed successfully");
            setFormData({ student: "", amountReceived: "", receiptDate: "" });
        } catch (error) {
            setSuccessMessage(`Failed to process fee receipt: ${error.message}`);
        }
    };

    return {
        handleSubmit,
        handleChange,
        formData,
        setFormData,
        successMessage,
    };
};

export default useHandleFeeReceive;
