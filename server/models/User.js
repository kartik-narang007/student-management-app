const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema(
{
    fullName: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    mobileNumber: {
        type: String,
        required: true,
        unique: true,
    },
    role: {
        type: String,
        enum: ["admin", "student", "teacher"],
        required: true,
    },
    address: {
        type: String,
        required: true,
    },
    isApproved: {
        type: Boolean,
        default: false,
    },
    resetToken: { type: String, default: "" },
    resetTokenExpiry: { type: Date, default: Date.now },
},
{ discriminatorKey: "role", timestamps: true }
);

userSchema.pre("save", async function (next) {
if (!this.isModified("password")) {
    return next();
}
const salt = await bcrypt.genSalt(10);
this.password = await bcrypt.hash(this.password, salt);
next();
});

const User = mongoose.model("User", userSchema);
module.exports = User;
