const Student = require("../models/Student");
const Teacher = require("../models/Teacher");
const User = require("../models/User");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const nodemailer = require('nodemailer');
const JWT_SECRET = process.env.JWT_SECRET;
const crypto = require('crypto');

console.log(JWT_SECRET);

exports.userRegister = async (req, res) => {
    console.log(req.body);
    try {
        const { fullName, email, password, mobileNumber, role, address } =
            req.body;
        let user;
        switch (role) {
            case "admin": {
                user = new User({
                    fullName,
                    email,
                    password,
                    mobileNumber,
                    role,
                    address,
                });
                break;
            }
            case "student": {
                const { date, gender, parentName } = req.body;
                user = new Student({
                    fullName,
                    email,
                    password,
                    mobileNumber,
                    role,
                    address,
                    dateOfBirth: date,
                    gender,
                    parentName,
                });
                break;
            }
            case "teacher": {
                const { date, gender } = req.body;
                user = new Teacher({
                    fullName,
                    email,
                    password,
                    mobileNumber,
                    role,
                    address,
                    dateOfBirth: date,
                });
                break;
            }
            default:
                return res.status(400).json({ message: "Invalid role" });
        }

        const savedUser = await user.save();
        const token = await jwt.sign(
            { id: savedUser._id, role: user.role },
            JWT_SECRET,
            { expiresIn: "1h" }
        );

        res.status(201).json({
            user: savedUser,
            token: token,
            message: "User Created Successfully",
        });
    } catch (err) {
        console.log(err);
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

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(400).json({ message: "Invalid credentials" });
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
        res.status(500).json({ message: "server error" });
    }
};


const transporter = nodemailer.createTransport({
    service: 'Gmail',
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

    const resetToken = crypto.randomBytes(20).toString('hex');
    user.resetToken = resetToken;
    user.resetTokenExpiry = Date.now() + 600000; // 10 minutes
    await user.save();

    const resetUrl = `http://localhost:3000/reset-password/${resetToken}`;

    // Send email
    await transporter.sendMail({
        to: user.email,
        from: process.env.EMAIL_USER,
        subject: 'Password Reset Request',
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

    user.password = password;
    user.resetToken = undefined;
    user.resetTokenExpiry = undefined;
    await user.save();

    res.status(200).json({ message: "Password updated successfully" });
};