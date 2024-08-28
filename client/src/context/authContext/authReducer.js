import { authActionTypes } from "./authActionTypes";

export const initialState = {
    user:null,
    token:null,
} 

export const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case authActionTypes.SET_USER: {
            return {
                ...state,
                user: action.user,
                token: action.token,
            };
        }
        case authActionTypes.LOGOUT_USER: {
            return {
                ...state,
                user: null,
                token: null,
            };
        }
        default:
            return state;
    }
};
