import React, { useState } from 'react';

const SalaryPaid = () => {
  const [formData, setFormData] = useState({
    date: '',
    amount: '',
    teacherName: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Simulate API submission
    console.log('Salary Paid:', formData);
    // Clear the form or show a success message
    setFormData({
      date: '',
      amount: '',
      teacherName: '',
    });
  };

  return (
    <div>
      <h1>Salary Paid</h1>
      <form onSubmit={handleSubmit}>
        <label>Date:
          <input
            type="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
          />
        </label>
        <label>Amount:
          <input
            type="number"
            name="amount"
            value={formData.amount}
            onChange={handleChange}
          />
        </label>
        <label>Teacher Name:
          <input
            type="text"
            name="teacherName"
            value={formData.teacherName}
            onChange={handleChange}
          />
        </label>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default SalaryPaid;
