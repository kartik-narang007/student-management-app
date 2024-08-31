import React from "react";
import useFeeDetails from "../../hooks/useFeeDetails";
import { useAuth } from "../../context/authContext/AuthProvider";
import Table from "../../components/ReusableTable"; // Adjust the import path to your project structure

const StudentFeeDetails = () => {
    const {
        state: { user, token },
    } = useAuth();

    const { feeDetails, totalFeesPaid, loading, error } = useFeeDetails(user._id, token);

    const headers = [
        { title: "Payment ID", key: "_id", sortable: true },
        { title: "Amount", key: "amount", sortable: true },
        { title: "Date", key: "date", sortable: true },
    ];

    const rows = feeDetails.map(fee => ({
        _id: fee._id,
        amount: `$${fee.amount}`,
        date: new Date(fee.date).toLocaleDateString(),
    }));

    const actionButtons = []; // Define action buttons if needed, otherwise leave it empty

    if (loading) {
        return <p className="text-center text-lg">Loading fee details...</p>;
    }

    if (error) {
        return <p className="text-center text-lg text-red-500">{error}</p>;
    }

    return (
        <>
            <h1 className="text-center text-2xl font-bold">Fee Details</h1>
            <div className="mt-4">
                {rows.length > 0 ? (
                    <>
                        <Table
                            headers={headers}
                            rows={rows}
                            rowKey="_id"
                            sortable={true}
                            actionButtons={actionButtons}
                        />
                        <div className="mt-4 text-center text-lg font-bold">
                            Total Fees Paid: ${totalFeesPaid}
                        </div>
                    </>
                ) : (
                    <p className="text-center text-lg">
                        No fee details available.
                    </p>
                )}
            </div>
        </>
    );
};

export default StudentFeeDetails;
