import { authActionTypes } from "./authActionTypes";

export const setUser = (user, token) => {
    return {
        type: authActionTypes.SET_USER,
        user: user,
        token: token,
    };
};

export const logoutUser = () => {
    return {
        type: authActionTypes.LOGOUT_USER,
    };
};
