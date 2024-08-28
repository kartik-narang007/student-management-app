const mongoose = require("mongoose");
const User = require("./User");

const teacherSchema = new mongoose.Schema({
    dateOfBirth: { type: Date },
    gender: { type: String, enum: ["Male", "Female", "Other"] },
});

const Teacher = User.discriminator("teacher", teacherSchema);
module.exports = Teacher;
