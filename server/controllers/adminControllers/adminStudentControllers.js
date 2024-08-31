const Student = require("../../models/Student");
const FeeReceive = require("../../models/FeeReceive");
const Class = require("../../models/Class");

exports.fetchAllStudents = async (req, res) => {
    try {
        const students = await Student.find({});
        res.status(200).json(students);
    } catch (err) {
        res.status(500).json({ error: "Failed to fetch students" });
    }
};

exports.getStudentsAnalytics = async (req, res) => {
    try {
        const students = await Student.find()
            .populate({
                path: "feeReceives",
                model: "FeeReceive",
            })
            .populate({
                path: "classes",
                model: "Class",
            });

        // Calculate gender distribution and fee totals
        const genderCounts = students.reduce((counts, student) => {
            counts[student.gender] = (counts[student.gender] || 0) + 1;
            return counts;
        }, {});


        // Calculate fees received
        const response = {
            students: students.map((student) => {
                const totalFeesReceived = student.feeReceives.reduce(
                    (total, feeReceive) => total + feeReceive.amount,
                    0
                );

                

                return {
                    name: student.fullName,
                    parentName: student.parentName,
                    dob: student.dateOfBirth,
                    class: student.classes
                        ? student?.classes[0]?.name
                        : "N/A",
                    gender: student.gender,
                    feesReceived: totalFeesReceived, // Aggregate fees received
                };
            }),
            genderDistribution: genderCounts,
        };

        res.json(response);
    } catch (err) {
        console.log(err);
        res.status(500).send({
            error: "An error occurred while fetching student analytics.",
        });
    }
};

exports.deleteStudent = async (req, res) => {
    const { id } = req.params;

    try {
        const student = await Student.findByIdAndDelete(id);
        if (!student) {
            return res.status(404).json({ message: "Student not found" });
        }
        res.json({ message: "Student deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Error deleting student" });
    }
};

exports.updateStudent = async (req, res) => {
    const { id } = req.params;
    const { isApproved } = req.body;

    try {
        const student = await Student.findById(id);

        if (!student) {
            return res.status(404).json({ message: "Student not found" });
        }

        // Update isApproved
        student.isApproved = isApproved;

        const updatedStudent = await student.save();

        res.status(200).json(updatedStudent);
    } catch (error) {
        console.error("Error updating student:", error);
        res.status(500).json({ message: "Server error", error: error.message });
    }
};

exports.getStudentAndClasses = async (req, res) => {
    console.log("entered in controller");

    try {
        const students = await Student.find().populate({
            path: "classes",
            model: "Class",
        });

        const classes = await Class.find();

        const response = {
            students: students.map((student) => ({
                _id: student._id,
                name: student.fullName,
                class: student.classes ? student?.classes[0]?.name : "N/A",
                gender: student.gender,
                isApproved: student.isApproved,
            })),
            classes,
        };

        res.json(response);
    } catch (err) {
        console.log(err);
        res.status(500).send({
            error: "An error occurred while fetching student and class data.",
        });
    }
};
