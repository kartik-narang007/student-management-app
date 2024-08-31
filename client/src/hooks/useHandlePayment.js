import { useState } from "react";
import axios from "axios";

const useHandlePayment = (formType) => {
    const [formData, setFormData] = useState({
        teacherName: "",
        amount: "",
        date: "",
        studentName: "",
        amountReceived: "",
        receiptDate: ""
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e, type) => {
        e.preventDefault();
        try {
            if (type === "salary") {
                await axios.post('/api/salaryPayments', {
                    teacherName: formData.teacherName,
                    amount: formData.amount,
                    date: formData.date
                });
            } else if (type === "fee") {
                await axios.post('/api/feeReceives', {
                    studentName: formData.studentName,
                    amountReceived: formData.amountReceived,
                    receiptDate: formData.receiptDate
                });
            }
            setFormData({
                teacherName: "",
                amount: "",
                date: "",
                studentName: "",
                amountReceived: "",
                receiptDate: ""
            });
        } catch (error) {
            console.error(`Failed to process ${type}: ${error.message}`);
        }
    };

    return { handleSubmit, handleChange, formData };
};

export default useHandlePayment;
