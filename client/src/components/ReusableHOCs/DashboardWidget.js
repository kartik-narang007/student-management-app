import React from "react";
import { Link } from "react-router-dom";

const DashboardWidget = ({ to, bgColor, title, content }) => {
    return (
        <Link to={to}>
            <div
                className={`${bgColor} p-4 shadow rounded hover:shadow-lg transition`}
            >
                <h2 className="text-xl font-semibold">{title}</h2>
                <p className="text-lg text-gray-600 mt-2">{content}</p>
            </div>
        </Link>
    );
};

export default DashboardWidget;
