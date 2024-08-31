import { useEffect, useState } from "react";
import useGetStudentsWithClasses from "../../hooks/useGetStudetntsWithClasses";
import useHandleFeeReceive from "../../hooks/useHandleFeeReceive";

const FeeReceive = () => {
    const { students, classes, loading, error } = useGetStudentsWithClasses();
    const { handleSubmit, handleChange, formData, setFormData, successMessage } = useHandleFeeReceive();
    const [selectedStudent, setSelectedStudent] = useState("");
    const [message, setMessage] = useState("");

    useEffect(() => {
        if (selectedStudent) {
            const student = students.find((s) => s._id === selectedStudent);
            if (student) {
                const studentClassName = student.class;
                const studentClassInfo = classes.find((cls) => cls.name === studentClassName);

                if (studentClassInfo) {
                    const feeAmount = studentClassInfo?.fees || "";

                    setFormData((prevData) => ({
                        ...prevData,
                        class: studentClassInfo.name || "N/A",
                        amountReceived: feeAmount
                    }));
                }
            }
        }
    }, [selectedStudent, students, classes, setFormData]);

    useEffect(() => {
        if (successMessage) {
            setMessage(successMessage);
            setTimeout(() => setMessage(""), 2000);
        }
    }, [successMessage]);

    const handleStudentChange = (e) => {
        const selectedId = e.target.value;
        setSelectedStudent(selectedId);
        setFormData((prevData) => ({
            ...prevData,
            student: selectedId
        }));
    };

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error.message}</p>;

    return (
        <main className="flex-1 p-6 relative">
            <h1 className="text-center text-2xl font-bold mb-6">Fee Receipt</h1>
            {message && (
                <div className="mb-4 p-2 text-green-700 bg-green-100 border border-green-300 rounded">
                    {message}
                </div>
            )}
            <form onSubmit={handleSubmit}>
                <div className="mb-4">
                    <label htmlFor="student" className="block text-gray-700">Student</label>
                    <select
                        id="student"
                        name="student"
                        value={formData.student}
                        onChange={handleStudentChange}
                        className="mt-1 block w-full p-2 border border-gray-300 rounded"
                        required
                    >
                        <option value="">Select Student</option>
                        {students.map((student) => (
                            <option key={student._id} value={student._id}>
                                {student.name}
                            </option>
                        ))}
                    </select>
                </div>
                <div className="mb-4">
                    <label htmlFor="class" className="block text-gray-700">Class</label>
                    <input
                        type="text"
                        id="class"
                        name="class"
                        value={formData.class || ""}
                        className="mt-1 block w-full p-2 border border-gray-300 rounded"
                        disabled
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="amountReceived" className="block text-gray-700">Amount Received</label>
                    <input
                        type="number"
                        id="amountReceived"
                        name="amountReceived"
                        value={formData.amountReceived || ""}
                        onChange={handleChange}
                        className="mt-1 block w-full p-2 border border-gray-300 rounded"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="receiptDate" className="block text-gray-700">Receipt Date</label>
                    <input
                        type="date"
                        id="receiptDate"
                        name="receiptDate"
                        value={formData.receiptDate}
                        onChange={handleChange}
                        className="mt-1 block w-full p-2 border border-gray-300 rounded"
                        required
                    />
                </div>
                <button
                    type="submit"
                    className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                >
                    Submit Fee Receipt
                </button>
            </form>
        </main>
    );
};

export default FeeReceive;