import React, { useEffect, useState } from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import InputField from "../../components/InputField";
import { handleRegister } from "../../utils/apiUtils";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/authContext/AuthProvider";
import axios from "axios";
import { FETCH_CLASS_NAMES } from "../../utils/api"; 

const StudentRegister = () => {
    const { state, dispatch } = useAuth();
    const navigate = useNavigate();

    const [classes, setClasses] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchClasses = async () => {
            try {
                const response = await axios.get(FETCH_CLASS_NAMES); 
                setClasses(response?.data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchClasses();
    }, []);

    useEffect(() => {
        if (state.user) {
            navigate(`/${state.user.role}`);
        }
    }, [state.user, navigate]);

    const validateClassSelection = (value) => {
        const selectedClass = classes.find(cls => cls._id === value);
        if (selectedClass && selectedClass.enrolledStudents >= selectedClass.studentLimit) {
            return "This class is full.";
        }
        return true;
    };

    const validationSchema = Yup.object({
        fullName: Yup.string().required("Full name is required"),
        email: Yup.string()
            .email("Invalid email address")
            .required("Email is required"),
        dob: Yup.date().required("Date of Birth is required"),
        gender: Yup.string().required("Gender is required"),
        mobileNumber: Yup.string()
            .matches(/^\d{10}$/, "Mobile number must be 10 digits")
            .required("Mobile number is required"),
        address: Yup.string().required("Address is required"),
        parentName: Yup.string().required("Parent/Guardian name is required"),
        password: Yup.string()
            .min(8, "Password must be at least 8 characters")
            .matches(
                /[A-Z]/,
                "Password must contain at least one uppercase letter"
            )
            .matches(
                /[a-z]/,
                "Password must contain at least one lowercase letter"
            )
            .matches(/\d/, "Password must contain at least one number")
            .matches(
                /[!@#$%^&*()_+{}\[\]:;"'<>,.?~`-]/,
                "Password must contain at least one special character"
            )
            .required("Password is required"),
        confirmPassword: Yup.string()
            .oneOf([Yup.ref("password"), null], "Passwords must match")
            .required("Confirm Password is required"),
        class: Yup.string()
            .required("Class ID is required")
            .test("class-full", "This class is full", validateClassSelection),
    });

    const genderOptions = [
        { value: "", label: "Select gender" },
        { value: "male", label: "Male" },
        { value: "female", label: "Female" },
        { value: "other", label: "Other" },
    ];

    if (loading) return <p>Loading classes...</p>;
    if (error) return <p>Error loading classes: {error}</p>;

    return (
        <div className="w-full max-w-4xl bg-gray-50 shadow-lg rounded-lg p-6 mx-auto">
            <h2 className="text-2xl font-bold mb-3 text-center text-purple-600">
                Student Registration
            </h2>
            <Formik
                initialValues={{
                    fullName: "",
                    email: "",
                    dob: "",
                    gender: "",
                    mobileNumber: "",
                    address: "",
                    parentName: "",
                    password: "",
                    confirmPassword: "",
                    class: "", 
                }}
                validationSchema={validationSchema}
                onSubmit={(values) => {
                    const dataToSend = {
                        ...values,
                        class: values.class,
                    };
                    handleRegister(dataToSend, "student", navigate, dispatch);
                }}
            >
                {({ isValid, dirty }) => (
                    <Form className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <InputField
                                    label="Full Name"
                                    type="text"
                                    id="fullName"
                                    name="fullName"
                                    placeholder="Enter full name"
                                    as="input"
                                />
                                <ErrorMessage name="fullName">
                                    {(msg) => (
                                        <p className="mt-2 text-sm text-red-600">
                                            {msg}
                                        </p>
                                    )}
                                </ErrorMessage>
                            </div>
                            <div>
                                <InputField
                                    label="Email Address"
                                    type="email"
                                    id="email"
                                    name="email"
                                    placeholder="Enter email address"
                                    as="input"
                                />
                                <ErrorMessage name="email">
                                    {(msg) => (
                                        <p className="mt-2 text-sm text-red-600">
                                            {msg}
                                        </p>
                                    )}
                                </ErrorMessage>
                            </div>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <InputField
                                    label="Date of Birth"
                                    type="date"
                                    id="dob"
                                    name="dob"
                                    placeholder="Enter date of birth"
                                    as="input"
                                />
                                <ErrorMessage name="dob">
                                    {(msg) => (
                                        <p className="mt-2 text-sm text-red-600">
                                            {msg}
                                        </p>
                                    )}
                                </ErrorMessage>
                            </div>
                            <div>
                                <InputField
                                    label="Gender"
                                    id="gender"
                                    name="gender"
                                    as="select"
                                    options={genderOptions}
                                />
                                <ErrorMessage name="gender">
                                    {(msg) => (
                                        <p className="mt-2 text-sm text-red-600">
                                            {msg}
                                        </p>
                                    )}
                                </ErrorMessage>
                            </div>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <InputField
                                    label="Mobile Number"
                                    type="text"
                                    id="mobileNumber"
                                    name="mobileNumber"
                                    placeholder="Enter mobile number"
                                    as="input"
                                />
                                <ErrorMessage name="mobileNumber">
                                    {(msg) => (
                                        <p className="mt-2 text-sm text-red-600">
                                            {msg}
                                        </p>
                                    )}
                                </ErrorMessage>
                            </div>
                            <div>
                                <InputField
                                    label="Address"
                                    type="text"
                                    id="address"
                                    name="address"
                                    placeholder="Enter address"
                                    as="input"
                                />
                                <ErrorMessage name="address">
                                    {(msg) => (
                                        <p className="mt-2 text-sm text-red-600">
                                            {msg}
                                        </p>
                                    )}
                                </ErrorMessage>
                            </div>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <InputField
                                    label="Parent/Guardian Name"
                                    type="text"
                                    id="parentName"
                                    name="parentName"
                                    placeholder="Enter parent/guardian name"
                                    as="input"
                                />
                                <ErrorMessage name="parentName">
                                    {(msg) => (
                                        <p className="mt-2 text-sm text-red-600">
                                            {msg}
                                        </p>
                                    )}
                                </ErrorMessage>
                            </div>
                            <div>
                                <InputField
                                    label="Password"
                                    type="password"
                                    id="password"
                                    name="password"
                                    placeholder="Enter password"
                                    as="input"
                                />
                                <ErrorMessage name="password">
                                    {(msg) => (
                                        <p className="mt-2 text-sm text-red-600">
                                            {msg}
                                        </p>
                                    )}
                                </ErrorMessage>
                            </div>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <InputField
                                    label="Confirm Password"
                                    type="password"
                                    id="confirmPassword"
                                    name="confirmPassword"
                                    placeholder="Confirm password"
                                    as="input"
                                />
                                <ErrorMessage name="confirmPassword">
                                    {(msg) => (
                                        <p className="mt-2 text-sm text-red-600">
                                            {msg}
                                        </p>
                                    )}
                                </ErrorMessage>
                            </div>
                            <div>
                                <InputField
                                    label="Class"
                                    id="class"
                                    name="class"
                                    as="select"
                                    options={[
                                        { value: "", label: "Select Class" },
                                        ...classes.map((cls) => ({
                                            value: cls._id,
                                            label: `${cls.name}`,
                                        })),
                                    ]}
                                />
                                <ErrorMessage name="class">
                                    {(msg) => (
                                        <p className="mt-2 text-sm text-red-600">
                                            {msg}
                                        </p>
                                    )}
                                </ErrorMessage>
                            </div>
                        </div>
                        <div className="text-center mt-4">
                            <button
                                type="submit"
                                className="bg-blue-500 text-white px-4 py-2 rounded"
                                disabled={!isValid || !dirty}
                            >
                                Register
                            </button>
                        </div>
                    </Form>
                )}
            </Formik>
        </div>
    );
};

export default StudentRegister;
