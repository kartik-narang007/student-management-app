const Teacher = require("../../models/Teacher");
const SalaryPayment = require("../../models/SalaryPayment"); // Ensure SalaryPayment is imported
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
    console.log("entered in adminteacher");
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
        console.log(teachers);

        const analyticsData = teachers.map((teacher) => {
            const totalSalaryPaid = teacher.salaryPayments.reduce(
                (total, payment) => total + payment.amount,
                0
            );
            return {
                id: teacher._id, // Include the teacher's ID
                name: teacher.fullName,
                numberOfClasses: teacher.classes.length,
                totalSalaryPaid: `$${totalSalaryPaid}`,
                gender: teacher.gender,
            };
        });

        res.status(200).json(analyticsData);
    } catch (error) {
        console.log(error);
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
    console.log("entered in controller");
    const { id } = req.params;
    const { isApproved } = req.body; // Only handle the approval status

    try {
        const teacher = await Teacher.findById(id);

        if (!teacher) {
            return res.status(404).json({ message: "Teacher not found" });
        }

        // Update only the approval status
        teacher.isApproved = isApproved;

        const updatedTeacher = await teacher.save();

        res.status(200).json(updatedTeacher);
    } catch (error) {
        console.error("Error updating teacher:", error);
        res.status(500).json({ message: "Server error" });
    }
};

// exports.getTeacherAndClasses = async (req, res) => {
//     try {
//         const teachers = await Teacher.find().populate({
//             path: "classes.classId",
//             model: "Class",
//         });

//         const classes = await Class.find();

//         const response = {
//             teachers: teachers.map((teacher) => ({
//                 _id: teacher._id,
//                 name: teacher.fullName,
//                 class: teacher.classes
//                     ? teacher?.classes[0]?.classId?.name
//                     : "N/A",
//                 gender: teacher.gender,
//                 isApproved: teacher.isApproved,
//             })),
//             classes,
//         };

//         res.json(response);
//     } catch (err) {
//         console.log(err);
//         res.status(500).send({
//             error: "An error occurred while fetching teacher and class data.",
//         });
//     }
// };
