import React from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import { handleLogin } from "../utils/apiUtils";
import { useAuth } from "../context/authContext/AuthProvider";

const LoginForm = ({ errorMessage, setErrorMessage }) => {
    const navigate = useNavigate();
    const { dispatch } = useAuth();

    const [isSubmitting, setIsSubmitting] = React.useState(false);

    const validationSchema = Yup.object({
        email: Yup.string().email("Invalid email address").required("Required"),
        password: Yup.string()
            .min(6, "Password must be at least 6 characters")
            .required("Required"),
    });

    return (
        <div className="w-full bg-white shadow-lg rounded-lg max-w-lg px-20 py-20 mx-auto">
            <h2 className="text-3xl font-bold mb-6 text-center text-purple-600">
                Login
            </h2>
            {errorMessage && (
                <p className="text-red-600 mb-6 text-center">{errorMessage}</p>
            )}
            <Formik
                initialValues={{ email: "", password: "" }}
                validationSchema={validationSchema}
                onSubmit={(values) => {
                    handleLogin(values, setIsSubmitting, navigate, dispatch, setErrorMessage);
                }}
            >
                <Form className="space-y-3">
                    <div className="mb-6">
                        <label
                            htmlFor="email"
                            className="block text-sm font-medium text-gray-700"
                        >
                            Email Address
                        </label>
                        <Field
                            type="email"
                            id="email"
                            name="email"
                            placeholder="Your email"
                            className="mt-2 block w-full px-3 py-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-purple-500 focus:border-purple-500 sm:text-sm"
                            disabled={isSubmitting}
                        />
                        <ErrorMessage
                            name="email"
                            component="div"
                            className="mt-2 text-sm text-red-600"
                        />
                    </div>

                    <div className="mb-4">
                        <label
                            htmlFor="password"
                            className="block text-sm font-medium text-gray-700"
                        >
                            Password
                        </label>
                        <Field
                            type="password"
                            id="password"
                            name="password"
                            placeholder="Your password"
                            className="mt-1 block w-full px-3 py-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-purple-500 focus:border-purple-500 sm:text-sm"
                            disabled={isSubmitting}
                        />
                        <ErrorMessage
                            name="password"
                            component="div"
                            className="mt-2 text-sm text-red-600"
                        />
                    </div>

                    <button
                        type="submit"
                        className="relative w-full bg-purple-600 text-white py-3 cursor-pointer rounded-lg shadow-md hover:bg-purple-700 transition duration-200 text-sm flex items-center justify-center"
                        disabled={isSubmitting}
                    >
                        {isSubmitting ? (
                            <div className="spinner"></div>
                        ) : (
                            "Login"
                        )}
                    </button>
                </Form>
            </Formik>
            <div className="flex justify-around items-center mt-4">
                <div className="text-center">
                    <p className="text-sm text-purple-600">
                        New User?{" "}
                        <span
                            className="hover:opacity-80 cursor-pointer underline font-semibold"
                            onClick={() => navigate("/")}
                        >
                            SignUp
                        </span>
                    </p>
                </div>
                <div className="text-center">
                    <p className="text-sm text-purple-600">
                        Forgot Password?{" "}
                        <span
                            onClick={() => {
                                navigate("/forgot-password");
                            }}
                            className="hover:opacity-80 cursor-pointer underline font-semibold"
                        >
                            Reset
                        </span>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default LoginForm;
