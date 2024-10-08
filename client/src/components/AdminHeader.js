// src/components/AdminHeader.js
import React from 'react';
import withNavigation from './ReusableHOCs/NavigationButtonsHOCs';
import withLogout from './ReusableHOCs/LogoutButtonHOCs';

const AdminHeader = ({ NavigationButtons, LogoutButton }) => {
    return (
        <header className="flex items-start rounded-tr-xl bg-gray-100 w-full px-4 py-[1.88rem] border-b border-yellow-400 justify-between">
            {NavigationButtons}
            <div className="flex items-center justify-center">
                {LogoutButton}
            </div>
        </header>
    );
};

export default withLogout(withNavigation(AdminHeader));
