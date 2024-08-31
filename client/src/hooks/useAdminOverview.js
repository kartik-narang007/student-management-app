import { useState, useEffect } from "react";
import { OVERVIEW_DATA } from "../utils/adminApis";
import axios from "axios";
import { useAuth } from "../context/authContext/AuthProvider";

const useAdminOverview = () => {
    const { state } = useAuth();
    const [overviewData, setOverviewData] = useState({
        totalStudents: 0,
        totalTeachers: 0,
    });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchOverviewData = async () => {
            try {
                const response = await axios.get(OVERVIEW_DATA, {
                    headers: {
                        Authorization: `${state.token}`,
                    },
                });
                if (response.statusText !== "ok") {
                    throw new Error("Failed to fetch overview data");
                }
                setOverviewData(response.data);
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchOverviewData();
    }, [state.token]);

    return { overviewData, loading, error };
};

export default useAdminOverview;
