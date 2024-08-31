import React from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import InputField from "../../components/InputField";
import { handleRegister } from "../../utils/apiUtils";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/authContext/AuthProvider";

const validationSchema = Yup.object({
    fullName: Yup.string().required("Full name is required"),
    email: Yup.string()
        .email("Invalid email address")
        .required("Email is required"),
    mobileNumber: Yup.string()
        .matches(/^\d{10}$/, "Mobile number must be 10 digits")
        .required("Mobile number is required"),
    address: Yup.string().required("Address is required"),
    password: Yup.string()
        .min(8, "Password must be at least 8 characters")
        .matches(/[A-Z]/, "Password must contain at least one uppercase letter")
        .matches(/[a-z]/, "Password must contain at least one lowercase letter")
        .matches(/\d/, "Password must contain at least one number")
        .matches(
            /[!@#$%^&*()_+{}\[\]:;"'<>,.?~`|-]/,
            "Password must contain at least one special character"
        )
        .required("Password is required"),
    confirmPassword: Yup.string()
        .oneOf([Yup.ref("password"), null], "Passwords must match")
        .required("Confirm password is required"),
});

const AdminRegister = () => {
    const navigate = useNavigate();
    const { _, dispatch } = useAuth();

    const buttonStyles =
        "w-full cursor-pointer bg-purple-600 text-white py-2 rounded-lg shadow-md hover:bg-purple-700 transition duration-200 text-sm";

    return (
        <div className="w-full max-w-md bg-gray-50 shadow-lg rounded-lg p-4 mx-auto">
            <h2 className="text-2xl font-bold mb-3 text-center text-purple-600">
                Admin Registration
            </h2>
            <Formik
                initialValues={{
                    fullName: "",
                    email: "",
                    mobileNumber: "",
                    address: "",
                    password: "",
                    confirmPassword: "",
                }}
                validationSchema={validationSchema}
                onSubmit={(values) => {
                    const { confirmPassword, ...registrationData } = values;
                    handleRegister(
                        registrationData,
                        "admin",
                        navigate,
                        dispatch
                    );
                }}
            >
                {({ isValid, dirty }) => (
                    <Form className="space-y-2">
                        <InputField
                            label="Full Name"
                            type="text"
                            id="fullName"
                            name="fullName"
                            placeholder="Enter full name"
                        />
                        <ErrorMessage name="fullName">
                            {(msg) => (
                                <p className="mt-2 text-sm text-red-600">{msg}</p>
                            )}
                        </ErrorMessage>

                        <InputField
                            label="Email Address"
                            type="email"
                            id="email"
                            name="email"
                            placeholder="Enter email address"
                        />
                        <ErrorMessage name="email">
                            {(msg) => (
                                <p className="mt-2 text-sm text-red-600">{msg}</p>
                            )}
                        </ErrorMessage>

                        <InputField
                            label="Mobile Number"
                            type="text"
                            id="mobileNumber"
                            name="mobileNumber"
                            placeholder="Enter mobile number"
                        />
                        <ErrorMessage name="mobileNumber">
                            {(msg) => (
                                <p className="mt-2 text-sm text-red-600">{msg}</p>
                            )}
                        </ErrorMessage>

                        <InputField
                            label="Address"
                            type="text"
                            id="address"
                            name="address"
                            placeholder="Enter address"
                        />
                        <ErrorMessage name="address">
                            {(msg) => (
                                <p className="mt-2 text-sm text-red-600">{msg}</p>
                            )}
                        </ErrorMessage>

                        <InputField
                            label="Password"
                            type="password"
                            id="password"
                            name="password"
                            placeholder="Enter password"
                        />
                        <ErrorMessage name="password">
                            {(msg) => (
                                <p className="mt-2 text-sm text-red-600">{msg}</p>
                            )}
                        </ErrorMessage>

                        <InputField
                            label="Confirm Password"
                            type="password"
                            id="confirmPassword"
                            name="confirmPassword"
                            placeholder="Confirm password"
                        />
                        <ErrorMessage name="confirmPassword">
                            {(msg) => (
                                <p className="mt-2 text-sm text-red-600">{msg}</p>
                            )}
                        </ErrorMessage>

                        <button
                            type="submit"
                            className={buttonStyles}
                            disabled={!isValid || !dirty}
                        >
                            Register
                        </button>
                    </Form>
                )}
            </Formik>
            <div className="flex justify-center mt-3">
                <p className="text-purple-600 text-md">
                    Already a user?{" "}
                    <span
                        onClick={() => navigate("/login")}
                        className="cursor-pointer underline font-semibold hover:opacity-80"
                    >
                        Login
                    </span>
                </p>
            </div>
        </div>
    );
};

export default AdminRegister;
