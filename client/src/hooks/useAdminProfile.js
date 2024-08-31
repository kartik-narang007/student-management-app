import { useState, useEffect } from "react";
import axios from "axios";
import { useAuth } from "../context/authContext/AuthProvider"; // Adjust the path as necessary
import { GET_ADMIN_PROFILE, UPDATE_ADMIN_PROFILE } from "../utils/adminApis";

const useAdminProfile = () => {
    const { state } = useAuth();
    const { user, token } = state;

    const [admin, setAdmin] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchAdminProfile = async () => {
            try {
                if (user && user._id) {
                    const response = await axios.get(
                        `${GET_ADMIN_PROFILE}/${user._id}`,
                        {
                            headers: {
                                Authorization: `${token}`,
                            },
                        }
                    );
                    setAdmin(response.data);
                } else {
                    setError("No user ID found");
                }
            } catch (err) {
                setError("Failed to fetch admin data");
            } finally {
                setLoading(false);
            }
        };

        fetchAdminProfile();
    }, [user, token]);

    const updateAdmin = async (updatedData) => {
        try {
            if (user && user._id) {
                const response = await axios.put(
                    `${UPDATE_ADMIN_PROFILE}/${user._id}`,
                    updatedData,
                    {
                        headers: {
                            Authorization: `${token}`,
                        },
                    }
                );
                setAdmin(response.data);
            } else {
                setError("No user ID found");
            }
        } catch (err) {
            setError("Failed to update admin data");
        }
    };

    return { admin, loading, error, updateAdmin };
};

export default useAdminProfile;
