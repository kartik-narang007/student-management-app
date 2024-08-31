const mongoose = require("mongoose");
const User = require("./User"); 

const studentSchema = new mongoose.Schema({
    dateOfBirth: { type: String },
    gender: { type: String, enum: ["Male", "Female", "Other"] },
    parentName: { type: String },
    classes: [{ type: mongoose.Schema.Types.ObjectId, ref: "Class" }], 
    feeReceives: [{ type: mongoose.Schema.Types.ObjectId, ref: "FeeReceive" }],
    totalFeePaid: { type: Number, default: 0 }, 
    isApproved: { type: Boolean, default: false },
});


const Student = User.discriminator("student", studentSchema);
module.exports = Student;
