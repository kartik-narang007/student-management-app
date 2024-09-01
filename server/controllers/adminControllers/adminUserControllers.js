const Class = require("../../models/Class");
const Student = require("../../models/Student");
const Teacher = require("../../models/Teacher");
const User = require("../../models/User");

exports.adminOverview = async (req, res) => {
    try {
        const totalStudents = await Student.countDocuments();
        const totalTeachers = await Teacher.countDocuments();
        res.json({
            totalStudents,
            totalTeachers,
        });
    } catch (err) {
        console.log(err);
        res.status(500).send(err);
    }
};

exports.getAdminProfile = async (req, res) => {
    try {
        const admin = await User.findById(req.params.id);
        if (!admin || admin.role !== "admin") {
            return res.status(404).json({ message: "Admin not found" });
        }
        res.json(admin);
    } catch (err) {
        res.status(500).json({ message: "Server Error", error: err.message });
    }
};

exports.updateAdminProfile = async (req, res) => {
    const { fullName, mobileNumber, address } = req.body;

    try {
        const admin = await User.findById(req.params.id);
        if (!admin || admin.role !== "admin") {
            return res.status(404).json({ message: "Admin not found" });
        }

        admin.fullName = fullName || admin.fullName;
        admin.mobileNumber = mobileNumber || admin.mobileNumber;
        admin.address = address || admin.address;

        await admin.save();

        res.json(admin);
    } catch (err) {
        res.status(500).json({ message: "Server Error", error: err.message });
    }
};
