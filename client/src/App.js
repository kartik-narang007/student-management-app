import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Main from "./pages/Main";
import Login from "./pages/Login";
import AdminRegister from "./pages/Admin/AdminRegister";
import TeacherRegister from "./pages/Teacher/TeacherRegister";
import StudentRegister from "./pages/Students/StudentRegister";
import AdminDashboard from "./pages/Admin/AdminDashboard";
import StudentDashboard from "./pages/Students/StudentDashboard";
import TeacherDashboard from "./pages/Teacher/TeacherDashboard";
import AdminManageStudents from "./pages/Admin/AdminManageStudents";
import AdminManageTeachers from "./pages/Admin/AdminManageTeachers";
import AdminManageClasses from "./pages/Admin/AdminManageClasses";
import AdminReports from "./pages/Admin/AdminReports";
import StudentProfile from "./pages/Students/StudentProfile";
import TeacherMyClasses from "./pages/Teacher/TeacherMyClasses";
import TeacherProfile from "./pages/Teacher/TeacherProfile";
import { AuthProvider } from "./context/authContext/AuthProvider";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";

const App = () => {
    return (
        <AuthProvider>
            <Router>
                <Routes>
                    <Route path="/" element={<Main />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/admin-register" element={<AdminRegister />} />
                    <Route
                        path="/teacher-register"
                        element={<TeacherRegister />}
                    />
                    <Route
                        path="/student-register"
                        element={<StudentRegister />}
                    />
                    <Route path="/admin" element={<AdminDashboard />} />
                    <Route
                        path="/admin/students"
                        element={<AdminManageStudents />}
                    />
                    <Route
                        path="/admin/teachers"
                        element={<AdminManageTeachers />}
                    />
                    <Route
                        path="/admin/classes"
                        element={<AdminManageClasses />}
                    />
                    <Route path="/admin/reports" element={<AdminReports />} />
                    <Route path="/student" element={<StudentDashboard />} />
                    <Route
                        path="/student/profile"
                        element={<StudentProfile />}
                    />
                    <Route path="/teacher" element={<TeacherDashboard />} />
                    <Route
                        path="/teacher/classes"
                        element={<TeacherMyClasses />}
                    />
                    <Route
                        path="/teacher/profile"
                        element={<TeacherProfile />}
                    />
                    <Route
                        path="/forgot-password"
                        element={<ForgotPassword />}
                    />
                    <Route path="/reset-password/:token" element={<ResetPassword />} />
                </Routes>
            </Router>
        </AuthProvider>
    );
};

export default App;
