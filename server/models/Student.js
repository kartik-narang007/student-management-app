const mongoose = require("mongoose");
const User = require("./User"); // Assuming this is the base schema

const studentSchema = new mongoose.Schema({
    dateOfBirth: { type: String },
    gender: { type: String, enum: ["Male", "Female", "Other"] },
    parentName: { type: String },
    classes: [{ type: mongoose.Schema.Types.ObjectId, ref: "Class" }], // Reference to Class
    feeReceives: [{ type: mongoose.Schema.Types.ObjectId, ref: "FeeReceive" }],
    totalFeePaid: { type: Number, default: 0 }, // New field to store the total fee paid
    isApproved: { type: Boolean, default: false },
});


const Student = User.discriminator("student", studentSchema);
module.exports = Student;
