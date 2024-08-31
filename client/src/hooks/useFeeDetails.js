import { useState, useEffect } from "react";
import axios from "axios";
import { GET_FEE_DETAILS } from "../utils/studentApis";

const useFeeDetails = (studentId, token) => {
    const [feeDetails, setFeeDetails] = useState([]);
    const [totalFeesPaid, setTotalFeesPaid] = useState(0);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchFeeDetails = async () => {
            try {
                setLoading(true);
                const response = await axios.get(
                    `${GET_FEE_DETAILS}/${studentId}`,
                    {
                        headers: {
                            Authorization: token,
                        },
                    }
                );
                setFeeDetails(response.data);

                const total = response.data.reduce(
                    (sum, fee) => sum + fee.amount,
                    0
                );
                setTotalFeesPaid(total);
                setLoading(false);
            } catch (error) {
                setError("Error fetching fee details");
                setLoading(false);
            }
        };

        fetchFeeDetails();
    }, [studentId, token]);

    return { feeDetails, totalFeesPaid, loading, error };
};

export default useFeeDetails;
