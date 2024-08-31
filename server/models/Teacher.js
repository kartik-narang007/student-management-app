const mongoose = require("mongoose");
const User = require("./User");
const SalaryPayment = require("./SalaryPayment");
const Class = require("./Class"); // Import the Class model

const teacherSchema = new mongoose.Schema({
    dateOfBirth: { type: String },
    gender: { type: String, enum: ["Male", "Female", "Other"] },
    totalSalaryPaid: { type: Number, default: 0 },
    classes: [
        { classId: { type: mongoose.Schema.Types.ObjectId, ref: "Class" } },
    ],
    salaryPayments: [
        { type: mongoose.Schema.Types.ObjectId, ref: "SalaryPayment" },
    ],
});

const Teacher = User.discriminator("teacher", teacherSchema);
module.exports = Teacher;
