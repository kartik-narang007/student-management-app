const Teacher = require("../../models/Teacher");
const SalaryPayment = require("../../models/SalaryPayment");
const Class = require("../../models/Class");

exports.fetchAllTeachers = async (req, res) => {
    try {
        const teachers = await Teacher.find({});
        res.status(200).json(teachers);
    } catch (err) {
        res.status(500).json({ error: "Failed to fetch teachers" });
    }
};

exports.getTeacherAnalytics = async (req, res) => {
    try {
        const teachers = await Teacher.find()
            .populate({
                path: "salaryPayments",
                model: "SalaryPayment",
            })
            .populate({
                path: "classes",
                model: "Class",
            });

        const analyticsData = teachers.map((teacher) => {
            const totalSalaryPaid = teacher.salaryPayments.reduce(
                (total, payment) => total + payment.amount,
                0
            );
            return {
                id: teacher._id,
                name: teacher.fullName,
                numberOfClasses: teacher.classes.length,
                totalSalaryPaid: `$${totalSalaryPaid}`,
                gender: teacher.gender,
            };
        });

        res.status(200).json(analyticsData);
    } catch (error) {
        res.status(500).json({
            message: "Failed to fetch teacher analytics",
            error,
        });
    }
};

exports.deleteTeacher = async (req, res) => {
    const { id } = req.params;

    try {
        const teacher = await Teacher.findByIdAndDelete(id);
        if (!teacher) {
            return res.status(404).json({ message: "Teacher not found" });
        }
        res.json({ message: "Teacher deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Error deleting teacher" });
    }
};

exports.updateTeacher = async (req, res) => {
    const { id } = req.params;
    const { isApproved } = req.body;

    try {
        const teacher = await Teacher.findById(id);

        if (!teacher) {
            return res.status(404).json({ message: "Teacher not found" });
        }

        teacher.isApproved = isApproved;

        const updatedTeacher = await teacher.save();

        res.status(200).json(updatedTeacher);
    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
};