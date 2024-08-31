// src/components/ReusableHOCs/withSidebarNav.js
import React from 'react';
import { useLocation, Link } from 'react-router-dom';

const withSidebarNav = (WrappedComponent, navItems) => (props) => {
    const { pathname } = useLocation();

    return (
        <WrappedComponent
            navItems={navItems.map((item) => ({
                ...item,
                active: pathname === item.to,
            }))}
            {...props}
        />
    );
};

export default withSidebarNav;
