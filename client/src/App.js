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
import SalaryPayment from "./pages/Admin/SalaryPayment";
import FeeReceive from "./pages/Admin/FeeReceive";
import AdminManageStudents from "./pages/Admin/AdminManageStudents";
import AdminManageTeachers from "./pages/Admin/AdminManageTeachers";
import AdminCreateClass from "./pages/Admin/AdminCreateClass";
import AssignTeachers from "./pages/Admin/AssignTeachers";
import StudentFeeDetails from "./pages/Students/StudentFeeDetails";
import { AuthProvider } from "./context/authContext/AuthProvider";
import AdminDashboard from "./pages/Admin/AdminDashboard";
import AdminClassList from "./pages/Admin/AdminClassList";
import StudentClassDetails from "./pages/Students/StudentClassDetails";
import TeacherSalaryDetails from "./pages/Teacher/TeacherSalaryDetails";
import AdminProfile from "./pages/Admin/AdminProfile";

const App = () => {
    return (
        <div className="scrollable">
            <AuthProvider>
                <Router>
                    <Routes>
                        <Route path="/" element={<Main />} />
                        <Route path="/login" element={<Login />} />
                        <Route
                            path="/admin-register"
                            element={<AdminRegister />}
                        />
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
                            element={
                                <ProtectedRoute allowedRoles={["admin"]} />
                            }
                        >
                            <Route element={<AdminLayout />}>
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
                                    path="create-class"
                                    element={<AdminCreateClass />}
                                />
                                <Route
                                    path="salary-payment"
                                    element={<SalaryPayment />}
                                />
                                <Route
                                    path="fee-receive"
                                    element={<FeeReceive />}
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
                                    path="assign-teachers"
                                    element={<AssignTeachers />}
                                />
                                <Route
                                    path="class-list"
                                    element={<AdminClassList />}
                                />
                                <Route
                                    path="profile"
                                    element={<AdminProfile />}
                                />
                            </Route>
                        </Route>

                        <Route
                            path="/teacher/*"
                            element={
                                <ProtectedRoute allowedRoles={["teacher"]} />
                            }
                        >
                            <Route element={<TeacherLayout />}>
                                <Route index element={<TeacherDashboard />} />
                                <Route
                                    path="classes"
                                    element={<TeacherMyClasses />}
                                />
                                 <Route
                                    path="salary-details"
                                    element={<TeacherSalaryDetails />}
                                />
                                <Route
                                    path="profile"
                                    element={<TeacherProfile />}
                                />
                            </Route>
                        </Route>

                        <Route
                            path="/student/*"
                            element={
                                <ProtectedRoute allowedRoles={["student"]} />
                            }
                        >
                            <Route element={<StudentLayout />}>
                                <Route index element={<StudentDashboard />} />
                                <Route
                                    path="profile"
                                    element={<StudentProfile />}
                                />
                                <Route
                                    path="fees"
                                    element={<StudentFeeDetails />}
                                />
                                <Route
                                    path="class-details"
                                    element={<StudentClassDetails />}
                                />
                            </Route>
                        </Route>
                    </Routes>
                </Router>
            </AuthProvider>
        </div>
    );
};

export default App;
