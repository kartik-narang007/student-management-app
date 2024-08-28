import axios from "axios";
import { USER_LOGIN, USER_REGISTER } from "./api";
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
        console.log(response.data);

        const { user, token } = response.data;

        dispatch(setUser(user, token));
        localStorage.setItem("token", token);
    } catch (err) {
        console.log(`There was an error ${err}`);
    }
};

export const handleLogin = async (
    values,
    setIsSubmitting,
    navigate,
    dispatch
) => {
    try {
        setIsSubmitting(true);
        const response = await axios.post(USER_LOGIN, values, {
            headers: {
                "Content-Type": "application/json",
            },
        });
        console.log(response.data);

        const { user, token } = response.data;

        dispatch(setUser(user, token));
        localStorage.setItem("token", token);
        navigate(`/${user.role}`);
        return response.data;
    } catch (err) {
        setIsSubmitting(false);
        console.log(`There was an error ${err}`);
        throw err;
    } finally {
        setIsSubmitting(false);
    }
};
