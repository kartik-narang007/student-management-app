import React from "react";
import withSidebarNav from "./ReusableHOCs/withSidebarNav";
import withSidebarTitle from "./ReusableHOCs/withSideBarTitle";
import { FaTachometerAlt, FaUserCircle } from "react-icons/fa";
import { Link } from "react-router-dom";

const StudentSidebarContent = ({ navItems }) => {
    return (
        <nav className="bg-transparent h-full w-full mt-12">
            <ul className="">
                {navItems.map((item) => (
                    <li key={item.to}>
                        <Link
                            to={item.to}
                            className={`py-3 transition-colors flex items-center ${
                                item.active
                                    ? "border-l-4 border-yellow-500 bg-gray-100 bg-opacity-10 transition"
                                    : "hover:bg-gray-100 hover:bg-opacity-10 hover:text-opacity-95 transition"
                            }`}
                        >
                            {item.icon}
                            <span>{item.label}</span>
                        </Link>
                    </li>
                ))}
            </ul>
        </nav>
    );
};

const navItems = [
    { to: "/student", label: "Dashboard", icon: <FaTachometerAlt className="text-lg ml-10 mr-3" /> },
    { to: "/student/profile", label: "Profile", icon: <FaUserCircle className="text-lg ml-10 mr-3" /> },
];

const StudentSidebar = withSidebarTitle(withSidebarNav(StudentSidebarContent, navItems), "Student Dashboard");

export default StudentSidebar;
