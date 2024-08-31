// src/components/ReusableHOCs/withNavigation.js
import React from 'react';
import { MdOutlineKeyboardArrowLeft, MdOutlineKeyboardArrowRight } from 'react-icons/md';
import { useNavigate } from 'react-router-dom';

const withNavigation = (WrappedComponent) => (props) => {
    const navigate = useNavigate();

    const NavigationButtons = (
        <div className="flex items-center justify-center gap-2">
            <button
                onClick={() => navigate(-1)}
                className="bg-yellow-400 flex items-center justify-center rounded-full h-11 w-11"
            >
                <MdOutlineKeyboardArrowLeft size={35} />
            </button>
            <button
                onClick={() => navigate(+1)}
                className="bg-yellow-400 flex items-center justify-center rounded-full w-11 h-11"
            >
                <MdOutlineKeyboardArrowRight size={35} />
            </button>
        </div>
    );

    return <WrappedComponent NavigationButtons={NavigationButtons} {...props} />;
};

export default withNavigation;
