import React from "react";
import { Field } from "formik";

const InputField = ({
    label,
    type = "text",
    id,
    name,
    placeholder,
    error,
    as = "input",
    options = [],
    ...props // Spread props to handle other attributes like value, onChange, onBlur
}) => (
    <div className="mb-4">
        <label htmlFor={id} className="block text-sm font-medium text-gray-700">
            {label}
        </label>
        {as === "input" ? (
            <Field
                type={type}
                id={id}
                name={name}
                placeholder={placeholder}
                as={as}
                className={`mt-1 block w-full px-3 py-3 border ${
                    error ? "border-red-500" : "border-gray-300"
                } rounded-md shadow-sm focus:outline-none focus:ring-purple-500 focus:border-purple-500 sm:text-sm`}
                {...props}
            />
        ) : (
            <Field
                as={as}
                id={id}
                name={name}
                {...props}
                className={`mt-1 block w-full px-3 py-3 border ${
                    error ? "border-red-500" : "border-gray-300"
                } rounded-md shadow-sm focus:outline-none focus:ring-purple-500 focus:border-purple-500 sm:text-sm`}
            >
                {options.map((option, index) => (
                    <option key={index} value={option.value}>
                        {option.label}
                    </option>
                ))}
            </Field>
        )}
        {error && <p className="mt-2 text-sm text-red-600">{error}</p>}
    </div>
);

export default InputField;
