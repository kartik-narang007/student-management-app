import React from "react";
import useSalaryDetails from "../../hooks/useSalaryDetails";
import { useAuth } from "../../context/authContext/AuthProvider";
import Table from "../../components/ReusableTable"; 

const TeacherSalaryDetails = () => {
    const {
        state: { user, token },
    } = useAuth();

    const { salaryDetails, totalSalaryPaid, loading, error } = useSalaryDetails(user._id, token);

    const headers = [
        { title: "Salary ID", key: "_id", sortable: true },
        { title: "Amount", key: "amount", sortable: true },
        { title: "Date", key: "date", sortable: true },
    ];

    const rows = salaryDetails.map((salary) => ({
        _id: salary._id,
        amount: `$${salary.amount}`,
        date: new Date(salary.date).toLocaleDateString(),
    }));

    const actionButtons = [];

    if (loading) {
        return <p className="text-center text-lg">Loading salary details...</p>;
    }

    if (error) {
        return <p className="text-center text-lg text-red-500">{error}</p>;
    }

    return (
        <>
            <h1 className="text-center text-2xl font-bold">Salary Details</h1>
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
                            Total Salary Paid: ${totalSalaryPaid}
                        </div>
                    </>
                ) : (
                    <p className="text-center text-lg">
                        No salary details available.
                    </p>
                )}
            </div>
        </>
    );
};

export default TeacherSalaryDetails;
