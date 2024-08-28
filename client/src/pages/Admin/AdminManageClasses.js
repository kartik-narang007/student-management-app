import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

// Dummy data for teachers
const dummyTeachers = [
    { id: 1, name: "Mr. Adams" },
    { id: 2, name: "Ms. Brown" },
    { id: 3, name: "Mrs. Smith" },
    // Add more teachers as needed
];

// Validation schema with Yup
const validationSchema = Yup.object({
    className: Yup.string().required("Class Name is required"),
    teacher: Yup.string().required("Teacher is required"),
    year: Yup.string().required("Year is required"),
    studentLimit: Yup.number().required("Student Limit is required").positive().integer(),
    studentFees: Yup.number().required("Student Fees are required").positive()
});

const AdminManageClasses = () => {
    const [classes, setClasses] = useState([]);

    const handleAddClass = (values, { resetForm }) => {
        const newClass = {
            id: classes.length + 1,
            name: values.className,
            teacher: values.teacher,
            year: values.year,
            studentLimit: values.studentLimit,
            studentFees: values.studentFees
        };
        setClasses([...classes, newClass]);
        resetForm();
    };

    return (
        <div className="p-4 max-w-3xl mx-auto">
            <h2 className="text-2xl font-bold mb-4">Manage Classes</h2>

            <div className="p-4 border rounded shadow-md">
                <h3 className="text-xl font-semibold mb-3">Add New Class</h3>
                <Formik
                    initialValues={{
                        className: "",
                        teacher: "",
                        year: "",
                        studentLimit: "",
                        studentFees: ""
                    }}
                    validationSchema={validationSchema}
                    onSubmit={handleAddClass}
                >
                    {({ errors, touched }) => (
                        <Form className="space-y-3">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Class Name</label>
                                <Field
                                    type="text"
                                    name="className"
                                    placeholder="Class Name"
                                    className="border border-gray-300 rounded px-2 py-1 w-full"
                                />
                                <ErrorMessage name="className" component="div" className="text-red-500 text-xs mt-1" />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Teacher</label>
                                <Field as="select" name="teacher" className="border border-gray-300 rounded px-2 py-1 w-full">
                                    <option value="">Select Teacher</option>
                                    {dummyTeachers.map((teacher) => (
                                        <option key={teacher.id} value={teacher.name}>
                                            {teacher.name}
                                        </option>
                                    ))}
                                </Field>
                                <ErrorMessage name="teacher" component="div" className="text-red-500 text-xs mt-1" />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Year</label>
                                <Field
                                    type="text"
                                    name="year"
                                    placeholder="Year"
                                    className="border border-gray-300 rounded px-2 py-1 w-full"
                                />
                                <ErrorMessage name="year" component="div" className="text-red-500 text-xs mt-1" />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Student Limit</label>
                                <Field
                                    type="number"
                                    name="studentLimit"
                                    placeholder="Student Limit"
                                    className="border border-gray-300 rounded px-2 py-1 w-full"
                                />
                                <ErrorMessage name="studentLimit" component="div" className="text-red-500 text-xs mt-1" />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Student Fees</label>
                                <Field
                                    type="number"
                                    name="studentFees"
                                    placeholder="Student Fees"
                                    className="border border-gray-300 rounded px-2 py-1 w-full"
                                />
                                <ErrorMessage name="studentFees" component="div" className="text-red-500 text-xs mt-1" />
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

export default AdminManageClasses;
