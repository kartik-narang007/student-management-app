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
        res.status(500).send(err);
    }
};



