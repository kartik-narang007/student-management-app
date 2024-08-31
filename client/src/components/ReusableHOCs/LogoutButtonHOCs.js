import React from 'react';
import { useAuth } from '../../context/authContext/AuthProvider';
import { logoutUser } from '../../context/authContext/authActions';

const withLogout = (WrappedComponent) => {
    return (props) => {
        const { dispatch } = useAuth();

        const handleLogOut = () => {
            dispatch(logoutUser());
            localStorage.removeItem('token');
        };

        const LogoutButton = () => (
            <button
                onClick={handleLogOut}
                className="bg-purple-600 mt-1 rounded-full hover:bg-purple-800 text-white px-6 py-3 text-md font-bold transition-colors"
            >
                Logout
            </button>
        );

        return (
            <WrappedComponent
                {...props}
                LogoutButton={<LogoutButton />}
            />
        );
    };
};

export default withLogout;
