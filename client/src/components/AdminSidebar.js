// src/components/AdminSidebar.js
import React from "react";
import withSidebarNav from "./ReusableHOCs/withSidebarNav";
import withSidebarTitle from "./ReusableHOCs/withSideBarTitle";
import {
    FaTachometerAlt,
    FaUser,
    FaChalkboardTeacher,
    FaBookOpen,
    FaClipboardList,
} from "react-icons/fa";
import { Link } from "react-router-dom";

const AdminSidebarContent = ({ navItems }) => {
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
    { to: "/admin", label: "Dashboard", icon: <FaTachometerAlt className="text-lg ml-10 mr-3" /> },
    { to: "/admin/students", label: "Manage Students", icon: <FaUser className="text-lg ml-10 mr-3" /> },
    { to: "/admin/teachers", label: "Manage Teachers", icon: <FaChalkboardTeacher className="text-lg ml-10 mr-3" /> },
    { to: "/admin/create-class", label: "Create Class", icon: <FaBookOpen className="text-lg ml-10 mr-3" /> },
    { to: "/admin/class-list", label: "Class List", icon: <FaClipboardList className="text-lg ml-10 mr-3" /> },
    { to: "/admin/assign-teachers", label: "Assign Teachers", icon: <FaClipboardList className="text-lg ml-10 mr-3" /> },
];

const AdminSidebar = withSidebarTitle(withSidebarNav(AdminSidebarContent, navItems), "Admin Dashboard");

export default AdminSidebar;
