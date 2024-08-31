import React from "react";

const HeaderContent = ({ children }) => {
    return (
        <header className="flex items-center w-full px-4 py-[1.88rem] border-b border-yellow-400 justify-between">
            <div className="flex items-center">
                {children[0]} {/* Navigation Buttons */}
            </div>
            <div className="flex items-center">
                {children[1]} {/* Logout Button */}
            </div>
        </header>
    );
};

export default HeaderContent;
