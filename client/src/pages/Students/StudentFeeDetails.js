import React from "react";
import StudentLayout from "../Students/StudentLayout";

const StudentFeeDetails = () => {
    // Example fee details, this would typically be fetched from an API or database
    const feeDetails = [
        { id: 1, amount: "$500", date: "2024-01-15" },
        { id: 2, amount: "$400", date: "2024-04-20" },
        { id: 3, amount: "$300", date: "2024-08-10" },
    ];

    return (
        <>
            <h1 className="text-center text-2xl font-bold">Fee Details</h1>
            <div className="mt-4">
                {feeDetails.length > 0 ? (
                    <table className="min-w-full bg-white border border-gray-200">
                        <thead>
                            <tr className="bg-gray-100 border-b">
                                <th className="py-2 px-4 border-b text-center">Payment ID</th>
                                <th className="py-2 px-4 border-b text-center">Amount</th>
                                <th className="py-2 px-4 border-b text-center">Date</th>
                            </tr>
                        </thead>
                        <tbody>
                            {feeDetails.map((fee) => (
                                <tr key={fee.id} className="text-center">
                                    <td className="py-2 px-4 border-b">{fee.id}</td>
                                    <td className="py-2 px-4 border-b">{fee.amount}</td>
                                    <td className="py-2 px-4 border-b">{fee.date}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                ) : (
                    <p className="text-center text-lg">No fee details available.</p>
                )}
            </div>
        </>
    );
};

export default StudentFeeDetails;
