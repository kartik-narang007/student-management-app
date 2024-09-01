import { useState } from "react";
import axios from "axios";
import { useAuth } from "../context/authContext/AuthProvider";
import { SALARY_PAYMENT } from "../utils/adminApis";

const useHandleSalaryPayment = () => {
    const { state } = useAuth();
    const [formData, setFormData] = useState({
        teacher: "",
        amount: "",
        date: "",
        assignedSalary: "",
    });
    const [successMessage, setSuccessMessage] = useState("");
    const [loading, setLoading] = useState(false);  // Added loading state

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const amountNumber = parseFloat(formData.amount);

        if (isNaN(amountNumber)) {
            setSuccessMessage("Invalid amount value");
            return;
        }

        setLoading(true);  // Set loading to true before the submission starts
        try {
            await axios.post(SALARY_PAYMENT, {
                ...formData,
                amount: amountNumber,
            }, {
                headers: {
                    Authorization: `${state?.token}`,
                },
            });
            setSuccessMessage("Salary payment processed successfully");
            setFormData({ teacher: "", amount: "", date: "", assignedSalary: "" });
        } catch (error) {
            setSuccessMessage(`Failed to process salary payment: ${error.message}`);
        } finally {
            setLoading(false);  // Set loading to false after the submission is complete
        }
    };

    return { handleSubmit, handleChange, formData, setFormData, successMessage, loading };  // Return loading state
};

export default useHandleSalaryPayment;
