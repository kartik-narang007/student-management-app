import React from "react";

const Dropdown = ({ options, selectedValue, onChange, warning }) => {
    return (
        <div>
            <select
                className="form-select block w-full"
                value={selectedValue}
                onChange={onChange}
            >
                <option value="" disabled>Select teacher</option>
                {options.length > 0 ? (
                    options.map((teacher) => (
                        <option key={teacher._id} value={teacher._id}>
                            {teacher.fullName}
                        </option>
                    ))
                ) : (
                    <option value="" disabled>No available teachers</option>
                )}
            </select>
            {warning && <p className="text-red-500 text-sm mt-2">{warning}</p>}
        </div>
    );
};

export default Dropdown;
