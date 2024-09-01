import React, { useState, useEffect } from "react";
import useFetchTeachers from "../../hooks/useFetchTeachers";
import useHandleSalaryPayment from "../../hooks/useHandleSalaryPayment";

const SalaryPaymentPage = () => {
    const { teachers } = useFetchTeachers();
    const { handleSubmit, handleChange, formData, setFormData, successMessage, loading } =
        useHandleSalaryPayment();
    const [selectedTeacher, setSelectedTeacher] = useState("");
    const [message, setMessage] = useState("");

    useEffect(() => {
        if (selectedTeacher) {
            const teacher = teachers.find((t) => t._id === selectedTeacher);
            if (teacher) {
                setFormData((prevData) => ({
                    ...prevData,
                    amount: teacher.assignedSalary || 0, 
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
                    disabled={loading}  // Disable button while loading
                >
                    {loading ? (
                        <svg
                            className="animate-spin h-5 w-5 text-white inline-block"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                        >
                            <circle
                                className="opacity-25"
                                cx="12"
                                cy="12"
                                r="10"
                                stroke="currentColor"
                                strokeWidth="4"
                            ></circle>
                            <path
                                className="opacity-75"
                                fill="currentColor"
                                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zM2 16.929A10.934 10.934 0 011.071 12H0c0 3.042 1.135 5.824 3 7.929l1-1z"
                            ></path>
                        </svg>
                    ) : (
                        "Submit Salary Payment"
                    )}
                </button>
            </form>
        </main>
    );
};

export default SalaryPaymentPage;
