import React from "react";
import { Bar } from "react-chartjs-2";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from "chart.js";
import { useNavigate } from "react-router-dom";

// Register Chart.js components
ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);

const expenseData = {
    labels: ["January", "February", "March", "April", "May"],
    datasets: [
        {
            label: "Salary Paid",
            data: [5000, 6000, 7000, 5500, 6200], // Example data
            backgroundColor: "rgba(255, 99, 132, 0.2)",
            borderColor: "rgba(255, 99, 132, 1)",
            borderWidth: 1,
        },
        {
            label: "Income Received",
            data: [7000, 8000, 7500, 7800, 8200], // Example data
            backgroundColor: "rgba(54, 162, 235, 0.2)",
            borderColor: "rgba(54, 162, 235, 1)",
            borderWidth: 1,
        },
    ],
};

const ExpenseAnalytics = () => {
    const navigate = useNavigate();

    return (
        <div className="relative">
            <button
                onClick={() => navigate(-1)}
                className="w-12 h-12 flex items-center justify-center rounded-full bg-white border border-gray-300 shadow-md hover:bg-gray-100"
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
            </button>
            <h1>Expense Analytics</h1>
            <div style={{ width: "80%", margin: "auto" }}>
                <Bar data={expenseData} options={{ responsive: true }} />
            </div>
        </div>
    );
};

export default ExpenseAnalytics;
