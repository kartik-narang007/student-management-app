import React, { useState, useEffect } from "react";
import useFetchTeachers from "../../hooks/useFetchTeachers";
import useHandleSalaryPayment from "../../hooks/useHandleSalaryPayment";

const SalaryPaymentPage = () => {
    const { teachers } = useFetchTeachers();
    const { handleSubmit, handleChange, formData, setFormData, successMessage } =
        useHandleSalaryPayment();
    const [selectedTeacher, setSelectedTeacher] = useState("");
    const [message, setMessage] = useState("");

    useEffect(() => {
        if (selectedTeacher) {
            const teacher = teachers.find((t) => t._id === selectedTeacher);
            if (teacher) {
                setFormData((prevData) => ({
                    ...prevData,
                    amount: teacher.assignedSalary || 0, // Set amount to assignedSalary
                }));
            }
        }
    }, [selectedTeacher, teachers, setFormData]);

    useEffect(() => {
        if (successMessage) {
            setMessage(successMessage);
            setTimeout(() => setMessage(""), 2000);
        }
    }, [successMessage]);

    const handleTeacherChange = (e) => {
        const selectedId = e.target.value;
        setSelectedTeacher(selectedId);
        setFormData((prevData) => ({
            ...prevData,
            teacher: selectedId,
        }));
    };

    return (
        <main className="flex-1 p-6 relative">
            <h1 className="text-center text-2xl font-bold mb-6">
                Salary Payment
            </h1>
            {message && (
                <div className="mb-4 p-2 text-green-700 bg-green-100 border border-green-300 rounded">
                    {message}
                </div>
            )}
            <form onSubmit={handleSubmit}>
                <div className="mb-4">
                    <label htmlFor="teacher" className="block text-gray-700">
                        Teacher
                    </label>
                    <select
                        id="teacher"
                        name="teacher"
                        value={formData.teacher}
                        onChange={handleTeacherChange}
                        className="mt-1 block w-full p-2 border border-gray-300 rounded"
                        required
                    >
                        <option value="">Select Teacher</option>
                        {teachers.map((teacher) => (
                            <option key={teacher._id} value={teacher._id}>
                                {teacher.fullName}
                            </option>
                        ))}
                    </select>
                </div>
                <div className="mb-4">
                    <label htmlFor="amount" className="block text-gray-700">
                        Amount
                    </label>
                    <input
                        type="number"
                        id="amount"
                        name="amount"
                        value={formData.amount || ""}
                        onChange={handleChange}
                        className="mt-1 block w-full p-2 border border-gray-300 rounded"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="date" className="block text-gray-700">
                        Date
                    </label>
                    <input
                        type="date"
                        id="date"
                        name="date"
                        value={formData.date}
                        onChange={handleChange}
                        className="mt-1 block w-full p-2 border border-gray-300 rounded"
                        required
                    />
                </div>
                <button
                    type="submit"
                    className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                >
                    Submit Salary Payment
                </button>
            </form>
        </main>
    );
};

export default SalaryPaymentPage;
