import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import useCreateClass from "../../hooks/useCreateClass";

// Validation schema with Yup
const validationSchema = Yup.object({
    className: Yup.string().required("Class Name is required"),
    year: Yup.string().required("Year is required"),
    studentLimit: Yup.number()
        .required("Student Limit is required")
        .positive("Student Limit must be a positive number")
        .integer("Student Limit must be an integer"),
    studentFees: Yup.number()
        .required("Student Fees are required")
        .positive("Student Fees must be a positive number"),
});

const AdminCreateClasses = () => {
    const [classes, setClasses] = useState([]);
    const { createClass, statusMessage, isError, isSuccess } = useCreateClass();

    const handleAddClass = async (values, { resetForm }) => {
        try {
            const response = await createClass(values);
            if (response?.status === 201) {
                setClasses(prevClasses => [...prevClasses, response.data.class]);
                resetForm();
            }
        } catch (error) {
            // Handle error
        }
    };

    return (
        <div className="p-4 max-w-3xl mx-auto">
            <h2 className="text-2xl font-bold mb-4">Manage Classes</h2>

            <div className="p-4 border rounded shadow-md">
                <h3 className="text-xl font-semibold mb-3">Add New Class</h3>

                {statusMessage && (
                    <div className={`text-${isError ? "red" : "green"}-500 mb-4`}>
                        {statusMessage}
                    </div>
                )}

                <Formik
                    initialValues={{
                        className: "",
                        year: "",
                        studentLimit: "",
                        studentFees: "",
                    }}
                    validationSchema={validationSchema}
                    onSubmit={handleAddClass}
                >
                    {() => (
                        <Form className="space-y-3">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Class Name
                                </label>
                                <Field
                                    type="text"
                                    name="className"
                                    placeholder="Class Name"
                                    className="border border-gray-300 rounded px-2 py-1 w-full"
                                />
                                <ErrorMessage
                                    name="className"
                                    component="div"
                                    className="text-red-500 text-xs mt-1"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Year
                                </label>
                                <Field
                                    type="text"
                                    name="year"
                                    placeholder="Year"
                                    className="border border-gray-300 rounded px-2 py-1 w-full"
                                />
                                <ErrorMessage
                                    name="year"
                                    component="div"
                                    className="text-red-500 text-xs mt-1"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Student Limit
                                </label>
                                <Field
                                    type="number"
                                    name="studentLimit"
                                    placeholder="Student Limit"
                                    className="border border-gray-300 rounded px-2 py-1 w-full"
                                />
                                <ErrorMessage
                                    name="studentLimit"
                                    component="div"
                                    className="text-red-500 text-xs mt-1"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Student Fees
                                </label>
                                <Field
                                    type="number"
                                    name="studentFees"
                                    placeholder="Student Fees"
                                    className="border border-gray-300 rounded px-2 py-1 w-full"
                                />
                                <ErrorMessage
                                    name="studentFees"
                                    component="div"
                                    className="text-red-500 text-xs mt-1"
                                />
                            </div>

                            <button
                                type="submit"
                                className="mt-4 px-4 py-2 bg-blue-500 text-white font-semibold rounded hover:bg-blue-600"
                            >
                                Add Class
                            </button>
                        </Form>
                    )}
                </Formik>
            </div>
        </div>
    );
};

export default AdminCreateClasses;
