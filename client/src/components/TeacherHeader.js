import React from "react";
import withNavigation from "./ReusableHOCs/NavigationButtonsHOCs";
import withLogout from "./ReusableHOCs/LogoutButtonHOCs";

const TeacherHeader = ({ NavigationButtons, LogoutButton }) => {
    return (
        <header className="flex items-start w-full rounded-tr-xl px-4 py-[1.88rem] border-b bg-gray-100 border-yellow-400 justify-between">
            {NavigationButtons}
            <div className="flex items-center justify-center">
                {LogoutButton}
            </div>
        </header>
    );
};

export default withLogout(withNavigation(TeacherHeader));
