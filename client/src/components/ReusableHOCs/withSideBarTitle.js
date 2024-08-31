// src/components/ReusableHOCs/withSidebarTitle.js
import React from 'react';

const withSidebarTitle = (WrappedComponent, title) => (props) => {
    return (
        <div className="flex flex-col w-64 h-full items-center justify-center bg-[#0b262f] rounded-tl-xl rounded-bl-xl text-gray-200">
            <div className="font-semibold text-2xl px-10 py-6 text-yellow-500 border-b border-gray-50 border-opacity-50">
                {title}
            </div>
            <WrappedComponent {...props} />
        </div>
    );
};

export default withSidebarTitle;
