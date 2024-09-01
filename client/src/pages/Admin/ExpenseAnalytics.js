import React, { useState, useEffect } from "react";
import { Line } from "react-chartjs-2";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    LineElement,
    PointElement,
    Title,
    Tooltip,
    Legend,
} from "chart.js";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { EXPENSE_ANALYTICS } from "../../utils/adminApis";
import { useAuth } from "../../context/authContext/AuthProvider";

ChartJS.register(
    CategoryScale,
    LinearScale,
    LineElement,
    PointElement,
    Title,
    Tooltip,
    Legend
);

const ExpenseAnalytics = () => {
    const { state } = useAuth();
    const [interval, setInterval] = useState("monthly");
    const [data, setData] = useState({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchExpenseData = async () => {
            try {
                const response = await axios.get(EXPENSE_ANALYTICS, {
                    headers: {
                        Authorization: `${state?.token}`,
                    },
                    params: {
                        interval,
                    },
                });
                setData(response.data);
            } catch (err) {
                setError("Failed to fetch expense data");
            } finally {
                setLoading(false);
            }
        };

        fetchExpenseData();
    }, [interval, state?.token]);

    const handleIntervalChange = (event) => {
        setInterval(event.target.value);
    };

    // Calculate net income
    const calculateNetIncome = () => {
        const salaryPayments = Object.values(data.salaryPayments || {});
        const feeReceives = Object.values(data.feeReceives || {});

        // Ensure the arrays have the same length
        const length = Math.min(salaryPayments.length, feeReceives.length);

        return Array.from(
            { length },
            (_, index) => feeReceives[index] - salaryPayments[index]
        );
    };

    // Calculate net loss as positive values
    const calculateNetLoss = () => {
        return calculateNetIncome()
            .map((value) => (value < 0 ? -value : null))
            .filter((value) => value !== null);
    };

    const chartData = {
        labels: Object.keys(data.feeReceives || {}).sort((a, b) => new Date(a) - new Date(b)),
        datasets: [
            {
                label: "Salary Paid",
                data: Object.keys(data.salaryPayments || {}).sort((a, b) => new Date(a) - new Date(b)).map(label => data.salaryPayments[label]),
                fill: false,
                borderColor: "rgba(255, 99, 132, 1)",
                backgroundColor: "rgba(255, 99, 132, 0.2)",
            },
            {
                label: "Income Received",
                data: Object.keys(data.feeReceives || {}).sort((a, b) => new Date(a) - new Date(b)).map(label => data.feeReceives[label]),
                fill: false,
                borderColor: "rgba(54, 162, 235, 1)",
                backgroundColor: "rgba(54, 162, 235, 0.2)",
            },
            {
                label: "Net Income",
                data: calculateNetIncome().sort((a, b) => new Date(a) - new Date(b)),
                fill: false,
                borderColor: "rgba(75, 192, 192, 1)",
                backgroundColor: "rgba(75, 192, 192, 0.2)",
            },
        ],
    };
    

    const chartOptions = {
        responsive: true,
        plugins: {
            legend: {
                position: "top",
            },
            title: {
                display: true,
                text:
                    interval === "yearly"
                        ? "Yearly Expense & Income"
                        : "Monthly Expense & Income",
            },
        },
        scales: {
            y: {
                beginAtZero: true, // Ensures the Y-axis starts from zero
                ticks: {
                    callback: (value) => (value < 0 ? 0 : value), // Avoid negative values on the Y-axis
                },
            },
        },
    };

    if (loading) return <div>Loading...</div>;
    if (error) return <div>{error}</div>;

    return (
        <div className="relative">
            <h1 className="text-3xl font-bold text-center my-8">
                Expense Analytics
            </h1>
            <div className="absolute top-4 right-4">
                <select
                    value={interval}
                    onChange={handleIntervalChange}
                    className="p-2 border rounded"
                >
                    <option value="monthly">Monthly</option>
                    <option value="yearly">Yearly</option>
                </select>
            </div>
            <div style={{ width: "60%", margin: "auto" }}>
                <Line data={chartData} options={chartOptions} />
            </div>
        </div>
    );
};

export default ExpenseAnalytics;
