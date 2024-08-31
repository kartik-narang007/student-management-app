const mongoose = require("mongoose");

const classSchema = new mongoose.Schema({
    name: { type: String, required: true },
    fees: { type: Number },
    studentLimit: { type: Number },
    year: { type: String },
    students: [{ type: mongoose.Schema.Types.ObjectId, ref: "student" }],
    teachers: [{ type: mongoose.Schema.Types.ObjectId, ref: "teacher" }],
});

// Ensure "Class" model is registered
const Class = mongoose.model("Class", classSchema);
module.exports = Class;
