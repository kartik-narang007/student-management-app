import { createContext, useContext, useReducer } from "react";
import { authReducer, initialState } from "./authReducer";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => (
    <AuthContext.Provider value={useReducer(authReducer, initialState)}>
        {children}
    </AuthContext.Provider>
);

export const useAuth = () => {
    return useContext(AuthContext);
};
