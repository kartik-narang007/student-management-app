const mongoose = require("mongoose");
const User = require("./User");

const studentSchema = new mongoose.Schema({
    dateOfBirth: { type: Date },
    gender: { type: String, enum: ["male", "female", "other"] },
    parentName: { type: String },
});

const Student = User.discriminator("student", studentSchema);
module.exports = Student;
