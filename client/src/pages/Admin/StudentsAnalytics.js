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
import { Link, useNavigate } from "react-router-dom";

// Register Chart.js components
ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);

// Generate 10 dummy students
const generateDummyStudents = (count) => {
    const names = [
        "John Doe",
        "Jane Smith",
        "Emily Johnson",
        "Michael Brown",
        "Sarah Davis",
        "James Wilson",
        "Mary Evans",
        "David Harris",
        "Emma Clark",
        "Olivia Lewis",
    ];
    const parents = [
        "Mr. Doe",
        "Ms. Smith",
        "Dr. Johnson",
        "Mrs. Brown",
        "Mr. Davis",
        "Mr. Wilson",
        "Mrs. Evans",
        "Mr. Harris",
        "Ms. Clark",
        "Mr. Lewis",
    ];
    const genders = ["Male", "Female"];
    const classes = ["10A", "10B"];

    return Array.from({ length: count }, (_, index) => ({
        name: names[index],
        parentName: parents[index],
        dob: `2005-01-${(index % 31) + 1}`,
        feesReceived: `$${1200 + (index % 10) * 10}`,
        gender: index < 7 ? "Male" : "Female", // 7 Males and 3 Females
        class: classes[index % classes.length],
    }));
};

const dummyStudents = generateDummyStudents(10);

// Calculate gender distribution from dummy data
const genderCounts = dummyStudents.reduce((counts, student) => {
    counts[student.gender] = (counts[student.gender] || 0) + 1;
    return counts;
}, {});

const totalStudents = dummyStudents.length;

const genderDistribution = {
    labels: Object.keys(genderCounts),
    datasets: [
        {
            label: "Gender Distribution",
            data: Object.values(genderCounts),
            backgroundColor: [
                "rgba(75, 192, 192, 0.2)",
                "rgba(153, 102, 255, 0.2)",
            ],
            borderColor: ["rgba(75, 192, 192, 1)", "rgba(153, 102, 255, 1)"],
            borderWidth: 1,
            barThickness: 40, // Adjust the bar thickness
        },
    ],
};

const StudentsAnalytics = () => {
    const navigate = useNavigate();

    return (
        <div className="flex-1 flex flex-col p-6 overflow-hidden relative">
            {/* Circular Back Button */}
            <button
                onClick={() => (navigate("/admin"))} // Navigate to the admin dashboard
                className="absolute top-2 left-2 w-12 h-12 flex items-center justify-center rounded-full bg-white border border-gray-300 shadow-md hover:bg-gray-100"
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

            <div className="text-center mb-4">
                <h1 className="text-2xl font-bold mb-2">Students Analytics</h1>
            </div>

            <h2 className="text-xl font-semibold mb-4">Total Students</h2>
            <div className="flex flex-col lg:flex-row flex-1 gap-4 overflow-hidden">
                {/* Table Section */}
                <div className="flex-1 overflow-hidden">
                    <div className="scrollable-table overflow-auto max-h-[400px]">
                        {" "}
                        {/* Adjust fixed height here */}
                        <table className="min-w-full bg-white border border-gray-300 divide-y divide-gray-200">
                            <thead className="bg-gray-200 sticky top-0">
                                <tr>
                                    <th className="py-2 px-4 border-r">
                                        Student Name
                                    </th>
                                    <th className="py-2 px-4 border-r">
                                        Parent Name
                                    </th>
                                    <th className="py-2 px-4 border-r">DOB</th>
                                    <th className="py-2 px-4 border-r">
                                        Class
                                    </th>
                                    <th className="py-2 px-4 border-r">
                                        Gender
                                    </th>
                                    <th className="py-2 px-4">Fees Received</th>
                                </tr>
                            </thead>
                            <tbody>
                                {dummyStudents.map((student, index) => (
                                    <tr
                                        key={index}
                                        className={
                                            index % 2 === 0
                                                ? "bg-gray-50"
                                                : "bg-gray-100"
                                        }
                                    >
                                        <td className="py-2 px-4 border-r">
                                            {student.name}
                                        </td>
                                        <td className="py-2 px-4 border-r">
                                            {student.parentName}
                                        </td>
                                        <td className="py-2 px-4 border-r">
                                            {student.dob}
                                        </td>
                                        <td className="py-2 px-4 border-r">
                                            {student.class}
                                        </td>
                                        <td className="py-2 px-4 border-r">
                                            {student.gender}
                                        </td>
                                        <td className="py-2 px-4">
                                            {student.feesReceived}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* Graph Section */}
                <div className="flex-1 flex flex-col items-center overflow-auto">
                    <div className="flex justify-center mb-4">
                        <div className="flex items-center mr-4">
                            <div className="w-4 h-4 bg-teal-400 mr-2"></div>{" "}
                            Male
                        </div>
                        <div className="flex items-center">
                            <div className="w-4 h-4 bg-purple-400 mr-2"></div>{" "}
                            Female
                        </div>
                    </div>
                    <div className="flex flex-col items-center">
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
                                                const gender =
                                                    tooltipItem.label;
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
                                        beginAtZero: true,
                                        title: {
                                            display: true,
                                            text: "Count",
                                        },
                                        max: dummyStudents.length,
                                        ticks: {
                                            stepSize: 1, // Adjust step size to ensure grid lines are visible
                                        },
                                    },
                                },
                            }}
                            width={400}
                            height={300}
                        />
                        <h2 className="text-lg font-semibold mt-4">
                            Gender Distribution
                        </h2>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default StudentsAnalytics;
