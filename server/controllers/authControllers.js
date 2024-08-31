const Student = require("../models/Student");
const Teacher = require("../models/Teacher");
const User = require("../models/User");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const nodemailer = require("nodemailer");
const JWT_SECRET = process.env.JWT_SECRET;
const crypto = require("crypto");
const Class = require("../models/Class");

function capitalizeWords(str) {
    if (!str) return "";
    return str
        .split(' ')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
        .join(' ');
}

exports.userRegister = async (req, res) => {
    try {
        const {
            fullName,
            email,
            password,
            mobileNumber,
            role,
            address,
            class: classId,
        } = req.body;


        // Capitalize necessary fields
        const capitalizedFullName = capitalizeWords(fullName);
        const capitalizedAddress = capitalizeWords(address);

        let user;

        switch (role) {
            case "admin": {
                user = new User({
                    fullName: capitalizedFullName,
                    email,
                    password,
                    mobileNumber,
                    role,
                    address: capitalizedAddress,
                });
                break;
            }
            case "student": {
                const { dob, gender, parentName } = req.body;
                if (!dob || !gender || !parentName) {
                    return res.status(400).json({ message: "Missing student-specific fields" });
                }
                user = new Student({
                    fullName: capitalizedFullName,
                    email,
                    password,
                    mobileNumber,
                    role,
                    address: capitalizedAddress,
                    dateOfBirth: dob,
                    gender: capitalizeWords(gender),
                    parentName: capitalizeWords(parentName),
                });
                break;
            }
            case "teacher": {
                const { dob, gender } = req.body;
                if (!dob || !gender) {
                    return res.status(400).json({ message: "Missing teacher-specific fields" });
                }
                user = new Teacher({
                    fullName: capitalizedFullName,
                    email,
                    password,
                    mobileNumber,
                    role,
                    address: capitalizedAddress,
                    gender: capitalizeWords(gender),
                    dateOfBirth: dob,
                });
                break;
            }
            default:
                return res.status(400).json({ message: "Invalid role" });
        }

        // Save the user
        const savedUser = await user.save();

        // If the role is 'student' and classId is provided, update the class
        if (role === "student" && classId) {
            const classToUpdate = await Class.findById(classId);
            if (!classToUpdate) {
                return res.status(404).json({ message: "Class not found" });
            }

            // Update the class with the student ID
            classToUpdate.students.push(savedUser._id);
            await classToUpdate.save();

            // Update the student with the class ID and name
            const classInfo = {
                classId: classToUpdate._id,
            };
            savedUser.classes = [classToUpdate._id]; // Ensure 'classes' is properly defined in Student schema
            await savedUser.save();
        }

        const token = jwt.sign(
            { id: savedUser._id, role: savedUser.role },
            JWT_SECRET,
            { expiresIn: "1h" }
        );

        res.status(201).json({
            user: savedUser,
            token: token,
            message: "User Created Successfully",
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: err.message });
    }
};

exports.userLogin = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(400).json({ message: "User not found" });
        }

        if (!user.isApproved) {
            // Check if user is approved
            return res.status(403).json({ message: "Account not approved" });
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(400).json({ message: "Invalid password" });
        }

        const token = await jwt.sign(
            { id: user._id, role: user.role },
            JWT_SECRET,
            {
                expiresIn: "1h",
            }
        );

        res.status(200).json({
            user,
            token,
            message: "Login Successful",
        });
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: "Server error" });
    }
};

const transporter = nodemailer.createTransport({
    service: "Gmail",
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
    },
});

exports.forgotPassword = async (req, res) => {
    const { email } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
        return res.status(400).json({ message: "User not found" });
    }

    if (!user.isApproved) {
        // Check if user is approved
        return res.status(403).json({ message: "Account not approved" });
    }

    const resetToken = crypto.randomBytes(20).toString("hex");
    user.resetToken = resetToken;
    user.resetTokenExpiry = Date.now() + 600000; // 10 minutes
    await user.save();

    const resetUrl = `http://localhost:3000/reset-password/${resetToken}`;

    // Send email
    await transporter.sendMail({
        to: user.email,
        from: process.env.EMAIL_USER,
        subject: "Password Reset Request",
        text: `You requested a password reset. Click the link to reset your password: ${resetUrl}`,
    });

    res.status(200).json({ message: "Password reset email sent" });
};

exports.resetPassword = async (req, res) => {
    const { token } = req.params;
    const { password } = req.body;

    const user = await User.findOne({
        resetToken: token,
        resetTokenExpiry: { $gt: Date.now() },
    });

    if (!user) {
        return res.status(400).json({ message: "Invalid or expired token" });
    }

    if (!user.isApproved) {
        // Check if user is approved
        return res.status(403).json({ message: "Account not approved" });
    }

    user.password = password;
    user.resetToken = undefined;
    user.resetTokenExpiry = undefined;
    await user.save();

    res.status(200).json({ message: "Password updated successfully" });
};
