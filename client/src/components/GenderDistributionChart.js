// src/components/GenderDistributionChart.js
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

// Register Chart.js components
ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);

const GenderDistributionChart = ({ maleCount, femaleCount, otherCount }) => {
    const totalStudents = maleCount + femaleCount + otherCount;

    const genderDistribution = {
        labels: ["Male", "Female", "Other"],
        datasets: [
            {
                label: "Gender Distribution",
                data: [maleCount, femaleCount, otherCount],
                backgroundColor: [
                    "rgba(75, 192, 192, 0.2)", // Color for Male
                    "rgba(153, 102, 255, 0.2)", // Color for Female
                    "rgba(255, 159, 64, 0.2)", // Color for Other
                ],
                borderColor: [
                    "rgba(75, 192, 192, 1)", // Border color for Male
                    "rgba(153, 102, 255, 1)", // Border color for Female
                    "rgba(255, 159, 64, 1)", // Border color for Other
                ],
                borderWidth: 1,
                barThickness: 40, // Adjust the bar thickness
            },
        ],
    };

    return (
        <div className="flex flex-col items-center" style={{ width: '100%', height: '500px' }}>
            <Bar
                data={genderDistribution}
                options={{
                    responsive: true,
                    plugins: {
                        legend: {
                            display: false, // Hide the legend inside the chart
                        },
                        tooltip: {
                            callbacks: {
                                label: function (tooltipItem) {
                                    const gender = tooltipItem.label;
                                    const count = tooltipItem.raw;
                                    const percentage = (
                                        (count / totalStudents) *
                                        100
                                    ).toFixed(2);
                                    return `${gender}: ${count} (${percentage}%)`;
                                },
                            },
                        },
                    },
                    scales: {
                        x: {
                            ticks: {
                                autoSkip: true,
                                maxTicksLimit: 10,
                            },
                            title: {
                                display: true,
                                text: "Gender",
                            },
                        },
                        y: {
                            title: {
                                display: true,
                                text: "Count",
                            },
                            max: Math.max(maleCount, femaleCount, otherCount) * 4, // Adjust max value to fit all bars
                            beginAtZero: true,
                        },
                    },
                }}
            />
        </div>
    );
};

export default GenderDistributionChart;
