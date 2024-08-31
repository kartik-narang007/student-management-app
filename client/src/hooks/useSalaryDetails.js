// src/hooks/useSalaryDetails.js
import { useState, useEffect } from "react";
import axios from "axios";
import { GET_SALARY_DETAILS } from "../utils/teacherApis";

const useSalaryDetails = (teacherId, token) => {
    const [salaryDetails, setSalaryDetails] = useState([]);
    const [totalSalaryPaid, setTotalSalaryPaid] = useState(0);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchSalaryDetails = async () => {
            try {
                const response = await axios.get(`${GET_SALARY_DETAILS}/${teacherId}`, {
                    headers: { Authorization: `${token}` },
                });
                setSalaryDetails(response.data.salaryDetails);
                setTotalSalaryPaid(response.data.totalSalaryPaid);
                setLoading(false);
            } catch (err) {
                setError(err.message);
                setLoading(false);
            }
        };

        fetchSalaryDetails();
    }, [teacherId, token]);

    return { salaryDetails, totalSalaryPaid, loading, error };
};

export default useSalaryDetails;
