import React, { useState } from "react";
import InputField from "./InputField";

const SignUpForm = ({ setLogin }) => {
    const [formValues, setFormValues] = useState({
        fullName: "",
        gender: "",
        email: "",
        password: "",
        confirmPassword: "",
        mobileNumber: "",
        address: "",
        userType: "",
    });

    const [formErrors, setFormErrors] = useState({});
    const [isFormValid, setIsFormValid] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormValues({ ...formValues, [name]: value });

        validateField(name, value);
    };

    const validateField = (name, value) => {
        let errors = { ...formErrors };

        switch (name) {
            case "email":
                errors.email = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)
                    ? ""
                    : "Invalid email address";
                break;
            case "password":
                errors.password =
                    value.length < 6
                        ? "Password must be at least 6 characters"
                        : "";
                break;
            case "confirmPassword":
                errors.confirmPassword =
                    value !== formValues.password
                        ? "Passwords do not match"
                        : "";
                break;
            case "mobileNumber":
                errors.mobileNumber = /^\d{10}$/.test(value)
                    ? ""
                    : "Mobile number must be 10 digits";
                break;
            default:
                errors[name] = value.trim() === "" ? "This field is required" : "";
                break;
        }

        setFormErrors(errors);
        setIsFormValid(Object.values(errors).every((error) => error === ""));
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        // Final validation before submit
        Object.keys(formValues).forEach((field) =>
            validateField(field, formValues[field])
        );

        if (isFormValid) {
            // Submit form if valid
            console.log("Form submitted:", formValues);
        }
    };

    return (
        <div className="w-full max-w-md bg-white shadow-lg rounded-lg p-4 mx-auto">
            <h2 className="text-lg font-bold mb-3 text-center text-purple-600">
                Sign Up
            </h2>
            <form className="space-y-2" onSubmit={handleSubmit}>
                <div className="flex space-x-2">
                    <div className="flex-1">
                        <InputField
                            label="Full Name"
                            type="text"
                            id="fullName"
                            name="fullName"
                            placeholder="Your full name"
                            value={formValues.fullName}
                            onChange={handleChange}
                            error={formErrors.fullName}
                        />
                    </div>
                    <div className="flex-1">
                        <InputField
                            label="Gender"
                            as="select"
                            id="gender"
                            name="gender"
                            value={formValues.gender}
                            onChange={handleChange}
                            error={formErrors.gender}
                            options={[
                                { label: "Select gender", value: "" },
                                { label: "Male", value: "male" },
                                { label: "Female", value: "female" },
                                { label: "Other", value: "other" },
                            ]}
                        />
                    </div>
                </div>

                <InputField
                    label="Email Address"
                    type="email"
                    id="email"
                    name="email"
                    placeholder="Your email"
                    value={formValues.email}
                    onChange={handleChange}
                    error={formErrors.email}
                />

                <div className="flex space-x-2">
                    <div className="flex-1">
                        <InputField
                            label="Password"
                            type="password"
                            id="password"
                            name="password"
                            placeholder="Your password"
                            value={formValues.password}
                            onChange={handleChange}
                            error={formErrors.password}
                        />
                    </div>
                    <div className="flex-1">
                        <InputField
                            label="Confirm Password"
                            type="password"
                            id="confirmPassword"
                            name="confirmPassword"
                            placeholder="Confirm password"
                            value={formValues.confirmPassword}
                            onChange={handleChange}
                            error={formErrors.confirmPassword}
                        />
                    </div>
                </div>

                <InputField
                    label="Mobile Number"
                    type="text"
                    id="mobileNumber"
                    name="mobileNumber"
                    placeholder="Your mobile number"
                    value={formValues.mobileNumber}
                    onChange={handleChange}
                    error={formErrors.mobileNumber}
                />

                <InputField
                    label="Address"
                    type="text"
                    id="address"
                    name="address"
                    placeholder="Your address"
                    value={formValues.address}
                    onChange={handleChange}
                    error={formErrors.address}
                />

                <InputField
                    label="User Type"
                    as="select"
                    id="userType"
                    name="userType"
                    value={formValues.userType}
                    onChange={handleChange}
                    error={formErrors.userType}
                    options={[
                        { label: "Select user type", value: "" },
                        { label: "Admin", value: "admin" },
                        { label: "Student", value: "student" },
                        { label: "Teacher", value: "teacher" },
                    ]}
                />

                <button
                    type="submit"
                    className="w-full bg-purple-600 text-white py-2 rounded-lg shadow-md hover:bg-purple-700 transition duration-200 text-sm"
                    disabled={!isFormValid}
                >
                    Sign Up
                </button>
            </form>
            <div className="mt-2 text-center">
                <p className="text-xs text-purple-600">
                    Already Have An Account?{" "}
                    <span
                        className="cursor-pointer underline font-semibold"
                        onClick={() => setLogin(true)}
                    >
                        Login
                    </span>
                </p>
            </div>
        </div>
    );
};

export default SignUpForm;
