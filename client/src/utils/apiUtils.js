import axios from "axios";
import { USER_LOGIN, USER_REGISTER } from "./authApis";
import { setUser } from "../context/authContext/authActions";

export const handleRegister = async (values, role, navigate, dispatch) => {
    try {
        const response = await axios.post(
            USER_REGISTER,
            { ...values, role },
            {
                headers: {
                    "Content-Type": "application/json",
                },
            }
        );

        const { user, token } = response.data;

        dispatch(setUser(user, token));
        localStorage.setItem("token", token);
        localStorage.setItem("user", JSON.stringify(user));
    } catch (err) {
        // Handle the error appropriately here
    }
};

export const handleLogin = async (
    values,
    setIsSubmitting,
    navigate,
    dispatch,
    setErrorMessage
) => {
    try {
        setIsSubmitting(true);
        const response = await axios.post(USER_LOGIN, values, {
            headers: {
                "Content-Type": "application/json",
            },
        });

        const { user, token } = response.data;

        dispatch(setUser(user, token));
        localStorage.setItem("token", token);
        localStorage.setItem("user", JSON.stringify(user));
        navigate(`/${user.role}`); // Navigate to the user's role page
    } catch (err) {
        setIsSubmitting(false);
        if (err.response && err.response.data) {
            setErrorMessage(err.response.data.message);
        } else {
            setErrorMessage("An unexpected error occurred");
        }
    } finally {
        setIsSubmitting(false);
    }
};
