import React, { useState } from "react";
import AdminSidebar from "../../components/AdminSidebar";
import AdminHeader from "../../components/AdminHeader";
import { Link, useNavigate } from "react-router-dom";

const FeesSalaryManagement = () => {
    const [formType, setFormType] = useState("salary");
    const navigate = useNavigate();

    const handleSubmit = (event) => {
        event.preventDefault();
        // Handle form submission logic here
    };

    return (
                <main className="flex-1 p-6 relative">
                    <Link
                        onClick={() => navigate(-1)}
                        className="absolute top-4 left-4 w-12 h-12 flex items-center justify-center rounded-full bg-white border border-gray-300 shadow-md hover:bg-gray-100"
                    >
                        <svg
                            className="w-6 h-6"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M15 19l-7-7 7-7"
                            />
                        </svg>
                    </Link>
                    <h1 className="text-center text-2xl font-bold mb-6">
                        Fees & Salary Management
                    </h1>

                    <div className="flex gap-6">
                        {/* Salary Payment Form */}
                        <div className="flex-1 bg-white p-6 shadow rounded-lg">
                            <h2 className="text-xl font-semibold mb-4">
                                Salary Payment
                            </h2>
                            <form onSubmit={handleSubmit}>
                                <div className="mb-4">
                                    <label
                                        htmlFor="teacherName"
                                        className="block text-gray-700"
                                    >
                                        Teacher Name
                                    </label>
                                    <input
                                        type="text"
                                        id="teacherName"
                                        name="teacherName"
                                        className="mt-1 block w-full p-2 border border-gray-300 rounded"
                                        required
                                    />
                                </div>
                                <div className="mb-4">
                                    <label
                                        htmlFor="amount"
                                        className="block text-gray-700"
                                    >
                                        Amount
                                    </label>
                                    <input
                                        type="number"
                                        id="amount"
                                        name="amount"
                                        className="mt-1 block w-full p-2 border border-gray-300 rounded"
                                        required
                                    />
                                </div>
                                <div className="mb-4">
                                    <label
                                        htmlFor="date"
                                        className="block text-gray-700"
                                    >
                                        Date
                                    </label>
                                    <input
                                        type="date"
                                        id="date"
                                        name="date"
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
                        </div>

                        {/* Fee Receipt Form */}
                        <div className="flex-1 bg-white p-6 shadow rounded-lg">
                            <h2 className="text-xl font-semibold mb-4">
                                Fee Receipt
                            </h2>
                            <form onSubmit={handleSubmit}>
                                <div className="mb-4">
                                    <label
                                        htmlFor="studentName"
                                        className="block text-gray-700"
                                    >
                                        Student Name
                                    </label>
                                    <input
                                        type="text"
                                        id="studentName"
                                        name="studentName"
                                        className="mt-1 block w-full p-2 border border-gray-300 rounded"
                                        required
                                    />
                                </div>
                                <div className="mb-4">
                                    <label
                                        htmlFor="amountReceived"
                                        className="block text-gray-700"
                                    >
                                        Amount Received
                                    </label>
                                    <input
                                        type="number"
                                        id="amountReceived"
                                        name="amountReceived"
                                        className="mt-1 block w-full p-2 border border-gray-300 rounded"
                                        required
                                    />
                                </div>
                                <div className="mb-4">
                                    <label
                                        htmlFor="receiptDate"
                                        className="block text-gray-700"
                                    >
                                        Receipt Date
                                    </label>
                                    <input
                                        type="date"
                                        id="receiptDate"
                                        name="receiptDate"
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
                        </div>
                    </div>
                </main>
           
    );
};

export default FeesSalaryManagement;
