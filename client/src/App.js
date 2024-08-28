import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Main from "./pages/Main";
import Login from "./pages/Login";
import AdminRegister from "./pages/Admin/AdminRegister";
import TeacherRegister from "./pages/Teacher/TeacherRegister";
import StudentRegister from "./pages/Students/StudentRegister";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";
import ProtectedRoute from "./components/ProtectedRoute";
import AdminLayout from "./pages/Admin/AdminLayout";
import TeacherLayout from "./pages/Teacher/TeacherLayout";
import StudentLayout from "./pages/Students/StudentLayout";
import StudentDashboard from "./pages/Students/StudentDashboard";
import TeacherDashboard from "./pages/Teacher/TeacherDashboard";
import StudentProfile from "./pages/Students/StudentProfile";
import TeacherMyClasses from "./pages/Teacher/TeacherMyClasses";
import TeacherProfile from "./pages/Teacher/TeacherProfile";
import StudentsAnalytics from "./pages/Admin/StudentsAnalytics";
import TeachersAnalytics from "./pages/Admin/TeachersAnalytics";
import ExpenseAnalytics from "./pages/Admin/ExpenseAnalytics";
import FeesSalaryManagement from "./pages/Admin/FeeSalaryManagement";
import AdminManageStudents from "./pages/Admin/AdminManageStudents";
import AdminManageTeachers from "./pages/Admin/AdminManageTeachers";
import AdminManageClasses from "./pages/Admin/AdminManageClasses";
import AdminReports from "./pages/Admin/AdminReports";
import AdminClassList from "./pages/Admin/AdminClassList";
import StudentFeeDetails from "./pages/Students/StudentFeeDetails";
import { AuthProvider } from "./context/authContext/AuthProvider";
import AdminDashboard from "./pages/Admin/AdminDashboard";

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
                    <Route
                        path="/forgot-password"
                        element={<ForgotPassword />}
                    />
                    <Route
                        path="/reset-password/:token"
                        element={<ResetPassword />}
                    />

                    <Route
                        path="/admin/*"
                        element={<ProtectedRoute allowedRoles={["admin"]} />}
                    >
                        <Route
                            element={<AdminLayout />}
                        >
                            <Route index element={<AdminDashboard />} />
                            <Route
                                path="students"
                                element={<AdminManageStudents />}
                            />
                            <Route
                                path="teachers"
                                element={<AdminManageTeachers />}
                            />
                            <Route
                                path="classes"
                                element={<AdminManageClasses />}
                            />
                            <Route path="reports" element={<AdminReports />} />
                            <Route
                                path="fees-salary-management"
                                element={<FeesSalaryManagement />}
                            />
                            <Route
                                path="students-analytics"
                                element={<StudentsAnalytics />}
                            />
                            <Route
                                path="teachers-analytics"
                                element={<TeachersAnalytics />}
                            />
                            <Route
                                path="expense-analytics"
                                element={<ExpenseAnalytics />}
                            />
                            <Route
                                path="class-list"
                                element={<AdminClassList />}
                            />
                        </Route>
                    </Route>

                    <Route
                        path="/teacher/*"
                        element={<ProtectedRoute allowedRoles={["teacher"]} />}
                    >
                        <Route
                            element={<TeacherLayout />}
                        >
                            <Route index element={<TeacherDashboard />} />
                            <Route path="classes" element={<TeacherMyClasses />} />
                            <Route path="profile" element={<TeacherProfile />} />
                        </Route>
                    </Route>

                    <Route
                        path="/student/*"
                        element={<ProtectedRoute allowedRoles={["student"]} />}
                    >
                        <Route
                            element={<StudentLayout />}
                        >
                            <Route index element={<StudentDashboard />} />
                            <Route path="profile" element={<StudentProfile />} />
                            <Route path="fees" element={<StudentFeeDetails />} />
                        </Route>
                    </Route>
                </Routes>
            </Router>
        </AuthProvider>
    );
};

export default App;
